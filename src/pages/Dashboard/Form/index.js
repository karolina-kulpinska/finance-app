import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addPaymentRequest,
  updatePaymentRequest,
  updatePaymentsBatchRequest,
  toggleModal,
  selectEditingPayment,
  selectPayments,
} from "../../../features/payments/paymentSlice";
import {
  addDemoPayment,
  updateDemoPayment,
} from "../../../features/demo/demoSlice";
import { selectIsPro } from "../../../features/subscription/subscriptionSlice";
import { compressImage, validateFile } from "../../../utils/imageCompression";
import { showNotification } from "../../../features/notification/notificationSlice";
import { selectCurrency } from "../../../features/currency/currencySlice";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { pl, enUS } from "date-fns/locale";
import BankSelector from "../../../components/BankSelector";
import { TypeSpecificFields } from "./TypeSpecificFields";
import { AttachmentField } from "./AttachmentField";
import * as S from "./styled";

registerLocale("pl", pl);
registerLocale("en", enUS);

const toLocalDateString = (d) => {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const parseDateString = (s) => (s ? new Date(s + "T12:00:00") : null);

const getInsuranceSiblings = (payments, payment) => {
  if (!payments?.length || payment?.paymentType !== "insurance") return [];
  if (payment.insuranceInfo?.groupId) {
    return payments.filter(
      (p) => p.paymentType === "insurance" && p.insuranceInfo?.groupId === payment.insuranceInfo.groupId
    );
  }
  const match = payment.name?.match(/^(.+?) \((\d+)\/(\d+)\)$/);
  if (!match) return [payment];
  const [, baseName, , total] = match;
  const totalNum = parseInt(total, 10);
  return payments.filter((p) => {
    if (p.paymentType !== "insurance") return false;
    const m = p.name?.match(/^(.+?) \((\d+)\/(\d+)\)$/);
    return m && m[1] === baseName && parseInt(m[3], 10) === totalNum;
  });
};

const AddPaymentForm = ({ paymentType, onClose, isDemo = false }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const payments = useSelector(selectPayments);
  const editingPayment = useSelector(selectEditingPayment);
  const isPro = useSelector(selectIsPro);
  const effectivePaymentType = editingPayment
    ? (editingPayment.paymentType || "other")
    : (paymentType || "other");
  const [isCompressing, setIsCompressing] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [insuranceEditScope, setInsuranceEditScope] = useState("single");
  const [insuranceSplitDate, setInsuranceSplitDate] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: { sharedWithFamily: false, insuranceInterval: "month" },
  });

  const watchInstallments = watch("installments");
  const watchInstallmentAmount = watch("installmentAmount");
  const watchDuration = watch("duration");
  const watchAmount = watch("amount");

  const totalInstallmentAmount =
    watchInstallments && watchInstallmentAmount
      ? (
          parseFloat(watchInstallmentAmount) * parseInt(watchInstallments)
        ).toFixed(2)
      : null;

  const totalInsuranceAmount =
    watchDuration && watchAmount
      ? (parseFloat(watchAmount) * parseInt(watchDuration)).toFixed(2)
      : null;

  useEffect(() => {
    if (editingPayment) {
      const baseName =
        editingPayment.installmentInfo?.originalName || editingPayment.name;
      setValue("name", baseName);
      setValue("amount", editingPayment.amount);
      setValue("date", editingPayment.date);
      setValue("category", editingPayment.category || "other");
      setValue("notes", editingPayment.notes || "");
      setValue("bank", editingPayment.bank || "other");
      setValue("sharedWithFamily", Boolean(editingPayment.sharedWithFamily));
      setValue("accountNumber", editingPayment.accountNumber || "");

      if (editingPayment.paymentType === "installments" && editingPayment.installmentInfo) {
        setValue("installments", String(editingPayment.installmentInfo.total));
        setValue("installmentAmount", String(editingPayment.amount));
      }
      if (editingPayment.paymentType === "insurance") {
        setValue("policyNumber", editingPayment.policyNumber || "");
        if (editingPayment.duration) setValue("duration", String(editingPayment.duration));
        setValue("insuranceInterval", editingPayment.insuranceInterval || "month");
      }

      if (editingPayment.attachmentName) {
        setFileInfo({
          name: editingPayment.attachmentName,
          existing: true,
        });
      }
    } else {
      const today = new Date().toISOString().split("T")[0];
      setValue("date", today);
      setValue("bank", "other");
    }
  }, [editingPayment, setValue]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileInfo(null);
      return;
    }

    const validation = validateFile(file);
    if (!validation.valid) {
      dispatch(
        showNotification({
          message: validation.error,
          type: "error",
        }),
      );
      e.target.value = "";
      setFileInfo(null);
      return;
    }

    const originalSize = (file.size / 1024).toFixed(0);
    setFileInfo({
      name: file.name,
      originalSize: `${originalSize} KB`,
      compressing: file.type.startsWith("image/"),
    });

    if (file.type.startsWith("image/")) {
      setIsCompressing(true);
      try {
        const compressed = await compressImage(file);
        const compressedSize = (compressed.size / 1024).toFixed(0);
        const savings = ((1 - compressed.size / file.size) * 100).toFixed(0);

        setFileInfo({
          name: file.name,
          originalSize: `${originalSize} KB`,
          compressedSize: `${compressedSize} KB`,
          savings: `${savings}%`,
        });
      } catch (error) {
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const onSubmit = async (data) => {
    // W trybie demo nie obsługujemy załączników
    if (isDemo) {
      delete data.attachment;
    } else {
      if (!isPro) delete data.attachment;
      if (data.attachment?.[0] && data.attachment[0].type.startsWith("image/")) {
        setIsCompressing(true);
        try {
          const compressed = await compressImage(data.attachment[0]);
          data.attachment = [compressed];
        } catch (error) {
        } finally {
          setIsCompressing(false);
        }
      }
    }

    if (isDemo) {
      // Tryb demo - zapisz do localStorage
      if (editingPayment) {
        dispatch(
          updateDemoPayment({
            id: editingPayment.id,
            ...data,
            sharedWithFamily: Boolean(data.sharedWithFamily),
          }),
        );
        dispatch(
          showNotification({
            message: "Płatność została zaktualizowana!",
            type: "success",
          }),
        );
      } else {
        if (effectivePaymentType === "installments") {
          const installments = parseInt(data.installments) || 0;
          const installmentAmount = parseFloat(data.installmentAmount) || 0;
          const startDate = new Date(data.date);

          for (let i = 0; i < installments; i++) {
            const installmentDate = new Date(startDate);
            installmentDate.setMonth(startDate.getMonth() + i);

            const installmentData = {
              ...data,
              name: `${data.name} (Rata ${i + 1}/${installments})`,
              amount: installmentAmount,
              date: installmentDate.toISOString().split("T")[0],
              paymentType: "installments",
              isInstallment: true,
              sharedWithFamily: Boolean(data.sharedWithFamily),
              installmentInfo: {
                current: i + 1,
                total: installments,
                originalName: data.name,
              },
            };
            delete installmentData.category;
            delete installmentData.installments;
            delete installmentData.installmentAmount;

            dispatch(addDemoPayment(installmentData));
          }
        } else if (effectivePaymentType === "insurance") {
          const duration = parseInt(data.duration) || 12;
          const startDate = new Date(data.date);
          const isYearly = data.insuranceInterval === "year";
          const groupId = `ins_${Date.now()}`;

          for (let i = 0; i < duration; i++) {
            const paymentDate = new Date(startDate);
            if (isYearly) {
              paymentDate.setFullYear(startDate.getFullYear() + i);
            } else {
              paymentDate.setMonth(startDate.getMonth() + i);
            }

            const insuranceData = {
              ...data,
              name: `${data.name} (${i + 1}/${duration})`,
              date: paymentDate.toISOString().split("T")[0],
              paymentType: "insurance",
              insuranceInterval: isYearly ? "year" : "month",
              isRecurring: true,
              sharedWithFamily: Boolean(data.sharedWithFamily),
              insuranceInfo: { originalName: data.name, current: i + 1, total: duration, groupId },
            };
            delete insuranceData.category;
            delete insuranceData.duration;

            dispatch(addDemoPayment(insuranceData));
          }
        } else {
          const paymentData = {
            ...data,
            paymentType: effectivePaymentType,
            sharedWithFamily: Boolean(data.sharedWithFamily),
          };
          if (effectivePaymentType !== "other") {
            delete paymentData.category;
          }
          dispatch(addDemoPayment(paymentData));
        }
        dispatch(
          showNotification({
            message: "Płatność została dodana pomyślnie!",
            type: "success",
          }),
        );
      }
      dispatch(toggleModal());
      return;
    }

    // Normalny tryb - zapisz do Firebase
    if (editingPayment) {
      let category = data.category ?? editingPayment.category ?? "other";
      if (effectivePaymentType === "bills") category = "bills";
      else if (effectivePaymentType === "shopping") category = "shopping";
      const updatePayload = {
        id: editingPayment.id,
        ...data,
        category,
        sharedWithFamily: Boolean(data.sharedWithFamily),
        attachmentUrl: editingPayment.attachmentUrl,
        attachmentName: editingPayment.attachmentName,
        oldAttachmentUrl: editingPayment.attachmentUrl,
      };
      if (effectivePaymentType === "installments" && data.installmentAmount != null) {
        updatePayload.amount = parseFloat(data.installmentAmount);
      }
      if (effectivePaymentType === "insurance" && data.amount != null) {
        updatePayload.amount = parseFloat(data.amount);
      }
      dispatch(updatePaymentRequest(updatePayload));
    } else {
      if (effectivePaymentType === "installments") {
        const installments = parseInt(data.installments) || 0;
        const installmentAmount = parseFloat(data.installmentAmount) || 0;
        const startDate = new Date(data.date);

        for (let i = 0; i < installments; i++) {
          const installmentDate = new Date(startDate);
          installmentDate.setMonth(startDate.getMonth() + i);

          const installmentData = {
            ...data,
            name: `${data.name} (Rata ${i + 1}/${installments})`,
            amount: installmentAmount,
            date: installmentDate.toISOString().split("T")[0],
            paymentType: "installments",
            isInstallment: true,
            sharedWithFamily: Boolean(data.sharedWithFamily),
            installmentInfo: {
              current: i + 1,
              total: installments,
              originalName: data.name,
            },
          };
          delete installmentData.category;
          delete installmentData.installments;
          delete installmentData.installmentAmount;

          if (i > 0) delete installmentData.attachment;
          dispatch(addPaymentRequest(installmentData));
        }
      } else if (effectivePaymentType === "insurance") {
        const duration = parseInt(data.duration) || 12;
        const startDate = new Date(data.date);
        const isYearly = data.insuranceInterval === "year";
        const groupId = `ins_${Date.now()}`;

        for (let i = 0; i < duration; i++) {
          const paymentDate = new Date(startDate);
          if (isYearly) {
            paymentDate.setFullYear(startDate.getFullYear() + i);
          } else {
            paymentDate.setMonth(startDate.getMonth() + i);
          }

          const insuranceData = {
            ...data,
            name: `${data.name} (${i + 1}/${duration})`,
            date: paymentDate.toISOString().split("T")[0],
            paymentType: "insurance",
            insuranceInterval: isYearly ? "year" : "month",
            isRecurring: true,
            sharedWithFamily: Boolean(data.sharedWithFamily),
            insuranceInfo: { originalName: data.name, current: i + 1, total: duration, groupId },
          };
          delete insuranceData.category;
          delete insuranceData.duration;

          if (i > 0) delete insuranceData.attachment;
          dispatch(addPaymentRequest(insuranceData));
        }
      } else {
        const paymentData = {
          ...data,
          paymentType: effectivePaymentType,
          sharedWithFamily: Boolean(data.sharedWithFamily),
        };
        if (effectivePaymentType === "bills") {
          paymentData.category = "bills";
        } else if (effectivePaymentType === "shopping") {
          paymentData.category = "shopping";
        } else if (effectivePaymentType !== "other") {
          delete paymentData.category;
        }
        dispatch(addPaymentRequest(paymentData));
      }
    }

    dispatch(toggleModal());
  };

  const getFormTitle = () => {
    if (editingPayment) return t("form.formTitleEdit");

    const icons = { installments: "📅", bills: "🧾", shopping: "🛒", insurance: "🛡️", other: "📌" };
    const keys = {
      installments: "form.formTitleInstallments",
      bills: "form.formTitleBills",
      shopping: "form.formTitleShopping",
      insurance: "form.formTitleInsurance",
    };
    const key = keys[effectivePaymentType] || "form.formTitleDefault";
    return `${icons[effectivePaymentType] || icons.other} ${t(key)}`;
  };

  return (
    <S.Overlay>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.FormTitle>{getFormTitle()}</S.FormTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormGrid>
            <S.FormGroup $fullWidth>
              <S.Label>
                {effectivePaymentType === "installments" && t("form.paymentNameInstallments")}
                {effectivePaymentType === "shopping" && t("form.paymentNameShopping")}
                {effectivePaymentType === "insurance" && t("form.paymentNameInsurance")}
                {(effectivePaymentType === "bills" || effectivePaymentType === "other") && t("form.paymentName")}
              </S.Label>
              <S.Input
                {...register("name", { required: t("form.nameRequired") })}
                placeholder={
                  effectivePaymentType === "installments"
                    ? t("form.placeholderInstallments")
                    : effectivePaymentType === "shopping"
                      ? t("form.placeholderShopping")
                      : effectivePaymentType === "insurance"
                        ? t("form.placeholderInsurance")
                        : effectivePaymentType === "bills"
                          ? t("form.placeholderBills")
                          : t("form.placeholderOther")
                }
              />
              {errors.name && (
                <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            {effectivePaymentType !== "installments" && effectivePaymentType !== "insurance" && (
              <S.FormGroup>
                <S.Label>{t("filters.amount", { symbol: currency.symbol })} *</S.Label>
                <S.Input
                  type="number"
                  step="0.01"
                  {...register("amount", {
                    required: t("form.amountRequired"),
                    min: {
                      value: 0.01,
                      message: t("form.amountMin"),
                    },
                  })}
                  placeholder={t("form.amountPlaceholder")}
                />
                {errors.amount && (
                  <S.ErrorMessage>{errors.amount.message}</S.ErrorMessage>
                )}
              </S.FormGroup>
            )}

            <S.FormGroup as="div">
              <S.Label>{t("form.paymentDate")}</S.Label>
              <Controller
                name="date"
                control={control}
                rules={{ required: t("form.dateRequired") }}
                render={({ field }) => (
                  <S.DatePickerWrap>
                    <DatePicker
                      selected={parseDateString(field.value)}
                      onChange={(d) => field.onChange(d ? toLocalDateString(d) : "")}
                      locale={i18n.language?.startsWith("en") ? "en" : "pl"}
                      dateFormat={i18n.language?.startsWith("en") ? "MM/dd/yyyy" : "dd.MM.yyyy"}
                      placeholderText={t("form.dateRequired")}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      yearDropdownItemNumber={150}
                      scrollableYearDropdown
                      minDate={new Date(1900, 0, 1)}
                      maxDate={new Date(2100, 11, 31)}
                      autoComplete="off"
                    />
                  </S.DatePickerWrap>
                )}
              />
              {errors.date && (
                <S.ErrorMessage>{errors.date.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            {effectivePaymentType === "other" && (
              <S.FormGroup>
                <S.Label>{t("form.category")}</S.Label>
                <S.Select {...register("category")} defaultValue="other">
                  <option value="bills">🧾 {t("charts.bills")}</option>
                  <option value="shopping">🛒 {t("charts.shopping")}</option>
                  <option value="other">📌 {t("charts.other")}</option>
                </S.Select>
              </S.FormGroup>
            )}

            <TypeSpecificFields
              paymentType={effectivePaymentType}
              register={register}
              errors={errors}
              watch={watch}
              totalInstallmentAmount={totalInstallmentAmount}
              totalInsuranceAmount={totalInsuranceAmount}
            />

            {i18n.language?.startsWith("pl") &&
              effectivePaymentType !== "insurance" && (
                <S.FormGroup $fullWidth>
                  <S.Label>{t("form.paymentMethod")}</S.Label>
                  <Controller
                    name="bank"
                    control={control}
                    defaultValue="other"
                    render={({ field }) => (
                      <BankSelector value={field.value} onChange={field.onChange} />
                    )}
                  />
                </S.FormGroup>
              )}

            <S.FormGroup $fullWidth>
              <S.Label>{t("form.notes")}</S.Label>
              <S.TextArea
                {...register("notes")}
                placeholder={t("form.notesPlaceholder")}
              />
            </S.FormGroup>

            <S.FormGroup $fullWidth>
              <S.CheckboxWrapper>
                <S.Checkbox
                  type="checkbox"
                  id="sharedWithFamily"
                  {...register("sharedWithFamily")}
                />
                <S.CheckboxLabel htmlFor="sharedWithFamily">
                  👨‍👩‍👧‍👦 {t("form.shareWithFamily")}
                  <S.CheckboxHint>
                    {t("form.shareHint")}
                  </S.CheckboxHint>
                </S.CheckboxLabel>
              </S.CheckboxWrapper>
            </S.FormGroup>

            <AttachmentField
              isPro={isPro}
              register={register}
              fileInfo={fileInfo}
              onFileChange={handleFileChange}
            />
          </S.FormGrid>

          <S.ButtonGroup>
            <S.CancelButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              {t("form.cancel")}
            </S.CancelButton>
            <S.SubmitButton type="submit" disabled={isCompressing}>
              {isCompressing ? t("form.compressing") : t("form.savePayment")}
            </S.SubmitButton>
          </S.ButtonGroup>
        </form>
      </S.Modal>
    </S.Overlay>
  );
};

export default AddPaymentForm;
