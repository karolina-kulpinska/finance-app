import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Capacitor } from "@capacitor/core";
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
  getSetCurrentUserPro,
  getVerifyAndSetProFromStripe,
} from "../../../api/firebase";
import paymentAdapter from "../../../api/paymentAdapter";
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
import { NotificationsSection } from "./NotificationsSection";
import * as S from "./styled";

const Profile = ({ activeSection: activeSectionProp, onNavigate, onBack, isDemo = false }) => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const isPro = useSelector(selectIsPro);

  const [localSection, setLocalSection] = useState(null);
  const useHistory = Boolean(onNavigate && onBack);
  const activeSection = useHistory ? (activeSectionProp ?? null) : localSection;
  const setActiveSection = useHistory ? (s) => (s ? onNavigate({ profileSection: s }) : onBack()) : setLocalSection;
  const handleBack = useHistory ? onBack : () => setLocalSection(null);
  const [editName, setEditName] = useState(user?.displayName || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userEmail = user?.email || t("profile.noEmail");
  const userName = user?.displayName || t("profile.userDefault");
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
          message: t("profile.noPaymentsExport"),
          type: "error",
        })
      );
      return;
    }
    try {
      generatePaymentsPDF(payments);
      dispatch(
        showNotification({
          message: "✅ " + t("profile.exportSuccess"),
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
          message: t("profile.nameRequired"),
          type: "error",
        })
      );
      return;
    }
    try {
      await updateProfile(auth.currentUser, { displayName: editName });
      dispatch(
        showNotification({
          message: "✅ " + t("profile.nameUpdated"),
          type: "success",
        })
      );
      setActiveSection(null);
    } catch (error) {
      dispatch(
        showNotification({
          message: "❌ " + t("profile.updateError") + ": " + error.message,
          type: "error",
        })
      );
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      dispatch(
        showNotification({
          message: "❌ " + t("profile.passwordsMismatch"),
          type: "error",
        })
      );
      return;
    }
    if (newPassword.length < 6) {
      dispatch(
        showNotification({
          message: "❌ " + t("profile.passwordMinLength"),
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
          message: "✅ " + t("profile.passwordChanged"),
          type: "success",
        })
      );
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setActiveSection(null);
    } catch (error) {
      let errorMessage = "❌ " + t("profile.changePasswordError");
      if (error.code === "auth/wrong-password") {
        errorMessage = "❌ " + t("profile.wrongPassword");
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
          message: "✅ " + t("profile.dataExported"),
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          message: "❌ " + t("profile.dataExportError"),
          type: "error",
        })
      );
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("⚠️ " + t("profile.deleteConfirm"));
    if (!confirmed) return;

    const doubleConfirm = window.confirm("🚨 " + t("profile.deleteConfirmFinal"));
    if (!doubleConfirm) return;

    try {
      await deleteUser(auth.currentUser);
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        dispatch(
          showNotification({
            message: "❌ " + t("profile.mustReLogin"),
            type: "error",
          })
        );
      } else {
dispatch(
        showNotification({
          message: "❌ " + t("profile.deleteAccountError") + ": " + error.message,
          type: "error",
        })
      );
      }
    }
  };

  const handleManageSubscription = async () => {
    const isNative = Capacitor.isNativePlatform();

    try {
      if (isNative) {
        // 📱 Mobilna: Google Play Billing
        if (isPro) {
          dispatch(
            showNotification({
              message: "ℹ️ Zarządzaj subskrypcją w ustawieniach Google Play",
              type: "info",
            })
          );
        } else {
          const result = await paymentAdapter.purchaseSubscription(user.uid);
          if (result.platform === "google_play") {
            dispatch(fetchSubscriptionRequest({ uid: user.uid }));
          }
        }
      } else {
        // 🌐 Web: Stripe
        if (isPro) {
          // Otwórz Customer Portal dla użytkowników Pro
          const returnUrl =
            window.location.origin + window.location.pathname + "#/dashboard/profile";
          
          const createPortalSession = getCreateCustomerPortalSession();
          const { data } = await createPortalSession({
            returnUrl,
          });
          
          if (data?.url) {
            window.location.assign(data.url);
          } else {
            dispatch(
              showNotification({
                message: "❌ " + t("profile.subscriptionPortalError"),
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
          const successUrl =
            base + sep + "payment=success&session_id={CHECKOUT_SESSION_ID}";
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

  const handleGrantProForOwner = async () => {
    try {
      const setPro = getSetCurrentUserPro();
      const { data } = await setPro();
      if (data?.ok) {
        dispatch(
          showNotification({
            message: "✅ Plan Pro został przyznany!",
            type: "success",
          })
        );
        dispatch(fetchSubscriptionRequest({ uid: user?.uid }));
      } else {
        dispatch(
          showNotification({
            message: data?.message || "Nie udało się przyznać Pro.",
            type: "error",
          })
        );
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

  const adminEmailsRaw = process.env.REACT_APP_ADMIN_EMAILS || process.env.REACT_APP_ADMIN_EMAIL || "";
  const adminEmails = adminEmailsRaw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const isAdmin = adminEmails.length > 0 && user?.email && adminEmails.includes(user.email.toLowerCase());

  const handleSyncAfterPayment = async () => {
    try {
      const verify = getVerifyAndSetProFromStripe();
      const { data } = await verify();
      dispatch(
        showNotification({
          message: data?.planSet ? "✅ Plan Pro został aktywowany!" : "Nie znaleziono płatności. Spróbuj odświeżyć stronę.",
          type: data?.planSet ? "success" : "info",
        })
      );
      if (data?.planSet) dispatch(fetchSubscriptionRequest({ uid: user?.uid }));
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
          onBack={handleBack}
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
        <SectionLayout title="Zmiana hasła" onBack={handleBack}>
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
          onBack={handleBack}
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
        <SectionLayout title="Usuń konto" onBack={handleBack}>
          <DeleteSection onDelete={handleDeleteAccount} />
        </SectionLayout>
      </S.Container>
    );
  }

  if (activeSection === "notifications") {
    return (
      <S.Container>
        <SectionLayout
          title={t("profile.notifications")}
          onBack={handleBack}
        >
          <NotificationsSection isDemo={isDemo} />
        </SectionLayout>
      </S.Container>
    );
  }

  if (activeSection === "subscription") {
    return (
      <S.Container>
        <SectionLayout
          title="Subskrypcja"
          onBack={handleBack}
        >
          <SubscriptionSection
            onManageSubscription={handleManageSubscription}
            onGrantProForOwner={isAdmin ? handleGrantProForOwner : null}
            onSyncAfterPayment={handleSyncAfterPayment}
          />
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
        isDemo={isDemo}
        onSectionSelect={(s) => (useHistory ? onNavigate({ profileSection: s }) : setLocalSection(s))}
        onContact={() => window.open("mailto:biuroobslugi.kontakt@gmail.com", "_blank")}
        onAbout={() =>
          dispatch(
            showNotification({
              message: "📱 " + t("profile.version"),
              type: "success",
            })
          )
        }
      />
    </S.Container>
  );
};

export default Profile;
