import React from "react";
import * as S from "./styled";

export const SectionLayout = ({ title, onBack, children }) => (
  <S.Container>
    <S.Header>
      <S.BackButton onClick={onBack}>← Powrót</S.BackButton>
      <S.Title>{title}</S.Title>
    </S.Header>
    {children}
  </S.Container>
);
