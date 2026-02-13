import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addPaymentRequest,
  toggleModal,
} from "../../../features/payments/paymentSlice";
import Button from "../../../components/Button";
import * as S from "./styled";

const AddPaymentForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dane wysyłane do Sagi:", data);
    dispatch(addPaymentRequest(data));
    dispatch(toggleModal());
  };

  const onError = (errors) => {
    console.log("Błędy walidacji formularza:", errors);
  };

  return (
    <S.Overlay onClick={() => dispatch(toggleModal())}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.FormTitle>Nowa Płatność</S.FormTitle>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <S.Label>Nazwa rachunku</S.Label>
          <S.Input
            {...register("name", { required: "Podaj nazwę" })}
            placeholder="np. Prąd, Czynsz"
          />
          {errors.name && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.name.message}
            </p>
          )}

          <S.Label>Kwota (zł)</S.Label>
          <S.Input
            type="number"
            step="0.01"
            {...register("amount", { required: "Podaj kwotę" })}
          />
          {errors.amount && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.amount.message}
            </p>
          )}

          <S.Label>Termin płatności</S.Label>
          <S.Input
            type="date"
            {...register("date", { required: "Wybierz datę" })}
          />
          {errors.date && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.date.message}
            </p>
          )}

          <S.Label>Załącznik (PDF/Zdjęcie)</S.Label>
          <S.Input type="file" {...register("attachment")} />

          <S.ButtonGroup>
            <Button type="submit">Zapisz płatność</Button>
            <Button
              type="button"
              secondary
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleModal());
              }}
            >
              Anuluj
            </Button>
          </S.ButtonGroup>
        </form>
      </S.Modal>
    </S.Overlay>
  );
};

export default AddPaymentForm;
