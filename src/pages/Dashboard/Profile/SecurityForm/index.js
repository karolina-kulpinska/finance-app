import React from "react";
import * as S from "./styled";

export const SecurityForm = ({
  oldPassword,
  newPassword,
  confirmPassword,
  onOldPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onChangePassword,
}) => (
  <S.Form>
    <S.FormGroup>
      <S.Label>Stare hasło</S.Label>
      <S.Input
        type="password"
        value={oldPassword}
        onChange={(e) => onOldPasswordChange(e.target.value)}
        placeholder="Wprowadź stare hasło"
      />
    </S.FormGroup>

    <S.FormGroup>
      <S.Label>Nowe hasło</S.Label>
      <S.Input
        type="password"
        value={newPassword}
        onChange={(e) => onNewPasswordChange(e.target.value)}
        placeholder="Minimum 6 znaków"
      />
    </S.FormGroup>

    <S.FormGroup>
      <S.Label>Potwierdź nowe hasło</S.Label>
      <S.Input
        type="password"
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
        placeholder="Wpisz ponownie nowe hasło"
      />
    </S.FormGroup>

    <S.SaveButton onClick={onChangePassword}>🔒 Zmień hasło</S.SaveButton>
  </S.Form>
);
