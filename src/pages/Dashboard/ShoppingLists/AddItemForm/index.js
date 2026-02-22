import React from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styled";

export const AddItemForm = ({
  newItemName,
  newItemPrice,
  onNameChange,
  onPriceChange,
  onSubmit,
}) => {
  const { t } = useTranslation();
  return (
  <S.Form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <S.Input
      type="text"
      placeholder={t("shopping.productPlaceholder")}
      value={newItemName}
      onChange={(e) => onNameChange(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        }
      }}
    />
    <S.PriceInput
      type="number"
      step="0.01"
      placeholder={t("shopping.pricePlaceholder")}
      value={newItemPrice}
      onChange={(e) => onPriceChange(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        }
      }}
    />
    <S.SaveButton type="submit">{t("shopping.add")}</S.SaveButton>
  </S.Form>
  );
};
