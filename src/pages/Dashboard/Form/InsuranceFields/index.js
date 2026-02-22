import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCurrency } from "../../../../features/currency/currencySlice";
import * as S from "./styled";

export const InsuranceFields = ({ register, errors, totalAmount, watch }) => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);
  const interval = watch?.("insuranceInterval") || "month";
  const isYearly = interval === "year";

  return (
    <>
      <S.FormGroup>
        <S.Label>{t("form.insuranceInterval")}</S.Label>
        <S.Select {...register("insuranceInterval")}>
          <option value="month">{t("form.insuranceIntervalMonth")}</option>
          <option value="year">{t("form.insuranceIntervalYear")}</option>
        </S.Select>
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>
          {isYearly ? t("form.yearlyAmount") : t("form.monthlyAmount")} ({currency.symbol}) *
        </S.Label>
        <S.Input
          type="number"
          step="0.01"
          {...register("amount", {
            required: isYearly ? t("form.yearlyRequired") : t("form.monthlyRequired"),
            min: { value: 0.01, message: t("form.amountMin") },
          })}
          placeholder={t("form.placeholderAmountExample")}
        />
        {errors.amount && (
          <S.ErrorMessage>{errors.amount.message}</S.ErrorMessage>
        )}
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>{isYearly ? t("form.durationYears") : t("form.durationMonths")}</S.Label>
        <S.Input
          type="number"
          min="1"
          {...register("duration", {
            required: t("form.durationRequired"),
            min: { value: 1, message: isYearly ? t("form.minDurationYear") : t("form.minDuration") },
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
