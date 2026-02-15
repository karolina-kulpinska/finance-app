import React from "react";
import * as S from "./styled";

export const ItemCard = ({ item, onToggle, onDelete }) => (
  <S.Card $purchased={item.purchased}>
    <S.Checkbox
      type="checkbox"
      checked={item.purchased}
      onChange={onToggle}
    />
    <S.Info>
      <S.Name $purchased={item.purchased}>{item.name}</S.Name>
      <S.Price $purchased={item.purchased}>
        {item.price.toFixed(2)} zł
      </S.Price>
    </S.Info>
    <S.DeleteButton onClick={onDelete}>🗑️</S.DeleteButton>
  </S.Card>
);
