import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PaymentsList from "../../List";
import ShoppingLists from "../../ShoppingLists";
import Files from "../../Files";
import { MembersSection } from "../MembersSection";
import { FamilyPaymentsFilters } from "../FamilyPaymentsFilters";
import * as S from "./styled";

const PANEL_KEYS = {
  members: "family.members",
  payments: "family.payments",
  shopping: "family.shoppingLists",
  files: "family.files",
  danger: "family.management",
};

export const MainView = ({
  family,
  activeMembers,
  pendingMembers,
  isOwner,
  activePanel,
  onOpenPanel,
  onBack,
  onAddMember,
  onCopyInviteLink,
  getInviteLink,
  onRemoveMember,
  onRenameFamily,
  onDeleteFamily,
  isDemo = false,
}) => {
  const { t } = useTranslation();
  const [localPanel, setLocalPanel] = useState(null);
  const panel = onOpenPanel ? (activePanel ?? null) : localPanel;
  const setPanel = onOpenPanel ? onOpenPanel : setLocalPanel;
  const handleBack = onBack || (() => setLocalPanel(null));
  const [editName, setEditName] = useState(family?.name || "");
  const [familyDatePreset, setFamilyDatePreset] = useState("monthOrOverdue");
  const [familyMinDate, setFamilyMinDate] = useState("");
  const [familyMaxDate, setFamilyMaxDate] = useState("");
  const [familySearchName, setFamilySearchName] = useState("");

  useEffect(() => {
    setEditName(family?.name || "");
  }, [family?.name]);

  const cards = [
    { key: "members", labelKey: "family.members" },
    { key: "payments", labelKey: "family.payments" },
    { key: "shopping", labelKey: "family.shoppingLists" },
    { key: "files", labelKey: "family.files" },
    ...(isOwner ? [{ key: "danger", labelKey: "family.management" }] : []),
  ];

  if (panel) {
    return (
      <S.Container>
        <S.PanelHeader>
          <S.BackButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onOpenPanel) handleBack();
              else setPanel(null);
            }}
          >
            ← {t("common.back")}
          </S.BackButton>
          <S.PanelTitle>{t(PANEL_KEYS[panel])}</S.PanelTitle>
        </S.PanelHeader>

        <S.PanelContent>
          {panel === "members" && (
            <>
              {isOwner && onAddMember && (
                <S.AddMemberButton onClick={onAddMember} disabled={isDemo}>
                  {t("family.inviteMember")}
                </S.AddMemberButton>
              )}
              <MembersSection
                activeMembers={activeMembers}
                pendingMembers={pendingMembers}
                isOwner={isOwner}
                onRemoveMember={onRemoveMember}
                isDemo={isDemo}
              />
              {isOwner && (
                <S.LinkSection>
                  <S.LinkSectionTitle>{t("family.inviteLinkToFamily")}</S.LinkSectionTitle>
                  <S.LinkBox onClick={isDemo ? undefined : onCopyInviteLink} style={{ opacity: isDemo ? 0.6 : 1, cursor: isDemo ? "not-allowed" : "pointer" }}>
                    <S.LinkContent>
                      <S.LinkLabel>{isDemo ? t("family.demoCannotCopy") : t("family.copyLinkHint")}</S.LinkLabel>
                      <S.LinkUrl>{getInviteLink()}</S.LinkUrl>
                    </S.LinkContent>
                  </S.LinkBox>
                </S.LinkSection>
              )}
            </>
          )}
          {panel === "payments" && (
            <>
              <FamilyPaymentsFilters
                preset={familyDatePreset}
                minDate={familyMinDate}
                maxDate={familyMaxDate}
                searchName={familySearchName}
                onPresetChange={setFamilyDatePreset}
                onMinDateChange={setFamilyMinDate}
                onMaxDateChange={setFamilyMaxDate}
                onSearchChange={setFamilySearchName}
              />
              <PaymentsList
                sharedOnly
                isDemo={isDemo}
                dateFilterOverride={familyDatePreset === "custom" ? "all" : familyDatePreset}
                minDate={familyDatePreset === "custom" ? familyMinDate || undefined : undefined}
                maxDate={familyDatePreset === "custom" ? familyMaxDate || undefined : undefined}
                searchName={familySearchName}
              />
            </>
          )}
          {panel === "shopping" && <ShoppingLists sharedOnly />}
          {panel === "files" && <Files sharedOnly />}
          {panel === "danger" && (
            <>
              {onRenameFamily && (
                <S.RenameForm>
                  <S.RenameLabel>{t("family.changeName")}</S.RenameLabel>
                  <S.RenameInput
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder={t("family.familyPlaceholder")}
                  />
                  <S.RenameButton
                    onClick={() => onRenameFamily(editName)}
                    disabled={!editName.trim() || editName.trim() === family?.name}
                  >
                    {t("family.saveName")}
                  </S.RenameButton>
                </S.RenameForm>
              )}
              <S.DeleteFamilyButton onClick={onDeleteFamily} disabled={isDemo}>
                {t("family.deleteFamily")}
              </S.DeleteFamilyButton>
            </>
          )}
        </S.PanelContent>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.FamilyHeader>
        <S.HeaderContent>
          <S.FamilyTitle>{family.name}</S.FamilyTitle>
          <S.FamilySubtitle>
            {activeMembers.length} {activeMembers.length === 1 ? t("family.member") : t("family.membersCount")}
          </S.FamilySubtitle>
        </S.HeaderContent>
      </S.FamilyHeader>

      <S.CardsGrid>
        {cards.map(({ key, labelKey }) => (
          <S.Card key={key} onClick={() => setPanel(key)}>
            <S.CardLabel>{t(labelKey)}</S.CardLabel>
            <S.CardChevron>›</S.CardChevron>
          </S.Card>
        ))}
      </S.CardsGrid>
    </S.Container>
  );
};
