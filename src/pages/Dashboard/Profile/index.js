import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { selectPayments } from "../../../features/payments/paymentSlice";
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { auth } from "../../../api/firebase";
import { showNotification } from "../../../features/notification/notificationSlice";
import { generatePaymentsPDF } from "./generatePaymentsPDF";
import * as S from "./styled";

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const handleExportPaymentsPDF = () => {
    if (!payments || payments.length === 0) {
      dispatch(
        showNotification({
          message: "Brak płatności do eksportu",
          type: "error",
        }),
      );
      return;
    }
    try {
      generatePaymentsPDF(payments);
      dispatch(
        showNotification({
          message: "✅ Historia płatności została wyeksportowana do PDF!",
          type: "success",
        }),
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: "❌ Błąd eksportu PDF",
          type: "error",
        }),
      );
    }
  };

  const [activeSection, setActiveSection] = useState(null);
  const [editName, setEditName] = useState(user?.displayName || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userEmail = user?.email || "brak@email.com";
  const userName = user?.displayName || "Użytkownik";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleUpdateName = async () => {
    if (!editName.trim()) {
      dispatch(
        showNotification({
          message: "Imię nie może być puste",
          type: "error",
        }),
      );
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: editName,
      });
      dispatch(
        showNotification({
          message: "✅ Imię zostało zaktualizowane!",
          type: "success",
        }),
      );
      setActiveSection(null);
    } catch (error) {
      dispatch(
        showNotification({
          message: "❌ Błąd aktualizacji: " + error.message,
          type: "error",
        }),
      );
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      dispatch(
        showNotification({
          message: "❌ Nowe hasła nie są identyczne",
          type: "error",
        }),
      );
      return;
    }

    if (newPassword.length < 6) {
      dispatch(
        showNotification({
          message: "❌ Hasło musi mieć minimum 6 znaków",
          type: "error",
        }),
      );
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        oldPassword,
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      await updatePassword(auth.currentUser, newPassword);

      dispatch(
        showNotification({
          message: "✅ Hasło zostało zmienione!",
          type: "success",
        }),
      );

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setActiveSection(null);
    } catch (error) {
      let errorMessage = "❌ Błąd zmiany hasła";
      if (error.code === "auth/wrong-password") {
        errorMessage = "❌ Nieprawidłowe stare hasło";
      }
      dispatch(
        showNotification({
          message: errorMessage,
          type: "error",
        }),
      );
    }
  };

  const handleExportData = async () => {
    try {
      const dataToExport = {
        user: {
          email: user.email,
          displayName: user.displayName,
        },
        exportDate: new Date().toISOString(),
        // Tu można dodać więcej danych
      };

      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `finanseexport_${new Date().getTime()}.json`;
      link.click();
      URL.revokeObjectURL(url);

      dispatch(
        showNotification({
          message: "✅ Dane zostały wyeksportowane!",
          type: "success",
        }),
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: "❌ Błąd eksportu danych",
          type: "error",
        }),
      );
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "⚠️ CZY NA PEWNO CHCESZ USUNĄĆ KONTO?\n\nTa operacja jest NIEODWRACALNA!\nStracisz wszystkie swoje dane, płatności i listy zakupów.",
    );

    if (!confirmed) return;

    const doubleConfirm = window.confirm(
      "🚨 OSTATNIE OSTRZEŻENIE!\n\nCzy jesteś absolutnie pewien?\nWszystkie dane zostaną TRWALE USUNIĘTE.",
    );

    if (!doubleConfirm) return;

    try {
      await deleteUser(auth.currentUser);
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        dispatch(
          showNotification({
            message:
              "❌ Musisz się wylogować i zalogować ponownie przed usunięciem konta",
            type: "error",
          }),
        );
      } else {
        dispatch(
          showNotification({
            message: "❌ Błąd usuwania konta: " + error.message,
            type: "error",
          }),
        );
      }
    }
  };

  if (activeSection === "personal") {
    return (
      <S.Container>
        <S.EditHeader>
          <S.BackButton onClick={() => setActiveSection(null)}>
            ← Powrót
          </S.BackButton>
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
            💾 Zapisz zmiany
          </S.SaveButton>
        </S.EditForm>
      </S.Container>
    );
  }

  if (activeSection === "security") {
    return (
      <S.Container>
        <S.EditHeader>
          <S.BackButton onClick={() => setActiveSection(null)}>
            ← Powrót
          </S.BackButton>
          <S.EditTitle>Zmiana hasła</S.EditTitle>
        </S.EditHeader>

        <S.EditForm>
          <S.FormGroup>
            <S.Label>Stare hasło</S.Label>
            <S.Input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Wprowadź stare hasło"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Nowe hasło</S.Label>
            <S.Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 znaków"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Potwierdź nowe hasło</S.Label>
            <S.Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Wpisz ponownie nowe hasło"
            />
          </S.FormGroup>

          <S.SaveButton onClick={handleChangePassword}>
            🔒 Zmień hasło
          </S.SaveButton>
        </S.EditForm>
      </S.Container>
    );
  }

  if (activeSection === "export") {
    return (
      <S.Container>
        <S.EditHeader>
          <S.BackButton onClick={() => setActiveSection(null)}>
            ← Powrót
          </S.BackButton>
          <S.EditTitle>Eksport danych</S.EditTitle>
        </S.EditHeader>

        <S.ExportCard>
          <S.ExportIcon>💾</S.ExportIcon>
          <S.ExportTitle>Pobierz swoje dane</S.ExportTitle>
          <S.ExportDesc>
            Pobierz wszystkie swoje dane w formacie JSON lub historię płatności
            w PDF. Plik JSON będzie zawierał płatności, listy zakupów i
            ustawienia.
          </S.ExportDesc>
          <S.SaveButton onClick={handleExportData}>
            📥 Eksportuj dane (JSON)
          </S.SaveButton>
          <S.SaveButton
            onClick={handleExportPaymentsPDF}
            style={{ marginTop: 8 }}
          >
            🧾 Eksportuj historię płatności (PDF)
          </S.SaveButton>
        </S.ExportCard>
      </S.Container>
    );
  }

  if (activeSection === "delete") {
    return (
      <S.Container>
        <S.EditHeader>
          <S.BackButton onClick={() => setActiveSection(null)}>
            ← Powrót
          </S.BackButton>
          <S.EditTitle>Usuń konto</S.EditTitle>
        </S.EditHeader>

        <S.DangerCard>
          <S.DangerIcon>⚠️</S.DangerIcon>
          <S.DangerTitle>Strefa niebezpieczna</S.DangerTitle>
          <S.DangerDesc>
            Usunięcie konta jest operacją nieodwracalną. Stracisz wszystkie
            swoje dane, płatności, listy zakupów i dostęp do rodziny.
          </S.DangerDesc>
          <S.DangerButton onClick={handleDeleteAccount}>
            🗑️ Usuń konto na zawsze
          </S.DangerButton>
        </S.DangerCard>
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

          <S.SettingItem onClick={() => setActiveSection("security")}>
            <S.SettingIcon>🔒</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Bezpieczeństwo</S.SettingLabel>
              <S.SettingDesc>Zmień hasło</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem onClick={() => setActiveSection("export")}>
            <S.SettingIcon>💾</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Eksport danych</S.SettingLabel>
              <S.SettingDesc>Pobierz wszystkie swoje dane</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem onClick={() => setActiveSection("delete")}>
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
          <S.SettingItem
            onClick={() => window.open("mailto:pomoc@finanseapp.pl", "_blank")}
          >
            <S.SettingIcon>📧</S.SettingIcon>
            <S.SettingInfo>
              <S.SettingLabel>Kontakt</S.SettingLabel>
              <S.SettingDesc>pomoc@finanseapp.pl</S.SettingDesc>
            </S.SettingInfo>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingItem>

          <S.SettingItem
            onClick={() => {
              dispatch(
                showNotification({
                  message: "📱 Wersja aplikacji: 1.0.0",
                  type: "success",
                }),
              );
            }}
          >
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
    </S.Container>
  );
};

export default Profile;
