import React from "react";
import { useDispatch } from "react-redux";
import * as S from "./styled";

const LandingPage = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch({ type: "auth/loginWithGoogleRequest" });
  };

  return (
    <S.Wrapper>
      <S.Navbar>
        <S.Logo>SmartBudget</S.Logo>
      </S.Navbar>

      <S.Hero>
        <S.Title>Zapanuj nad swoimi rachunkami z klasą</S.Title>
        <S.Subtitle>
          Intuicyjne zarządzanie płatnościami domowymi. Wszystko w jednym
          miejscu, bezpiecznie i zawsze pod ręką.
        </S.Subtitle>

        <S.CtaGroup>
          <S.PremiumButton onClick={handleGoogleLogin}>
            🚀 Zacznij teraz z Google
          </S.PremiumButton>
        </S.CtaGroup>

        <S.MockupContainer>
          <S.MockupImage />
        </S.MockupContainer>
      </S.Hero>
    </S.Wrapper>
  );
};

export default LandingPage;
