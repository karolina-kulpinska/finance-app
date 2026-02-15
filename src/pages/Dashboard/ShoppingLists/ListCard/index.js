import React from "react";
import * as S from "./styled";

export const ListCard = ({ list, onClick }) => (
  <S.Card onClick={onClick}>
    <S.Name>{list.name}</S.Name>
    {list.sharedWithFamily && <S.SharedBadge>👨‍👩‍👧‍👦 Rodzina</S.SharedBadge>}
    <S.Stats>
      <S.ItemCount>
        {list.items.length}{" "}
        {list.items.length === 1 ? "produkt" : "produktów"}
      </S.ItemCount>
      <S.TotalPrice>{list.totalPrice.toFixed(2)} zł</S.TotalPrice>
    </S.Stats>
  </S.Card>
);
