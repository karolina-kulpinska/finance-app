import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import * as S from "./styled";

const Profile = () => {
  const user = useSelector(selectUser);

  const userEmail = user?.email || "brak@email.com";
  const userName = user?.displayName || "Użytkownik";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <S.Container>
      <S.ProfileCard>
        <S.Avatar>{userInitials}</S.Avatar>
        <S.UserName>{userName}</S.UserName>
        <S.UserEmail>{userEmail}</S.UserEmail>
      </S.ProfileCard>

      <S.SettingsSection>
        <S.SectionTitle>⚙️ Ustawienia konta</S.SectionTitle>
        <S.SettingsList>
          <S.SettingItem>
            <S.SettingIcon>👤</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Dane osobowe</S.SettingLabel>
              <S.SettingDesc>Edytuj imię, nazwisko i zdjęcie</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem>
            <S.SettingIcon>🔒</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Bezpieczeństwo</S.SettingLabel>
              <S.SettingDesc>Zmień hasło i ustawienia bezpieczeństwa</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem>
            <S.SettingIcon>🔔</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Powiadomienia</S.SettingLabel>
              <S.SettingDesc>Zarządzaj powiadomieniami o płatnościach</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem>
            <S.SettingIcon>🎨</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Wygląd</S.SettingLabel>
              <S.SettingDesc>Personalizuj kolory i motyw aplikacji</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem>
            <S.SettingIcon>💾</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Backup danych</S.SettingLabel>
              <S.SettingDesc>Eksportuj i importuj swoje dane</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>
        </S.SettingsList>
      </S.SettingsSection>

      <S.SettingsSection>
        <S.SectionTitle>ℹ️ Informacje</S.SectionTitle>
        <S.SettingsList>
          <S.SettingItem>
            <S.SettingIcon>📖</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Pomoc i FAQ</S.SettingLabel>
              <S.SettingDesc>Najczęściej zadawane pytania</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem>
            <S.SettingIcon>📧</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Kontakt</S.SettingLabel>
              <S.SettingDesc>Skontaktuj się z pomocą techniczną</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem>
            <S.SettingIcon>⭐</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Oceń aplikację</S.SettingLabel>
              <S.SettingDesc>Podziel się opinią w sklepie</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>
        </S.SettingsList>
      </S.SettingsSection>

      <S.AppVersion>Wersja 1.0.0</S.AppVersion>
    </S.Container>
  );
};

export default Profile;
