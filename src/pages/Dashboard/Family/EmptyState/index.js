import React from "react";
import * as S from "./styled";

export const EmptyState = ({ onCreateFamily }) => (
  <S.Container>
    <S.EmptyState>
      <S.EmptyIcon>👨‍👩‍👧‍👦</S.EmptyIcon>
      <S.EmptyTitle>Nie należysz do rodziny</S.EmptyTitle>
      <S.EmptyText>
        Utwórz rodzinę, aby udostępniać płatności, dokumenty i listy zakupów
        z najbliższymi
      </S.EmptyText>
      <S.CreateFamilyButton onClick={onCreateFamily}>
        ➕ Utwórz rodzinę
      </S.CreateFamilyButton>
    </S.EmptyState>
  </S.Container>
);
