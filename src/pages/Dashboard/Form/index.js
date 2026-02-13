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
import * as S from "./styled";

const AddPaymentForm = () => {
  const dispatch = useDispatch();
  const editingPayment = useSelector(selectEditingPayment);
  const [isCompressing, setIsCompressing] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (editingPayment) {
      setValue("name", editingPayment.name);
      setValue("amount", editingPayment.amount);
      setValue("date", editingPayment.date);
      setValue("category", editingPayment.category);
      setValue("priority", editingPayment.priority);
      setValue("notes", editingPayment.notes || "");
      
      if (editingPayment.attachmentName) {
        setFileInfo({
          name: editingPayment.attachmentName,
          existing: true,
        });
      }
    } else {
      const today = new Date().toISOString().split("T")[0];
      setValue("date", today);
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
        })
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
          attachmentUrl: editingPayment.attachmentUrl,
          attachmentName: editingPayment.attachmentName,
          oldAttachmentUrl: editingPayment.attachmentUrl,
        })
      );
    } else {
      dispatch(addPaymentRequest(data));
    }
    
    dispatch(toggleModal());
  };

  return (
    <S.Overlay onClick={() => dispatch(toggleModal())}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.FormTitle>
          {editingPayment ? "Edytuj płatność" : "Dodaj nową płatność"}
        </S.FormTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormGrid>
            <S.FormGroup $fullWidth>
              <S.Label>Nazwa płatności *</S.Label>
              <S.Input
                {...register("name", { required: "Podaj nazwę płatności" })}
                placeholder="np. Prąd, Czynsz, Zakupy spożywcze"
              />
              {errors.name && (
                <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Kwota (zł) *</S.Label>
              <S.Input
                type="number"
                step="0.01"
                {...register("amount", {
                  required: "Podaj kwotę",
                  min: { value: 0.01, message: "Kwota musi być większa niż 0" },
                })}
                placeholder="0.00"
              />
              {errors.amount && (
                <S.ErrorMessage>{errors.amount.message}</S.ErrorMessage>
              )}
            </S.FormGroup>

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

            <S.FormGroup>
              <S.Label>Kategoria</S.Label>
              <S.Select {...register("category")} defaultValue="other">
                <option value="bills">🧾 Rachunki</option>
                <option value="shopping">🛒 Zakupy</option>
                <option value="other">📌 Inne</option>
              </S.Select>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Priorytet</S.Label>
              <S.Select {...register("priority")} defaultValue="normal">
                <option value="high">🔴 Wysoki</option>
                <option value="normal">🟡 Normalny</option>
                <option value="low">🟢 Niski</option>
              </S.Select>
            </S.FormGroup>

            <S.FormGroup $fullWidth>
              <S.Label>Notatki</S.Label>
              <S.TextArea
                {...register("notes")}
                placeholder="Dodatkowe informacje o płatności..."
              />
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
                      ✅ Skompresowano: {fileInfo.originalSize} → {fileInfo.compressedSize} 
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
