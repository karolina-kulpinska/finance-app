import React from "react";
import * as S from "./styled";

export const InstallmentFields = ({ register, errors, totalAmount }) => (
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
        <S.ErrorMessage>{errors.installmentAmount.message}</S.ErrorMessage>
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
    {totalAmount && (
      <S.TotalAmountBox>
        <S.TotalLabel>Kwota całkowita:</S.TotalLabel>
        <S.TotalValue>{totalAmount} zł</S.TotalValue>
      </S.TotalAmountBox>
    )}
    <S.FormGroup>
      <S.Label>Numer konta (opcjonalnie)</S.Label>
      <S.Input {...register("accountNumber")} placeholder="np. 12 3456 7890..." />
    </S.FormGroup>
  </>
);
