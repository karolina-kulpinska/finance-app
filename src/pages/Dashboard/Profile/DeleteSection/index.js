import React from "react";
import * as S from "./styled";

export const DeleteSection = ({ onDelete }) => (
  <S.Card>
    <S.Icon>⚠️</S.Icon>
    <S.Title>Strefa niebezpieczna</S.Title>
    <S.Desc>
      Usunięcie konta jest operacją nieodwracalną. Stracisz wszystkie swoje
      dane, płatności, listy zakupów i dostęp do rodziny.
    </S.Desc>
    <S.Button onClick={onDelete}>🗑️ Usuń konto na zawsze</S.Button>
  </S.Card>
);
