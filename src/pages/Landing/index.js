import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { toDashboard, toLogin, toRegistration, toDemo } from "../../routes";
import Hero from "./Hero";
import Features from "./Features";
import Benefits from "./Benefits";
import Footer from "./Footer";
import * as S from "./styled";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate(toDashboard());
    }
  }, [user, navigate]);

  const handleLogin = () => {
    navigate(toLogin());
  };

  const handleRegistration = () => {
    navigate(toRegistration());
  };

  const handleDemo = () => {
    navigate(toDemo());
  };

  return (
    <S.Wrapper>
      <S.Container>
        <Hero onLogin={handleLogin} onRegistration={handleRegistration} onDemo={handleDemo} />
        <Features />
        <Benefits />
        <Footer />
      </S.Container>
    </S.Wrapper>
  );
};

export default LandingPage;
