import React from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styled";

export const SecurityForm = ({
  oldPassword,
  newPassword,
  confirmPassword,
  onOldPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onChangePassword,
}) => {
  const { t } = useTranslation();
  return (
    <S.Form>
      <S.FormGroup>
        <S.Label>{t("profile.oldPassword")}</S.Label>
        <S.Input
          type="password"
          value={oldPassword}
          onChange={(e) => onOldPasswordChange(e.target.value)}
          placeholder={t("profile.oldPasswordPlaceholder")}
        />
      </S.FormGroup>

      <S.FormGroup>
        <S.Label>{t("profile.newPassword")}</S.Label>
        <S.Input
          type="password"
          value={newPassword}
          onChange={(e) => onNewPasswordChange(e.target.value)}
          placeholder={t("profile.newPasswordPlaceholder")}
        />
      </S.FormGroup>

      <S.FormGroup>
        <S.Label>{t("profile.confirmPassword")}</S.Label>
        <S.Input
          type="password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          placeholder={t("profile.confirmPasswordPlaceholder")}
        />
      </S.FormGroup>

      <S.SaveButton onClick={onChangePassword}>🔒 {t("profile.changePasswordButton")}</S.SaveButton>
    </S.Form>
  );
};
