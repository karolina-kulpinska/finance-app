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
    dispatch(addPaymentRequest(data));
  };

  return (
    <S.Overlay onClick={() => dispatch(toggleModal())}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.FormTitle>Nowa Płatność</S.FormTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.Label>Nazwa rachunku</S.Label>
          <S.Input
            {...register("name", { required: "Podaj nazwę" })}
            placeholder="np. Prąd, Czynsz"
          />

          <S.Label>Kwota (zł)</S.Label>
          <S.Input
            type="number"
            step="0.01"
            {...register("amount", { required: "Podaj kwotę" })}
          />

          <S.Label>Termin płatności</S.Label>
          <S.Input
            type="date"
            {...register("date", { required: "Wybierz datę" })}
          />

          <S.Label>Załącznik (PDF/Zdjęcie)</S.Label>
          <S.Input type="file" {...register("attachment")} />

          <S.ButtonGroup>
            <Button type="submit">Zapisz płatność</Button>
            <Button
              type="button"
              secondary
              onClick={() => dispatch(toggleModal())}
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
