import React from "react";
import * as S from "./styled";

const Benefits = () => {
  return (
    <S.BenefitsSection>
      <S.SectionTitle>Wybierz swój plan</S.SectionTitle>
      <S.Benefits>
        <S.Benefit>
          <S.BenefitIcon>🆓</S.BenefitIcon>
          <S.BenefitContent>
            <S.BenefitTitle>Plan Free</S.BenefitTitle>
            <S.BenefitDescription>
              Podstawowe funkcje zarządzania budżetem. Idealne na start.
            </S.BenefitDescription>
          </S.BenefitContent>
        </S.Benefit>
        <S.Benefit>
          <S.BenefitIcon>⭐</S.BenefitIcon>
          <S.BenefitContent>
            <S.BenefitTitle>Plan Premium</S.BenefitTitle>
            <S.BenefitDescription>
              Zaawansowane analizy, nieograniczone cele i eksport danych.
            </S.BenefitDescription>
          </S.BenefitContent>
        </S.Benefit>
      </S.Benefits>
    </S.BenefitsSection>
  );
};

export default Benefits;
