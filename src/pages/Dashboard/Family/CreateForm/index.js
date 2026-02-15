import React from "react";
import * as S from "./styled";

export const CreateForm = ({
  familyName,
  setFamilyName,
  onCreateFamily,
  onBack,
}) => (
  <S.Container>
    <S.Header>
      <S.BackButton onClick={onBack}>← Powrót</S.BackButton>
      <S.Title>Utwórz rodzinę</S.Title>
    </S.Header>

    <S.CreateCard>
      <S.CreateIcon>👨‍👩‍👧‍👦</S.CreateIcon>
      <S.CreateTitle>Nowa rodzina</S.CreateTitle>
      <S.CreateDesc>
        Stwórz rodzinę, aby udostępniać płatności, listy zakupów i dokumenty
      </S.CreateDesc>

      <S.Input
        type="text"
        value={familyName}
        onChange={(e) => setFamilyName(e.target.value)}
        placeholder="np. Rodzina Kowalskich"
      />

      <S.CreateButton
        onClick={onCreateFamily}
        disabled={!familyName.trim()}
      >
        ✨ Utwórz rodzinę
      </S.CreateButton>
    </S.CreateCard>
  </S.Container>
);
