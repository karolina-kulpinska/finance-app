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
      <S.BackButton
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onBack) onBack();
        }}
      >
        ←
      </S.BackButton>
      <S.Title>Utwórz rodzinę</S.Title>
    </S.Header>

    <S.CreateCard>
      <S.CreateTitle>Nowa rodzina</S.CreateTitle>
      <S.CreateDesc>
        Wpisz nazwę rodziny. Będziesz mógł udostępniać płatności, listy zakupów i pliki.
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
        Utwórz rodzinę
      </S.CreateButton>
    </S.CreateCard>
  </S.Container>
);
