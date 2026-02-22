import React from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styled";

export const PersonalForm = ({
  editName,
  onEditNameChange,
  userEmail,
  onSave,
}) => {
  const { t } = useTranslation();
  return (
    <S.Form>
      <S.FormGroup>
        <S.Label>{t("profile.fullName")}</S.Label>
        <S.Input
          type="text"
          value={editName}
          onChange={(e) => onEditNameChange(e.target.value)}
          placeholder={t("profile.fullNamePlaceholder")}
        />
      </S.FormGroup>

      <S.FormGroup>
        <S.Label>{t("profile.email")}</S.Label>
        <S.Input type="email" value={userEmail} disabled placeholder={userEmail} />
        <S.HelpText>{t("profile.emailCannotChange")}</S.HelpText>
      </S.FormGroup>

      <S.SaveButton onClick={onSave}>💾 {t("profile.saveChanges")}</S.SaveButton>
    </S.Form>
  );
};
