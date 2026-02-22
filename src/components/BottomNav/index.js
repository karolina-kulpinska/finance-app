import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import { toLanding } from "../../routes";
import * as S from "./styled";

const BottomNav = ({ activeTab, onTabChange, isDemo = false, onExitDemo }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tabs = [
    { id: "dashboard", icon: "🏠", label: t("nav.home") },
    { id: "payments", icon: "💳", label: t("nav.payments") },
    { id: "shopping", icon: "🛒", label: t("nav.shopping") },
    { id: "family", icon: "👨‍👩‍👧‍👦", label: t("nav.family") },
    { id: "files", icon: "📁", label: t("nav.files") },
    { id: "profile", icon: "👤", label: t("nav.profile") },
    {
      id: "logout",
      icon: "🚪",
      label: isDemo ? t("nav.exitDemo") : t("nav.logout"),
    },
  ];

  const handleLogout = async () => {
    if (isDemo && onExitDemo) {
      onExitDemo();
      return;
    }
    try {
      await signOut(auth);
      dispatch(logout());
      navigate(toLanding());
    } catch (error) {
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
