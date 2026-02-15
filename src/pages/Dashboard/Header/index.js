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
  getSetCurrentUserPro,
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
  const [proGranting, setProGranting] = useState(false);
  const [showProFallbackLink, setShowProFallbackLink] = useState(false);
  const [cameFromPaymentSuccess, setCameFromPaymentSuccess] = useState(
    () =>
      typeof window !== "undefined" &&
      window.location.search.includes("payment=success"),
  );

  useEffect(() => {
    if (typeof window === "undefined" || !user?.uid) return;
    if (!window.location.search.includes("payment=success")) return;
    window.history.replaceState(
      {},
      "",
      window.location.pathname + (window.location.hash || ""),
    );
    setCameFromPaymentSuccess(true);
    setShowProFallbackLink(false);
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

  useEffect(() => {
    if (isPro) {
      setShowProFallbackLink(false);
      setCameFromPaymentSuccess(false);
    }
  }, [isPro]);

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
    const successUrl = base + sep + "payment=success";
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
            <S.Title>Smart Budget</S.Title>
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
