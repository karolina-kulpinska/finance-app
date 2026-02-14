import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import * as S from "./styled";

const Header = ({ onAddPayment, onToggleFilters, showFilters, hideFilters }) => {
  const user = useSelector(selectUser);

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
        {!hideFilters && (
          <S.FilterToggleButton onClick={onToggleFilters}>
            {showFilters ? "▲" : "▼"}
          </S.FilterToggleButton>
        )}
      </S.Actions>
    </S.Header>
  );
};

export default Header;
