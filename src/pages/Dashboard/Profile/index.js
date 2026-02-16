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
import {
  getCreateCheckoutSession,
  getCreateCustomerPortalSession,
} from "../../../api/firebase";
import {
  selectIsPro,
  fetchSubscriptionRequest,
} from "../../../features/subscription/subscriptionSlice";
import { generatePaymentsPDF } from "./generatePaymentsPDF";
import { ProfileMain } from "./ProfileMain";
import { SectionLayout } from "./SectionLayout";
import { PersonalForm } from "./PersonalForm";
import { SecurityForm } from "./SecurityForm";
import { ExportSection } from "./ExportSection";
import { DeleteSection } from "./DeleteSection";
import { SubscriptionSection } from "./SubscriptionSection";
import * as S from "./styled";

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const isPro = useSelector(selectIsPro);

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

  const handleExportPaymentsPDF = () => {
    if (!payments || payments.length === 0) {
      dispatch(
        showNotification({
          message: "Brak płatności do eksportu",
          type: "error",
        })
      );
      return;
    }
    try {
      generatePaymentsPDF(payments);
      dispatch(
        showNotification({
          message: "✅ Historia płatności została wyeksportowana do PDF!",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: "❌ Błąd eksportu PDF",
          type: "error",
        })
      );
    }
  };

  const handleUpdateName = async () => {
    if (!editName.trim()) {
      dispatch(
        showNotification({
          message: "Imię nie może być puste",
          type: "error",
        })
      );
      return;
    }
    try {
      await updateProfile(auth.currentUser, { displayName: editName });
      dispatch(
        showNotification({
          message: "✅ Imię zostało zaktualizowane!",
          type: "success",
        })
      );
      setActiveSection(null);
    } catch (error) {
      dispatch(
        showNotification({
          message: "❌ Błąd aktualizacji: " + error.message,
          type: "error",
        })
      );
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      dispatch(
        showNotification({
          message: "❌ Nowe hasła nie są identyczne",
          type: "error",
        })
      );
      return;
    }
    if (newPassword.length < 6) {
      dispatch(
        showNotification({
          message: "❌ Hasło musi mieć minimum 6 znaków",
          type: "error",
        })
      );
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        oldPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      dispatch(
        showNotification({
          message: "✅ Hasło zostało zmienione!",
          type: "success",
        })
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
        })
      );
    }
  };

  const handleExportData = async () => {
    try {
      const dataToExport = {
        user: { email: user.email, displayName: user.displayName },
        exportDate: new Date().toISOString(),
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
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: "❌ Błąd eksportu danych",
          type: "error",
        })
      );
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "⚠️ CZY NA PEWNO CHCESZ USUNĄĆ KONTO?\n\nTa operacja jest NIEODWRACALNA!\nStracisz wszystkie swoje dane, płatności i listy zakupów."
    );
    if (!confirmed) return;

    const doubleConfirm = window.confirm(
      "🚨 OSTATNIE OSTRZEŻENIE!\n\nCzy jesteś absolutnie pewien?\nWszystkie dane zostaną TRWALE USUNIĘTE."
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
          })
        );
      } else {
        dispatch(
          showNotification({
            message: "❌ Błąd usuwania konta: " + error.message,
            type: "error",
          })
        );
      }
    }
  };

  const handleManageSubscription = async () => {
    try {
      if (isPro) {
        // Otwórz Customer Portal dla użytkowników Pro
        const base =
          window.location.origin +
          window.location.pathname +
          (window.location.hash || "");
        const returnUrl = base + "#/dashboard/profile";
        
        const createPortalSession = getCreateCustomerPortalSession();
        const { data } = await createPortalSession({
          returnUrl,
        });
        
        if (data?.url) {
          window.location.assign(data.url);
        } else {
          dispatch(
            showNotification({
              message: "❌ Nie udało się otworzyć panelu zarządzania subskrypcją",
              type: "error",
            })
          );
        }
      } else {
        // Otwórz Checkout Session dla użytkowników Free
        const base =
          window.location.origin +
          window.location.pathname +
          (window.location.hash || "");
        const sep = base.includes("?") ? "&" : "?";
        const successUrl = base + sep + "payment=success";
        const cancelUrl = base + sep + "payment=cancel";
        
        const createCheckout = getCreateCheckoutSession();
        const { data } = await createCheckout({
          successUrl,
          cancelUrl,
        });
        
        if (data?.url) {
          window.location.assign(data.url);
        } else {
          dispatch(
            showNotification({
              message: "❌ Nie udało się otworzyć strony płatności",
              type: "error",
            })
          );
        }
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: "❌ Błąd: " + (error.message || String(error)),
          type: "error",
        })
      );
    }
  };

  if (activeSection === "personal") {
    return (
      <S.Container>
        <SectionLayout
          title="Dane osobowe"
          onBack={() => setActiveSection(null)}
        >
          <PersonalForm
            editName={editName}
            onEditNameChange={setEditName}
            userEmail={userEmail}
            onSave={handleUpdateName}
          />
        </SectionLayout>
      </S.Container>
    );
  }

  if (activeSection === "security") {
    return (
      <S.Container>
        <SectionLayout title="Zmiana hasła" onBack={() => setActiveSection(null)}>
          <SecurityForm
            oldPassword={oldPassword}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            onOldPasswordChange={setOldPassword}
            onNewPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onChangePassword={handleChangePassword}
          />
        </SectionLayout>
      </S.Container>
    );
  }

  if (activeSection === "export") {
    return (
      <S.Container>
        <SectionLayout
          title="Eksport danych"
          onBack={() => setActiveSection(null)}
        >
          <ExportSection
            onExportData={handleExportData}
            onExportPDF={handleExportPaymentsPDF}
          />
        </SectionLayout>
      </S.Container>
    );
  }

  if (activeSection === "delete") {
    return (
      <S.Container>
        <SectionLayout title="Usuń konto" onBack={() => setActiveSection(null)}>
          <DeleteSection onDelete={handleDeleteAccount} />
        </SectionLayout>
      </S.Container>
    );
  }

  if (activeSection === "subscription") {
    return (
      <S.Container>
        <SectionLayout
          title="Subskrypcja"
          onBack={() => setActiveSection(null)}
        >
          <SubscriptionSection onManageSubscription={handleManageSubscription} />
        </SectionLayout>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <ProfileMain
        userInitials={userInitials}
        userName={userName}
        userEmail={userEmail}
        onSectionSelect={setActiveSection}
        onContact={() => window.open("mailto:pomoc@finanseapp.pl", "_blank")}
        onAbout={() =>
          dispatch(
            showNotification({
              message: "📱 Wersja aplikacji: 1.0.0",
              type: "success",
            })
          )
        }
      />
    </S.Container>
  );
};

export default Profile;
