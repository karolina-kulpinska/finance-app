import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { toDashboard, toLogin, toRegistration } from "../../routes";
import * as S from "./styled";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate(toDashboard());
    }
  }, [user, navigate]);

  const handleLogin = () => {
    navigate(toLogin());
  };

  const handleRegistration = () => {
    navigate(toRegistration());
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Hero>
          <S.Title>Twoje finanse pod kontrolą</S.Title>
          <S.Subtitle>
            Mobilna aplikacja do zarządzania budżetem. Śledź wydatki i oszczędzaj więcej.
          </S.Subtitle>

          <S.ButtonGroup>
            <S.PrimaryButton onClick={handleRegistration}>
              Wypróbuj za darmo
            </S.PrimaryButton>
            <S.SecondaryButton onClick={handleLogin}>
              Zaloguj się
            </S.SecondaryButton>
          </S.ButtonGroup>
        </S.Hero>

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
      </S.Container>
    </S.Wrapper>
  );
};

export default LandingPage;
