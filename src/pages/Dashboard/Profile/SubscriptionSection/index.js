import React from "react";
import { useSelector } from "react-redux";
import {
  selectIsPro,
  selectRenewalDate,
  selectSubscriptionStatus,
  selectSubscription,
} from "../../../../features/subscription/subscriptionSlice";
import * as S from "./styled";

export const SubscriptionSection = ({ onManageSubscription }) => {
  const isPro = useSelector(selectIsPro);
  const renewalDate = useSelector(selectRenewalDate);
  const subscriptionStatus = useSelector(selectSubscriptionStatus);
  const subscription = useSelector(selectSubscription);

  const renewalDateDisplay = renewalDate
    ? new Date(renewalDate).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const statusDisplay =
    subscriptionStatus === "active"
      ? "Aktywna"
      : subscriptionStatus === "canceled"
        ? "Anulowana"
        : subscriptionStatus === "past_due"
          ? "Opóźniona"
          : subscriptionStatus
            ? subscriptionStatus
            : null;

  return (
    <S.Container>
      <S.StatusCard $isPro={isPro}>
        <S.StatusIcon>{isPro ? "⭐" : "📦"}</S.StatusIcon>
        <S.StatusInfo>
          <S.StatusTitle $isPro={isPro}>
            {isPro ? "Plan Pro" : "Plan Bezpłatny"}
          </S.StatusTitle>
          <S.StatusDesc $isPro={isPro}>
            {isPro
              ? "Masz dostęp do wszystkich funkcji Premium"
              : "Ulepsz do Pro, aby odblokować wszystkie funkcje"}
          </S.StatusDesc>
        </S.StatusInfo>
      </S.StatusCard>

      {isPro && (
        <>
          <S.InfoSection>
            <S.InfoTitle>📅 Informacje o subskrypcji</S.InfoTitle>
            <S.InfoGrid>
              {renewalDateDisplay && (
                <S.InfoRow>
                  <S.InfoLabel>Data odnowienia:</S.InfoLabel>
                  <S.InfoValue>{renewalDateDisplay}</S.InfoValue>
                </S.InfoRow>
              )}
              {statusDisplay && (
                <S.InfoRow>
                  <S.InfoLabel>Status:</S.InfoLabel>
                  <S.InfoValue $status={subscriptionStatus}>
                    {statusDisplay}
                  </S.InfoValue>
                </S.InfoRow>
              )}
              {subscription?.id && (
                <S.InfoRow>
                  <S.InfoLabel>ID subskrypcji:</S.InfoLabel>
                  <S.InfoValue $small>{subscription.id}</S.InfoValue>
                </S.InfoRow>
              )}
            </S.InfoGrid>
          </S.InfoSection>

          <S.ActionsSection>
            <S.ActionButton onClick={onManageSubscription}>
              ⚙️ Zarządzaj subskrypcją
            </S.ActionButton>
            <S.ActionHint>
              Możesz anulować subskrypcję, zmienić metodę płatności lub
              zobaczyć historię faktur w Stripe Customer Portal.
            </S.ActionHint>
          </S.ActionsSection>
        </>
      )}

      {!isPro && (
        <S.UpgradeSection>
          <S.UpgradeTitle>🚀 Ulepsz do Planu Pro</S.UpgradeTitle>
          <S.UpgradeFeatures>
            <S.FeatureItem>✅ Nieograniczone załączniki</S.FeatureItem>
            <S.FeatureItem>✅ Zaawansowane statystyki</S.FeatureItem>
            <S.FeatureItem>✅ Eksport danych</S.FeatureItem>
            <S.FeatureItem>✅ Brak reklam</S.FeatureItem>
            <S.FeatureItem>✅ Priorytetowe wsparcie</S.FeatureItem>
          </S.UpgradeFeatures>
          <S.UpgradeButton onClick={onManageSubscription}>
            💳 Ulepsz teraz
          </S.UpgradeButton>
        </S.UpgradeSection>
      )}
    </S.Container>
  );
};
