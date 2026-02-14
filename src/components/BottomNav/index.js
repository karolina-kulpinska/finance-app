import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import { toLanding } from "../../routes";
import * as S from "./styled";

const BottomNav = ({ activeTab, onTabChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tabs = [
    { id: "dashboard", icon: "🏠", label: "Główna" },
    { id: "payments", icon: "💳", label: "Płatności" },
    { id: "files", icon: "📁", label: "Pliki" },
    { id: "profile", icon: "👤", label: "Profil" },
    { id: "logout", icon: "🚪", label: "Wyloguj" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate(toLanding());
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  const handleTabClick = (tabId) => {
    if (tabId === "logout") {
      handleLogout();
    } else {
      onTabChange(tabId);
    }
  };

  return (
    <S.BottomNavContainer>
      <S.NavWrapper>
        {tabs.map((tab) => (
          <S.NavItem
            key={tab.id}
            $active={activeTab === tab.id}
            $isLogout={tab.id === "logout"}
            onClick={() => handleTabClick(tab.id)}
          >
            <S.NavIcon $active={activeTab === tab.id} $isLogout={tab.id === "logout"}>
              {tab.icon}
            </S.NavIcon>
            <S.NavLabel $active={activeTab === tab.id} $isLogout={tab.id === "logout"}>
              {tab.label}
            </S.NavLabel>
          </S.NavItem>
        ))}
      </S.NavWrapper>
    </S.BottomNavContainer>
  );
};

export default BottomNav;
