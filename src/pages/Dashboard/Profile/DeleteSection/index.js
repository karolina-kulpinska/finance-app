import React from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styled";

export const DeleteSection = ({ onDelete }) => {
  const { t } = useTranslation();
  return (
    <S.Card>
      <S.Icon>⚠️</S.Icon>
      <S.Title>{t("profile.dangerZone")}</S.Title>
      <S.Desc>{t("profile.deleteAccountWarning")}</S.Desc>
      <S.Button onClick={onDelete}>🗑️ {t("profile.deleteAccountButton")}</S.Button>
    </S.Card>
  );
};
