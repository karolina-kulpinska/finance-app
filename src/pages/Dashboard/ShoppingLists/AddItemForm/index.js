import React from "react";
import * as S from "./styled";

export const AddItemForm = ({
  newItemName,
  newItemPrice,
  onNameChange,
  onPriceChange,
  onSubmit,
}) => (
  <S.Form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <S.Input
      type="text"
      placeholder="Nazwa produktu..."
      value={newItemName}
      onChange={(e) => onNameChange(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        }
      }}
    />
    <S.Input
      type="number"
      step="0.01"
      placeholder="Cena..."
      value={newItemPrice}
      onChange={(e) => onPriceChange(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        }
      }}
    />
    <S.SaveButton type="submit">+ Dodaj</S.SaveButton>
  </S.Form>
);
