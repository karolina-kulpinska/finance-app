import React from "react";
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
