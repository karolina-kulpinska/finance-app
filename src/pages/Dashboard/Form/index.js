import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addPaymentRequest,
  updatePaymentRequest,
  toggleModal,
  selectEditingPayment,
} from "../../../features/payments/paymentSlice";
import {
  addDemoPayment,
  updateDemoPayment,
} from "../../../features/demo/demoSlice";
import { selectIsPro } from "../../../features/subscription/subscriptionSlice";
import { compressImage, validateFile } from "../../../utils/imageCompression";
import { showNotification } from "../../../features/notification/notificationSlice";
import { bankOptions } from "../../../utils/bankIcons";
import { selectCurrency } from "../../../features/currency/currencySlice";
import ReceiptScanner from "../../../components/ReceiptScanner";
import { TypeSpecificFields } from "./TypeSpecificFields";
import { AttachmentField } from "./AttachmentField";
import * as S from "./styled";

const AddPaymentForm = ({ paymentType, onClose, isDemo = false }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const editingPayment = useSelector(selectEditingPayment);
  const isPro = useSelector(selectIsPro);
  const [isCompressing, setIsCompressing] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: { sharedWithFamily: false },
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
      setValue("name", editingPayment.name);
      setValue("amount", editingPayment.amount);
      setValue("date", editingPayment.date);
      setValue("category", editingPayment.category);
      setValue("notes", editingPayment.notes || "");
      setValue("bank", editingPayment.bank || "other");
      setValue("sharedWithFamily", Boolean(editingPayment.sharedWithFamily));

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

  const handleScanComplete = (scannedData) => {
    if (scannedData.name) setValue("name", scannedData.name);
    if (scannedData.amount) setValue("amount", scannedData.amount);
    if (scannedData.date) setValue("date", scannedData.date);
    if (scannedData.category) setValue("category", scannedData.category);
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
        if (paymentType === "installments") {
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
        } else if (paymentType === "insurance") {
          const duration = parseInt(data.duration) || 12;
          const startDate = new Date(data.date);

          for (let i = 0; i < duration; i++) {
            const paymentDate = new Date(startDate);
            paymentDate.setMonth(startDate.getMonth() + i);

            const insuranceData = {
              ...data,
              name: `${data.name} (${i + 1}/${duration})`,
              date: paymentDate.toISOString().split("T")[0],
              paymentType: "insurance",
              isRecurring: true,
              sharedWithFamily: Boolean(data.sharedWithFamily),
            };
            delete insuranceData.category;
            delete insuranceData.duration;

            dispatch(addDemoPayment(insuranceData));
          }
        } else {
          const paymentData = {
            ...data,
            paymentType: paymentType || "other",
            sharedWithFamily: Boolean(data.sharedWithFamily),
          };
          if (paymentType && paymentType !== "other") {
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
      dispatch(
        updatePaymentRequest({
          id: editingPayment.id,
          ...data,
          sharedWithFamily: Boolean(data.sharedWithFamily),
          attachmentUrl: editingPayment.attachmentUrl,
          attachmentName: editingPayment.attachmentName,
          oldAttachmentUrl: editingPayment.attachmentUrl,
        }),
      );
    } else {
      if (paymentType === "installments") {
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
      } else if (paymentType === "insurance") {
        const duration = parseInt(data.duration) || 12;
        const startDate = new Date(data.date);

        for (let i = 0; i < duration; i++) {
          const paymentDate = new Date(startDate);
          paymentDate.setMonth(startDate.getMonth() + i);

          const insuranceData = {
            ...data,
            name: `${data.name} (${i + 1}/${duration})`,
            date: paymentDate.toISOString().split("T")[0],
            paymentType: "insurance",
            isRecurring: true,
            sharedWithFamily: Boolean(data.sharedWithFamily),
          };
          delete insuranceData.category;
          delete insuranceData.duration;

          if (i > 0) delete insuranceData.attachment;
          dispatch(addPaymentRequest(insuranceData));
        }
      } else {
        const paymentData = {
          ...data,
          paymentType: paymentType || "other",
          sharedWithFamily: Boolean(data.sharedWithFamily),
        };
        if (paymentType && paymentType !== "other") {
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
    const key = keys[paymentType] || "form.formTitleDefault";
    return `${icons[paymentType] || icons.other} ${t(key)}`;
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.FormTitle>{getFormTitle()}</S.FormTitle>

        {!editingPayment &&
          (paymentType === "other" ||
            paymentType === "bills" ||
            paymentType === "shopping") && (
            <ReceiptScanner onScanComplete={handleScanComplete} />
          )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormGrid>
            <S.FormGroup $fullWidth>
              <S.Label>
                {paymentType === "installments" && t("form.paymentNameInstallments")}
                {paymentType === "shopping" && t("form.paymentNameShopping")}
                {paymentType === "insurance" && t("form.paymentNameInsurance")}
                {(paymentType === "bills" || paymentType === "other" || !paymentType) && t("form.paymentName")}
              </S.Label>
              <S.Input
                {...register("name", { required: t("form.nameRequired") })}
                placeholder={
                  paymentType === "installments"
                    ? t("form.placeholderInstallments")
                    : paymentType === "shopping"
                      ? t("form.placeholderShopping")
                      : paymentType === "insurance"
                        ? t("form.placeholderInsurance")
                        : paymentType === "bills"
                          ? t("form.placeholderBills")
                          : t("form.placeholderOther")
                }
              />
              {errors.name && (
                <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            {paymentType !== "installments" && paymentType !== "insurance" && (
              <S.FormGroup>
                <S.Label>{t("filters.amount", { symbol: currency.symbol })} *</S.Label>
                <S.Input
                  type="number"
                  step="0.01"
                  {...register("amount", {
                    required: "Podaj kwotę",
                    min: {
                      value: 0.01,
                      message: "Kwota musi być większa niż 0",
                    },
                  })}
                  placeholder="0.00"
                />
                {errors.amount && (
                  <S.ErrorMessage>{errors.amount.message}</S.ErrorMessage>
                )}
              </S.FormGroup>
            )}

            <S.FormGroup as="div" lang={i18n.language?.split("-")[0] || "en"}>
              <S.Label>{t("form.paymentDate")}</S.Label>
              <S.Input
                type="date"
                {...register("date", { required: t("form.dateRequired") })}
              />
              {errors.date && (
                <S.ErrorMessage>{errors.date.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            {!paymentType && (
              <S.FormGroup>
                <S.Label>{t("form.category")}</S.Label>
                <S.Select {...register("category")} defaultValue="other">
                  <option value="bills">🧾 {t("charts.bills")}</option>
                  <option value="shopping">🛒 {t("charts.shopping")}</option>
                  <option value="other">📌 {t("charts.other")}</option>
                </S.Select>
              </S.FormGroup>
            )}

            {paymentType !== "installments" && paymentType !== "insurance" && (
              <S.FormGroup $fullWidth>
                <S.Label>{t("form.paymentMethod")}</S.Label>
                <S.Select
                  {...register("bank")}
                  defaultValue={watch("bank") || "other"}
                  style={{ maxWidth: 320, width: "100%", fontSize: 14 }}
                >
                  {bankOptions.map((bank) => (
                    <option key={bank.value} value={bank.value}>
                      {bank.label}
                    </option>
                  ))}
                </S.Select>
              </S.FormGroup>
            )}

            <TypeSpecificFields
              paymentType={paymentType}
              register={register}
              errors={errors}
              totalInstallmentAmount={totalInstallmentAmount}
              totalInsuranceAmount={totalInsuranceAmount}
            />

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
                dispatch(toggleModal());
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
