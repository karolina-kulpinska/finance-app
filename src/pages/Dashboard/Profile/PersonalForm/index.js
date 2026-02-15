import React from "react";
import * as S from "./styled";

export const PersonalForm = ({
  editName,
  onEditNameChange,
  userEmail,
  onSave,
}) => (
  <S.Form>
    <S.FormGroup>
      <S.Label>Imię i nazwisko</S.Label>
      <S.Input
        type="text"
        value={editName}
        onChange={(e) => onEditNameChange(e.target.value)}
        placeholder="Wpisz imię i nazwisko"
      />
    </S.FormGroup>

    <S.FormGroup>
      <S.Label>Email</S.Label>
      <S.Input type="email" value={userEmail} disabled placeholder={userEmail} />
      <S.HelpText>Email nie może być zmieniony</S.HelpText>
    </S.FormGroup>

    <S.SaveButton onClick={onSave}>💾 Zapisz zmiany</S.SaveButton>
  </S.Form>
);
