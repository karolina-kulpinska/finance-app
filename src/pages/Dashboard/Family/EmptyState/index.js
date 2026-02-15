import React from "react";
import * as S from "./styled";

export const EmptyState = ({ onCreateFamily }) => (
  <S.Container>
    <S.EmptyState>
      <S.EmptyIcon>
        <svg width="56" height="40" viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.9"/>
          <circle cx="42" cy="14" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.9"/>
          <path d="M8 36c0-6 3-10 6-10s6 4 6 10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.9"/>
          <path d="M36 36c0-6 3-10 6-10s6 4 6 10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.9"/>
          <line x1="20" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
        </svg>
      </S.EmptyIcon>
      <S.EmptyTitle>Nie należysz do rodziny</S.EmptyTitle>
      <S.EmptyText>
        Utwórz rodzinę, aby udostępniać płatności, dokumenty i listy zakupów z najbliższymi
      </S.EmptyText>
      <S.CreateFamilyButton onClick={onCreateFamily}>Utwórz rodzinę</S.CreateFamilyButton>
    </S.EmptyState>
  </S.Container>
);
