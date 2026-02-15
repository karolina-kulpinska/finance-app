import React from "react";
import * as S from "./styled";

const Hero = ({ onLogin, onRegistration }) => {
  return (
    <S.Hero>
      <S.Logo src={`${process.env.PUBLIC_URL || ""}/smartbudget-logo.png`} alt="Smart Budget" />
      <S.Title>Twoje finanse pod kontrolą</S.Title>
      <S.Subtitle>
        Mobilna aplikacja do zarządzania budżetem. Śledź wydatki i oszczędzaj więcej.
      </S.Subtitle>

      <S.ButtonGroup>
        <S.PrimaryButton onClick={onRegistration}>
          Wypróbuj za darmo
        </S.PrimaryButton>
        <S.SecondaryButton onClick={onLogin}>
          Zaloguj się
        </S.SecondaryButton>
      </S.ButtonGroup>
    </S.Hero>
  );
};

export default Hero;
