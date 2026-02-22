import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCurrency } from "../../../../features/currency/currencySlice";
import * as S from "./styled";

export const InsuranceFields = ({ register, errors, totalAmount }) => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);
  return (
    <>
      <S.FormGroup>
        <S.Label>{t("form.monthlyAmount")} ({currency.symbol}) *</S.Label>
        <S.Input
          type="number"
          step="0.01"
          {...register("amount", {
            required: t("form.monthlyRequired"),
            min: { value: 0.01, message: t("form.amountMin") },
          })}
          placeholder={t("form.placeholderAmountExample")}
        />
        {errors.amount && (
          <S.ErrorMessage>{errors.amount.message}</S.ErrorMessage>
        )}
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>{t("form.duration")}</S.Label>
        <S.Input
          type="number"
          min="1"
          {...register("duration", {
            required: t("form.durationRequired"),
            min: { value: 1, message: t("form.minDuration") },
          })}
          placeholder={t("form.placeholderMonthsExample")}
        />
        {errors.duration && (
          <S.ErrorMessage>{errors.duration.message}</S.ErrorMessage>
        )}
      </S.FormGroup>
      {totalAmount && (
        <S.TotalAmountBox>
          <S.TotalLabel>{t("form.totalAmount")}</S.TotalLabel>
          <S.TotalValue>{totalAmount} {currency.symbol}</S.TotalValue>
        </S.TotalAmountBox>
      )}
      <S.FormGroup>
        <S.Label>{t("form.accountNumber")}</S.Label>
        <S.Input {...register("accountNumber")} placeholder={t("form.accountPlaceholder")} />
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>{t("form.policyNumber")}</S.Label>
        <S.Input
          {...register("policyNumber")}
          placeholder={t("form.policyPlaceholder")}
        />
      </S.FormGroup>
    </>
  );
};
