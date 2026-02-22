import React from "react";
import { useSelector } from "react-redux";
import { selectCurrency, formatAmount } from "../../../../features/currency/currencySlice";
import * as S from "./styled";

export const ItemCard = ({ item, onToggle, onDelete }) => {
  const currency = useSelector(selectCurrency);
  return (
  <S.Card $purchased={item.purchased}>
    <S.Checkbox
      type="checkbox"
      checked={item.purchased}
      onChange={onToggle}
    />
    <S.Info>
      <S.Name $purchased={item.purchased}>{item.name}</S.Name>
      <S.Price $purchased={item.purchased}>
        {formatAmount(item.price, currency)}
      </S.Price>
    </S.Info>
    <S.DeleteButton onClick={onDelete}>🗑️</S.DeleteButton>
  </S.Card>
  );
};
