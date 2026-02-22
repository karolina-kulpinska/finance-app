import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import {
  selectIsPro,
  fetchSubscriptionRequest,
} from "../../../features/subscription/subscriptionSlice";
import {
  getCreateCheckoutSession,
  getVerifyAndSetProFromStripe,
} from "../../../api/firebase";
import * as S from "./styled";

const Header = ({
  onAddPayment,
  onToggleFilters,
  showFilters,
  hideFilters,
  hideAddPayment,
  onOpenUpgrade,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isPro = useSelector(selectIsPro);
  const [showUpgradeTip, setShowUpgradeTip] = useState(false);
  const [upgradeError, setUpgradeError] = useState("");

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
    const base =
      window.location.origin +
      window.location.pathname +
      (window.location.hash || "");
    const sep = base.includes("?") ? "&" : "?";
    const successUrl =
      base + sep + "payment=success&session_id={CHECKOUT_SESSION_ID}";
    const cancelUrl = base + sep + "payment=cancel";
    try {
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
    } catch (e) {
      setUpgradeError(e?.message || String(e));
      setShowUpgradeTip(true);
    }
  };

  const proOrUpgrade = isPro ? (
    <S.ProBadge>Pro</S.ProBadge>
  ) : (
    <S.UpgradeButton onClick={handleUpgradeClick} aria-label="Ulepsz do Pro">
      Ulepsz do Pro
    </S.UpgradeButton>
  );

  return (
    <S.Header>
      <S.HeaderRow>
        <S.TitleSection>
          <S.TitleRow>
            <S.Brand>
              <S.Logo src={`${process.env.PUBLIC_URL || ""}/smartbudget-logo.png`} alt="Mój Smart Budget" />
              <S.Title>Mój Smart Budget</S.Title>
            </S.Brand>
            <S.ProCorner>{proOrUpgrade}</S.ProCorner>
          </S.TitleRow>
          <S.Subtitle>
            Witaj, {user?.displayName ? user.displayName : "Użytkowniku"}!
          </S.Subtitle>
        </S.TitleSection>
        <S.Actions>
          <S.ProDesktop>{proOrUpgrade}</S.ProDesktop>
          {!hideAddPayment && (
            <S.AddButton onClick={onAddPayment}>+ Dodaj płatność</S.AddButton>
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
