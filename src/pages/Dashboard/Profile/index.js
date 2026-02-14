import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../api/firebase";
import { showNotification } from "../../../features/notification/notificationSlice";
import * as S from "./styled";

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [activeSection, setActiveSection] = useState(null);
  const [editName, setEditName] = useState(user?.displayName || "");

  const userEmail = user?.email || "brak@email.com";
  const userName = user?.displayName || "Użytkownik";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleUpdateName = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: editName,
      });
      dispatch(showNotification({
        message: "Imię zostało zaktualizowane!",
        type: "success",
      }));
      setActiveSection(null);
    } catch (error) {
      dispatch(showNotification({
        message: "Błąd aktualizacji: " + error.message,
        type: "error",
      }));
    }
  };

  if (activeSection === "personal") {
    return (
      <S.Container>
        <S.EditHeader>
          <S.BackButton onClick={() => setActiveSection(null)}>← Powrót</S.BackButton>
          <S.EditTitle>Dane osobowe</S.EditTitle>
        </S.EditHeader>

        <S.EditForm>
          <S.FormGroup>
            <S.Label>Imię i nazwisko</S.Label>
            <S.Input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Wpisz imię i nazwisko"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Email</S.Label>
            <S.Input
              type="email"
              value={userEmail}
              disabled
              placeholder={userEmail}
            />
            <S.HelpText>Email nie może być zmieniony</S.HelpText>
          </S.FormGroup>

          <S.SaveButton onClick={handleUpdateName}>
            Zapisz zmiany
          </S.SaveButton>
        </S.EditForm>
      </S.Container>
    );
  }

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
          <S.SettingItem onClick={() => setActiveSection("personal")}>
            <S.SettingIcon>👤</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Dane osobowe</S.SettingLabel>
              <S.SettingDesc>Edytuj imię i nazwisko</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem>
            <S.SettingIcon>🔒</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Bezpieczeństwo</S.SettingLabel>
              <S.SettingDesc>Zmień hasło (wkrótce)</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem>
            <S.SettingIcon>🔔</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Powiadomienia</S.SettingLabel>
              <S.SettingDesc>Zarządzaj powiadomieniami (wkrótce)</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem>
            <S.SettingIcon>🎨</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Wygląd</S.SettingLabel>
              <S.SettingDesc>Personalizuj kolory (wkrótce)</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem>
            <S.SettingIcon>💾</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Backup danych</S.SettingLabel>
              <S.SettingDesc>Eksportuj dane (wkrótce)</S.SettingDesc>
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
