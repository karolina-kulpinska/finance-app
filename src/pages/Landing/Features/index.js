import React from "react";
import * as S from "./styled";

const Features = () => {
  return (
    <S.FeaturesSection>
      <S.Features>
        <S.Feature>
          <S.FeatureIcon>📊</S.FeatureIcon>
          <S.FeatureTitle>Analiza wydatków</S.FeatureTitle>
          <S.FeatureDescription>
            Przejrzyste wykresy pokazujące dokąd trafiają Twoje pieniądze.
          </S.FeatureDescription>
        </S.Feature>
        <S.Feature>
          <S.FeatureIcon>💰</S.FeatureIcon>
          <S.FeatureTitle>Zarządzanie budżetem</S.FeatureTitle>
          <S.FeatureDescription>
            Planuj miesięczne budżety i kontroluj swoje wydatki.
          </S.FeatureDescription>
        </S.Feature>
        <S.Feature>
          <S.FeatureIcon>🎯</S.FeatureIcon>
          <S.FeatureTitle>Cele oszczędnościowe</S.FeatureTitle>
          <S.FeatureDescription>
            Wyznaczaj cele i śledź postępy w ich realizacji.
          </S.FeatureDescription>
        </S.Feature>
      </S.Features>
    </S.FeaturesSection>
  );
};

export default Features;
