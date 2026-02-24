import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Capacitor } from "@capacitor/core";
import { selectUser } from "../../../features/auth/authSlice";
import {
  selectIsPro,
  fetchSubscriptionRequest,
} from "../../../features/subscription/subscriptionSlice";
import {
  getCreateCheckoutSession,
  getVerifyAndSetProFromStripe,
} from "../../../api/firebase";
import paymentAdapter from "../../../api/paymentAdapter";
import { LANGUAGES } from "../../../i18n";
import * as S from "./styled";

const Header = ({
  onAddPayment,
  onToggleFilters,
  showFilters,
  hideFilters,
  hideAddPayment,
  onOpenUpgrade,
  onBack,
  showBack,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isPro = useSelector(selectIsPro);
  const [showUpgradeTip, setShowUpgradeTip] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [upgradeError, setUpgradeError] = useState("");
  const langDropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setShowLangDropdown(false);
      }
    };
    if (showLangDropdown) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showLangDropdown]);

  const handleBackClick = useCallback(
    (e) => {
      e.stopPropagation();
      setShowLangDropdown(false);
      if (onBack) onBack();
    },
    [onBack]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !user?.uid) return;
    const search = window.location.search || "";
    const hash = window.location.hash || "";
    const hasPaymentSuccess = search.includes("payment=success") || hash.includes("payment=success");
    if (!hasPaymentSuccess) return;
    const cleanHash = hash.split("?")[0] || "#/dashboard";
    window.history.replaceState({}, "", window.location.pathname + cleanHash);
    const uid = user.uid;
    let attempts = 0;
    let maxAttempts = 15;
    let interval = null;
    const refetch = () => {
      dispatch(fetchSubscriptionRequest({ uid }));
    };
    const verify = () => {
      getVerifyAndSetProFromStripe()()
        .then(() => refetch())
        .catch(() => refetch());
    };
    verify();
    interval = window.setInterval(() => {
      if (attempts >= maxAttempts || isPro) {
        clearInterval(interval);
        return;
      }
      attempts++;
      verify();
    }, 2000);
    const timeout = window.setTimeout(() => {
      clearInterval(interval);
    }, 30000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [user?.uid, dispatch, isPro]);

  const handleUpgradeClick = async () => {
    if (onOpenUpgrade) {
      onOpenUpgrade();
      return;
    }

    // Sprawdź platformę
    const isNative = Capacitor.isNativePlatform();

    try {
      if (isNative) {
        // 📱 Mobilna: Google Play Billing
        const result = await paymentAdapter.purchaseSubscription(user.uid);
        if (result.platform === "google_play") {
          // Odśwież stan subskrypcji
          dispatch(fetchSubscriptionRequest({ uid: user.uid }));
        }
      } else {
        // 🌐 Web: Stripe
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
          return;
        }
        setUpgradeError(
          "Brak linku do płatności. Sprawdź docs/STRIPE_SETUP.md.",
        );
        setShowUpgradeTip(true);
      }
    } catch (e) {
      setUpgradeError(e?.message || String(e));
      setShowUpgradeTip(true);
    }
  };

  const proOrUpgrade = isPro ? (
    <S.ProBadge>Pro</S.ProBadge>
  ) : (
    <S.UpgradeButton onClick={handleUpgradeClick} aria-label={t("header.upgradePro")}>
      {t("header.upgradePro")}
    </S.UpgradeButton>
  );

  return (
    <S.Header>
      <S.HeaderRow>
        <S.TitleSection>
          <S.TitleRow>
            <S.Brand>
              <S.Logo src={`${process.env.PUBLIC_URL || ""}/smartbudget-logo.png`} alt={t("appName")} />
              <S.Title>{t("appName")}</S.Title>
            </S.Brand>
            <S.HeaderRight>
              <S.LangFlagWrap ref={langDropdownRef}>
                <S.LangFlagButton
                  type="button"
                  onClick={() => setShowLangDropdown((v) => !v)}
                  aria-label={t("profile.language")}
                  title={t("profile.language")}
                >
                  {i18n.language?.startsWith("en") ? "🇬🇧" : "🇵🇱"}
                </S.LangFlagButton>
                {showLangDropdown && (
                  <S.LangDropdown>
                    {LANGUAGES.map((lang) => (
                      <S.LangOption
                        key={lang.code}
                        $active={i18n.language?.startsWith(lang.code)}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setShowLangDropdown(false);
                        }}
                        title={lang.name}
                        aria-label={lang.name}
                      >
                        {lang.code === "pl" ? "🇵🇱" : "🇬🇧"}
                      </S.LangOption>
                    ))}
                  </S.LangDropdown>
                )}
              </S.LangFlagWrap>
              <S.ProCorner>{proOrUpgrade}</S.ProCorner>
            </S.HeaderRight>
          </S.TitleRow>
          <S.Subtitle>
            {t("header.welcome", { name: user?.displayName || t("header.user") })}
          </S.Subtitle>
        </S.TitleSection>
        <S.Actions>
          {showBack && onBack && (
            <S.FilterToggleButton onClick={handleBackClick} type="button">
              ← {t("common.back")}
            </S.FilterToggleButton>
          )}
          <S.ProDesktop>{proOrUpgrade}</S.ProDesktop>
          {!hideAddPayment && (
            <S.AddButton onClick={onAddPayment}>{t("header.addPayment")}</S.AddButton>
          )}
          {!hideFilters && (
            <S.FilterToggleButton onClick={onToggleFilters}>
              {showFilters ? "▲" : "▼"}
            </S.FilterToggleButton>
          )}
        </S.Actions>
      </S.HeaderRow>
      {showUpgradeTip && !onOpenUpgrade && (
        <S.UpgradeTip
          onClick={() => {
            setShowUpgradeTip(false);
            setUpgradeError("");
          }}
        >
          Plan Pro: wszystkie funkcje, załączniki, zero reklam.
          {upgradeError && ` Błąd: ${upgradeError}`} (Kliknij, aby zamknąć)
        </S.UpgradeTip>
      )}
    </S.Header>
  );
};

export default Header;
