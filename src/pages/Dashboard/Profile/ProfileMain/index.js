import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsPro,
  selectRenewalDate,
} from "../../../../features/subscription/subscriptionSlice";
import TermsModal from "../../../../components/TermsModal";
import PrivacyModal from "../../../../components/PrivacyModal";
import { LANGUAGES } from "../../../../i18n";
import { setCurrency, selectCurrencyCode, CURRENCIES } from "../../../../features/currency/currencySlice";
import * as S from "./styled";

export const ProfileMain = ({
  userInitials,
  userName,
  userEmail,
  onSectionSelect,
  onContact,
  onAbout,
  isDemo = false,
}) => {
  const { t, i18n: i18nInstance } = useTranslation();
  const dispatch = useDispatch();
  const isPro = useSelector(selectIsPro);
  const currencyCode = useSelector(selectCurrencyCode);
  const renewalDate = useSelector(selectRenewalDate);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [currencyExpanded, setCurrencyExpanded] = useState(false);
  const [languageExpanded, setLanguageExpanded] = useState(false);

  const currentLang = i18nInstance.language?.split("-")[0] || "pl";
  const renewalDateDisplay = renewalDate
    ? new Date(renewalDate).toLocaleDateString(currentLang === "pl" ? "pl-PL" : "en-US", {
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
      <S.SectionTitle>💳 {t("profile.subscription")}</S.SectionTitle>
      <S.SettingsList>
        <S.SettingItem onClick={() => onSectionSelect("subscription")} disabled={isDemo}>
          <S.SettingIcon>{isPro ? "⭐" : "📦"}</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>
              {isPro ? t("profile.planPro") : t("profile.planFree")}
            </S.SettingLabel>
            <S.SettingDesc>
              {isPro && renewalDateDisplay
                ? `${t("profile.renewal")}: ${renewalDateDisplay}`
                : isPro
                  ? t("profile.activeSubscription")
                  : t("header.upgradePro")}
            </S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>
      </S.SettingsList>
    </S.SettingsSection>

    <S.SettingsSection>
      <S.SectionTitle>⚙️ {t("profile.accountSettings")}</S.SectionTitle>
      <S.SettingsList>
        <S.SettingItem onClick={() => onSectionSelect("personal")} disabled={isDemo}>
          <S.SettingIcon>👤</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>{t("profile.personalData")}</S.SettingLabel>
            <S.SettingDesc>{t("profile.editName")}</S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>

        <S.SettingItem onClick={() => onSectionSelect("security")} disabled={isDemo}>
          <S.SettingIcon>🔒</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>{t("profile.security")}</S.SettingLabel>
            <S.SettingDesc>{t("profile.changePassword")}</S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>

        <S.SettingItem onClick={() => onSectionSelect("delete")} disabled={isDemo}>
          <S.SettingIcon>🗑️</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>{t("profile.deleteAccount")}</S.SettingLabel>
            <S.SettingDesc>{t("profile.deleteAccountDesc")}</S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>
      </S.SettingsList>
    </S.SettingsSection>

    <S.SettingsSection>
      <S.SectionTitle>ℹ️ {t("profile.info")}</S.SectionTitle>
      <S.SettingsList>
        <S.SettingItem onClick={onContact}>
          <S.SettingIcon>📧</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>{t("profile.contact")}</S.SettingLabel>
            <S.SettingDesc>{t("profile.contactEmail")}</S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>

        <S.SettingItem onClick={onAbout}>
          <S.SettingIcon>ℹ️</S.SettingIcon>
          <S.SettingInfo>
            <S.SettingLabel>{t("profile.aboutApp")}</S.SettingLabel>
            <S.SettingDesc>{t("profile.version")}</S.SettingDesc>
          </S.SettingInfo>
          <S.SettingArrow>›</S.SettingArrow>
        </S.SettingItem>

        {!isDemo && (
          <>
            <S.SettingItem onClick={() => setShowTermsModal(true)}>
              <S.SettingIcon>📄</S.SettingIcon>
              <S.SettingInfo>
                <S.SettingLabel>{t("profile.terms")}</S.SettingLabel>
                <S.SettingDesc>{t("profile.termsDesc")}</S.SettingDesc>
              </S.SettingInfo>
              <S.SettingArrow>›</S.SettingArrow>
            </S.SettingItem>

            <S.SettingItem onClick={() => setShowPrivacyModal(true)}>
              <S.SettingIcon>🔒</S.SettingIcon>
              <S.SettingInfo>
                <S.SettingLabel>{t("profile.privacy")}</S.SettingLabel>
                <S.SettingDesc>{t("profile.privacyDesc")}</S.SettingDesc>
              </S.SettingInfo>
              <S.SettingArrow>›</S.SettingArrow>
            </S.SettingItem>
          </>
        )}
      </S.SettingsList>
    </S.SettingsSection>

    <S.SettingsSection>
      <S.CollapsibleHeader
        type="button"
        onClick={() => setLanguageExpanded((v) => !v)}
        aria-expanded={languageExpanded}
        aria-controls="language-list"
      >
        🌐 {t("profile.language")}
        <S.CollapsibleArrow $open={languageExpanded} aria-hidden>▼</S.CollapsibleArrow>
      </S.CollapsibleHeader>
      {languageExpanded && (
        <S.SettingsList id="language-list">
          {LANGUAGES.map((lang) => (
            <S.LanguageOption
              key={lang.code}
              $active={currentLang === lang.code}
              onClick={() => i18nInstance.changeLanguage(lang.code)}
            >
              {lang.name}
              {currentLang === lang.code && " ✓"}
            </S.LanguageOption>
          ))}
        </S.SettingsList>
      )}
    </S.SettingsSection>

    <S.SettingsSection>
      <S.CollapsibleHeader
        type="button"
        onClick={() => setCurrencyExpanded((v) => !v)}
        aria-expanded={currencyExpanded}
        aria-controls="currency-list"
      >
        💱 {t("profile.currency")}
        <S.CollapsibleArrow $open={currencyExpanded} aria-hidden>▼</S.CollapsibleArrow>
      </S.CollapsibleHeader>
      {currencyExpanded && (
        <S.SettingsList id="currency-list">
          {CURRENCIES.map((curr) => (
            <S.LanguageOption
              key={curr.code}
              $active={currencyCode === curr.code}
              onClick={() => dispatch(setCurrency(curr.code))}
            >
              {curr.symbol} {curr.name}
              {currencyCode === curr.code && " ✓"}
            </S.LanguageOption>
          ))}
        </S.SettingsList>
      )}
    </S.SettingsSection>

    <S.AppVersion>{t("profile.version")}</S.AppVersion>

    {showTermsModal && (
      <TermsModal
        required={false}
        showAcceptedDate={true}
        onAccept={() => setShowTermsModal(false)}
      />
    )}

    {showPrivacyModal && (
      <PrivacyModal onClose={() => setShowPrivacyModal(false)} />
    )}
  </>
  );
};
