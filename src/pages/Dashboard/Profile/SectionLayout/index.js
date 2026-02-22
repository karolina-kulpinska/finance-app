import React from "react";
import * as S from "./styled";

export const SectionLayout = ({ title, onBack, children }) => (
  <S.Container>
    <S.Header>
      <S.BackButton
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onBack) onBack();
        }}
      >
        ← Powrót
      </S.BackButton>
      <S.Title>{title}</S.Title>
    </S.Header>
    {children}
  </S.Container>
);
