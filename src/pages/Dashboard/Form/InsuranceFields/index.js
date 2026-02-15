import React from "react";
import * as S from "./styled";

export const InsuranceFields = ({ register, errors, totalAmount }) => (
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
    {totalAmount && (
      <S.TotalAmountBox>
        <S.TotalLabel>Kwota całkowita:</S.TotalLabel>
        <S.TotalValue>{totalAmount} zł</S.TotalValue>
      </S.TotalAmountBox>
    )}
    <S.FormGroup>
      <S.Label>Numer konta</S.Label>
      <S.Input {...register("accountNumber")} placeholder="np. 12 3456 7890..." />
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
