import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addPaymentRequest,
  updatePaymentRequest,
  toggleModal,
  selectEditingPayment,
} from "../../../features/payments/paymentSlice";
import { compressImage, validateFile } from "../../../utils/imageCompression";
import { showNotification } from "../../../features/notification/notificationSlice";
import { bankOptions, getBankConfig } from "../../../utils/bankIcons";
import ReceiptScanner from "../../../components/ReceiptScanner";
import BankSelector from "../../../components/BankSelector";
import * as S from "./styled";

const AddPaymentForm = ({ paymentType, onClose }) => {
  const dispatch = useDispatch();
  const editingPayment = useSelector(selectEditingPayment);
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
      setValue("priority", editingPayment.priority);
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
        console.error("Błąd kompresji:", error);
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
    if (data.attachment?.[0] && data.attachment[0].type.startsWith("image/")) {
      setIsCompressing(true);
      try {
        const compressed = await compressImage(data.attachment[0]);
        data.attachment = [compressed];
      } catch (error) {
        console.error("Błąd kompresji podczas wysyłki:", error);
      } finally {
        setIsCompressing(false);
      }
    }

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
      // Sprawdź typ płatności
      if (paymentType === "installments") {
        // Płatności ratalne
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
    if (editingPayment) return "Edytuj płatność";

    switch (paymentType) {
      case "installments":
        return "📅 Nowa płatność ratalna";
      case "bills":
        return "🧾 Nowy rachunek";
      case "shopping":
        return "🛒 Nowe zakupy";
      case "insurance":
        return "🛡️ Nowe ubezpieczenie";
      default:
        return "📌 Nowa płatność";
    }
  };

  const renderTypeSpecificFields = () => {
    switch (paymentType) {
      case "installments":
        return (
          <>
            <S.FormGroup>
              <S.Label>Kwota raty (zł) *</S.Label>
              <S.Input
                type="number"
                step="0.01"
                {...register("installmentAmount", {
                  required: "Podaj kwotę raty",
                  min: { value: 0.01, message: "Kwota musi być większa niż 0" },
                })}
                placeholder="np. 250.00"
              />
              {errors.installmentAmount && (
                <S.ErrorMessage>
                  {errors.installmentAmount.message}
                </S.ErrorMessage>
              )}
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Liczba rat *</S.Label>
              <S.Input
                type="number"
                min="2"
                {...register("installments", {
                  required: "Podaj liczbę rat",
                  min: { value: 2, message: "Minimum 2 raty" },
                })}
                placeholder="np. 12"
              />
              {errors.installments && (
                <S.ErrorMessage>{errors.installments.message}</S.ErrorMessage>
              )}
            </S.FormGroup>
            {totalInstallmentAmount && (
              <S.TotalAmountBox>
                <S.TotalLabel>Kwota całkowita:</S.TotalLabel>
                <S.TotalValue>{totalInstallmentAmount} zł</S.TotalValue>
              </S.TotalAmountBox>
            )}
            <S.FormGroup>
              <S.Label>Numer konta (opcjonalnie)</S.Label>
              <S.Input
                {...register("accountNumber")}
                placeholder="np. 12 3456 7890..."
              />
            </S.FormGroup>
          </>
        );

      case "insurance":
        return (
          <>
            <S.FormGroup>
              <S.Label>Miesięczna kwota (zł) *</S.Label>
              <S.Input
                type="number"
                step="0.01"
                {...register("amount", {
                  required: "Podaj miesięczną kwotę",
                  min: { value: 0.01, message: "Kwota musi być większa niż 0" },
                })}
                placeholder="np. 150.00"
              />
              {errors.amount && (
                <S.ErrorMessage>{errors.amount.message}</S.ErrorMessage>
              )}
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Okres trwania (miesiące) *</S.Label>
              <S.Input
                type="number"
                min="1"
                {...register("duration", {
                  required: "Podaj okres trwania",
                  min: { value: 1, message: "Minimum 1 miesiąc" },
                })}
                placeholder="np. 12"
              />
              {errors.duration && (
                <S.ErrorMessage>{errors.duration.message}</S.ErrorMessage>
              )}
            </S.FormGroup>
            {totalInsuranceAmount && (
              <S.TotalAmountBox>
                <S.TotalLabel>Kwota całkowita:</S.TotalLabel>
                <S.TotalValue>{totalInsuranceAmount} zł</S.TotalValue>
              </S.TotalAmountBox>
            )}
            <S.FormGroup>
              <S.Label>Numer konta</S.Label>
              <S.Input
                {...register("accountNumber")}
                placeholder="np. 12 3456 7890..."
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Numer polisy (opcjonalnie)</S.Label>
              <S.Input
                {...register("policyNumber")}
                placeholder="np. POL/2026/12345"
              />
            </S.FormGroup>
          </>
        );

      case "bills":
        return (
          <S.FormGroup>
            <S.Label>Numer konta/umowy</S.Label>
            <S.Input
              {...register("accountNumber")}
              placeholder="np. 12 3456 7890..."
            />
          </S.FormGroup>
        );

      default:
        return null;
    }
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
                Nazwa płatności *
                {paymentType === "installments" &&
                  " (np. lodówka, pralka, TV, telefon)"}
                {paymentType === "shopping" && " (np. zakupy spożywcze)"}
                {paymentType === "insurance" && " (np. ubezpieczenie na życie)"}
              </S.Label>
              <S.Input
                {...register("name", { required: "Podaj nazwę płatności" })}
                placeholder={
                  paymentType === "installments"
                    ? "np. Lodówka Samsung"
                    : paymentType === "shopping"
                      ? "np. Zakupy spożywcze"
                      : paymentType === "insurance"
                        ? "np. Ubezpieczenie na życie"
                        : paymentType === "bills"
                          ? "np. Rachunek za prąd"
                          : "np. Prąd, Czynsz, Zakupy spożywcze"
                }
              />
              {errors.name && (
                <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            {paymentType !== "installments" && paymentType !== "insurance" && (
              <S.FormGroup>
                <S.Label>Kwota (zł) *</S.Label>
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

            <S.FormGroup>
              <S.Label>Termin płatności *</S.Label>
              <S.Input
                type="date"
                {...register("date", { required: "Wybierz datę" })}
              />
              {errors.date && (
                <S.ErrorMessage>{errors.date.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            {!paymentType && (
              <S.FormGroup>
                <S.Label>Kategoria</S.Label>
                <S.Select {...register("category")} defaultValue="other">
                  <option value="bills">🧾 Rachunki</option>
                  <option value="shopping">🛒 Zakupy</option>
                  <option value="other">📌 Inne</option>
                </S.Select>
              </S.FormGroup>
            )}

            <S.FormGroup>
              <S.Label>Priorytet</S.Label>
              <S.Select {...register("priority")} defaultValue="normal">
                <option value="high">🔴 Wysoki</option>
                <option value="normal">🟡 Normalny</option>
                <option value="low">🟢 Niski</option>
              </S.Select>
            </S.FormGroup>

            {paymentType !== "installments" && paymentType !== "insurance" && (
              <S.FormGroup $fullWidth>
                <S.Label>Bank/Metoda płatności</S.Label>
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

            {renderTypeSpecificFields()}

            <S.FormGroup $fullWidth>
              <S.Label>Notatki</S.Label>
              <S.TextArea
                {...register("notes")}
                placeholder="Dodatkowe informacje o płatności..."
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
                  👨‍👩‍👧‍👦 Udostępnij rodzinie
                  <S.CheckboxHint>
                    Członkowie rodziny będą widzieć tę płatność
                  </S.CheckboxHint>
                </S.CheckboxLabel>
              </S.CheckboxWrapper>
            </S.FormGroup>

            <S.FormGroup $fullWidth>
              <S.Label>Załącznik (PDF, zdjęcie)</S.Label>
              <S.Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                {...register("attachment")}
                onChange={handleFileChange}
              />
              {fileInfo && (
                <S.FileInfo>
                  📎 {fileInfo.name}
                  <br />
                  {fileInfo.compressing && "🔄 Kompresowanie..."}
                  {fileInfo.compressedSize && (
                    <S.CompressionInfo>
                      ✅ Skompresowano: {fileInfo.originalSize} →{" "}
                      {fileInfo.compressedSize}
                      (oszczędność: {fileInfo.savings})
                    </S.CompressionInfo>
                  )}
                  {!fileInfo.compressing && !fileInfo.compressedSize && (
                    <span>📄 PDF - {fileInfo.originalSize}</span>
                  )}
                </S.FileInfo>
              )}
            </S.FormGroup>
          </S.FormGrid>

          <S.ButtonGroup>
            <S.CancelButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleModal());
              }}
            >
              Anuluj
            </S.CancelButton>
            <S.SubmitButton type="submit" disabled={isCompressing}>
              {isCompressing ? "Kompresowanie..." : "Zapisz płatność"}
            </S.SubmitButton>
          </S.ButtonGroup>
        </form>
      </S.Modal>
    </S.Overlay>
  );
};

export default AddPaymentForm;
