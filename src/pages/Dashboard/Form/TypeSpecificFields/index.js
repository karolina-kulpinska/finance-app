import React from "react";
import { useTranslation } from "react-i18next";
import { InstallmentFields } from "../InstallmentFields";
import { InsuranceFields } from "../InsuranceFields";
import * as S from "./styled";

export const TypeSpecificFields = ({
  paymentType,
  register,
  errors,
  totalInstallmentAmount,
  totalInsuranceAmount,
}) => {
  const { t } = useTranslation();
  switch (paymentType) {
    case "installments":
      return (
        <InstallmentFields
          register={register}
          errors={errors}
          totalAmount={totalInstallmentAmount}
        />
      );
    case "insurance":
      return (
        <InsuranceFields
          register={register}
          errors={errors}
          totalAmount={totalInsuranceAmount}
        />
      );
    case "bills":
      return (
        <S.FormGroup>
          <S.Label>{t("form.accountNumber")}</S.Label>
          <S.Input
            {...register("accountNumber")}
            placeholder={t("form.accountPlaceholder")}
          />
        </S.FormGroup>
      );
    default:
      return null;
  }
};
