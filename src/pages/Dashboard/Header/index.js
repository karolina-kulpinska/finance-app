import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../../features/auth/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../../api/firebase";
import { toLanding } from "../../../routes";
import * as S from "./styled";

const Header = ({ onAddPayment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate(toLanding());
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  return (
    <S.Header>
      <S.TitleSection>
        <S.Title>Panel Finansowy</S.Title>
        <S.Subtitle>
          Witaj, {user?.displayName || user?.email || "Użytkowniku"}!
        </S.Subtitle>
      </S.TitleSection>
      <S.Actions>
        <S.AddButton onClick={onAddPayment}>
          + Dodaj płatność
        </S.AddButton>
        <S.LogoutButton onClick={handleLogout}>
          Wyloguj się
        </S.LogoutButton>
      </S.Actions>
    </S.Header>
  );
};

export default Header;
