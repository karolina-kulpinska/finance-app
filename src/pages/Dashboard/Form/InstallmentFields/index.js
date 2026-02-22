import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCurrency } from "../../../../features/currency/currencySlice";
import * as S from "./styled";

export const InstallmentFields = ({ register, errors, totalAmount }) => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);
  return (
    <>
      <S.FormGroup>
        <S.Label>{t("form.installmentAmount")} ({currency.symbol}) *</S.Label>
        <S.Input
          type="number"
          step="0.01"
          {...register("installmentAmount", {
            required: t("form.installmentRequired"),
            min: { value: 0.01, message: t("form.amountMin") },
          })}
          placeholder={t("form.placeholderAmountExample")}
        />
        {errors.installmentAmount && (
          <S.ErrorMessage>{errors.installmentAmount.message}</S.ErrorMessage>
        )}
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>{t("form.installmentsCount")}</S.Label>
        <S.Input
          type="number"
          min="2"
          {...register("installments", {
            required: t("form.installmentsRequired"),
            min: { value: 2, message: t("form.minInstallments") },
          })}
          placeholder={t("form.placeholderMonthsExample")}
        />
        {errors.installments && (
          <S.ErrorMessage>{errors.installments.message}</S.ErrorMessage>
        )}
      </S.FormGroup>
      {totalAmount && (
        <S.TotalAmountBox>
          <S.TotalLabel>{t("form.totalAmount")}</S.TotalLabel>
          <S.TotalValue>{totalAmount} {currency.symbol}</S.TotalValue>
        </S.TotalAmountBox>
      )}
      <S.FormGroup>
        <S.Label>{t("form.accountOptional")}</S.Label>
        <S.Input {...register("accountNumber")} placeholder={t("form.accountPlaceholder")} />
      </S.FormGroup>
    </>
  );
};
