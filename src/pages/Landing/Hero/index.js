import React from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styled";

const Hero = ({ onLogin, onRegistration, onDemo }) => {
  const { t } = useTranslation();
  return (
    <S.Hero>
      <S.Logo src={`${process.env.PUBLIC_URL || ""}/smartbudget-logo.png`} alt={t("appName")} />
      <S.Title>{t("landing.title")}</S.Title>
      <S.Subtitle>{t("landing.subtitle")}</S.Subtitle>

      <S.ButtonGroup>
        <S.PrimaryButton onClick={onRegistration}>{t("landing.tryFree")}</S.PrimaryButton>
        <S.SecondaryButton onClick={onLogin}>{t("landing.login")}</S.SecondaryButton>
      </S.ButtonGroup>
      <S.DemoButton onClick={onDemo}>🎯 {t("landing.tryDemo")}</S.DemoButton>
    </S.Hero>
  );
};

export default Hero;
