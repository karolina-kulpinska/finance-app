import React from "react";
import { useSelector } from "react-redux";
import {
  selectIsPro,
  selectRenewalDate,
  selectSubscriptionStatus,
} from "../../../../features/subscription/subscriptionSlice";
import * as S from "./styled";

export const ProfileMain = ({
  userInitials,
  userName,
  userEmail,
  onSectionSelect,
  onContact,
  onAbout,
}) => {
  const isPro = useSelector(selectIsPro);
  const renewalDate = useSelector(selectRenewalDate);
  const subscriptionStatus = useSelector(selectSubscriptionStatus);

  const renewalDateDisplay = renewalDate
    ? new Date(renewalDate).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
  <>
    <S.ProfileCard>
      <S.Avatar>{userInitials}</S.Avatar>
      <S.UserName>{userName}</S.UserName>
      <S.UserEmail>{userEmail}</S.UserEmail>
    </S.ProfileCard>

    <S.SettingsSection>
      <S.SectionTitle>💳 Subskrypcja</S.SectionTitle>
      <S.SettingsList>
        <S.SettingItem onClick={() => onSectionSelect("subscription")}>
          <S.SettingIcon>{isPro ? "⭐" : "📦"}</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>
              {isPro ? "Plan Pro" : "Plan Bezpłatny"}
            </S.SettingLabel>
            <S.SettingDesc>
              {isPro && renewalDateDisplay
                ? `Odnowienie: ${renewalDateDisplay}`
                : isPro
                  ? "Aktywna subskrypcja"
                  : "Ulepsz do Pro"}
            </S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>
      </S.SettingsList>
    </S.SettingsSection>

    <S.SettingsSection>
      <S.SectionTitle>⚙️ Ustawienia konta</S.SectionTitle>
      <S.SettingsList>
        <S.SettingItem onClick={() => onSectionSelect("personal")}>
          <S.SettingIcon>👤</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>Dane osobowe</S.SettingLabel>
            <S.SettingDesc>Edytuj imię i nazwisko</S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>

        <S.SettingItem onClick={() => onSectionSelect("security")}>
          <S.SettingIcon>🔒</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>Bezpieczeństwo</S.SettingLabel>
            <S.SettingDesc>Zmień hasło</S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>

        <S.SettingItem onClick={() => onSectionSelect("export")}>
          <S.SettingIcon>💾</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>Eksport danych</S.SettingLabel>
            <S.SettingDesc>Pobierz wszystkie swoje dane</S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>

        <S.SettingItem onClick={() => onSectionSelect("delete")}>
          <S.SettingIcon>🗑️</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>Usuń konto</S.SettingLabel>
            <S.SettingDesc>Usuń konto i wszystkie dane</S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>
      </S.SettingsList>
    </S.SettingsSection>

    <S.SettingsSection>
      <S.SectionTitle>ℹ️ Informacje</S.SectionTitle>
      <S.SettingsList>
        <S.SettingItem onClick={onContact}>
          <S.SettingIcon>📧</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>Kontakt</S.SettingLabel>
            <S.SettingDesc>pomoc@finanseapp.pl</S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>

        <S.SettingItem onClick={onAbout}>
          <S.SettingIcon>ℹ️</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>O aplikacji</S.SettingLabel>
            <S.SettingDesc>Wersja 1.0.0</S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>
      </S.SettingsList>
    </S.SettingsSection>

    <S.AppVersion>Wersja 1.0.0</S.AppVersion>
  </>
  );
};
