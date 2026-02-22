import React, { useState, useEffect } from "react";
import PaymentsList from "../../List";
import ShoppingLists from "../../ShoppingLists";
import Files from "../../Files";
import { MembersSection } from "../MembersSection";
import * as S from "./styled";

const PANELS = {
  members: "Członkowie",
  payments: "Płatności",
  shopping: "Listy zakupów",
  files: "Pliki",
  link: "Link zaproszeniowy",
  danger: "Zarządzanie",
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
  const [localPanel, setLocalPanel] = useState(null);
  const panel = onOpenPanel ? (activePanel ?? null) : localPanel;
  const setPanel = onOpenPanel ? onOpenPanel : setLocalPanel;
  const handleBack = onBack || (() => setLocalPanel(null));
  const [editName, setEditName] = useState(family?.name || "");

  useEffect(() => {
    setEditName(family?.name || "");
  }, [family?.name]);

  const cards = [
    { key: "members", label: "Członkowie" },
    { key: "payments", label: "Płatności" },
    { key: "shopping", label: "Listy zakupów" },
    { key: "files", label: "Pliki" },
    ...(isOwner ? [
      { key: "link", label: "Link zaproszeniowy" },
      { key: "danger", label: "Zarządzanie" },
    ] : []),
  ];

  if (panel) {
    return (
      <S.Container>
        <S.PanelHeader>
          <S.BackButton onClick={() => (onOpenPanel ? handleBack() : setPanel(null))}>←</S.BackButton>
          <S.PanelTitle>{PANELS[panel]}</S.PanelTitle>
        </S.PanelHeader>

        <S.PanelContent>
          {panel === "members" && (
            <>
              {isOwner && onAddMember && (
                <S.AddMemberButton onClick={onAddMember} disabled={isDemo}>
                  Zaproś członka
                </S.AddMemberButton>
              )}
              <MembersSection
                activeMembers={activeMembers}
                pendingMembers={pendingMembers}
                isOwner={isOwner}
                onRemoveMember={onRemoveMember}
                isDemo={isDemo}
              />
            </>
          )}
          {panel === "payments" && <PaymentsList sharedOnly />}
          {panel === "shopping" && <ShoppingLists sharedOnly />}
          {panel === "files" && <Files sharedOnly />}
          {panel === "link" && (
            <S.LinkBox onClick={isDemo ? undefined : onCopyInviteLink} style={{ opacity: isDemo ? 0.6 : 1, cursor: isDemo ? "not-allowed" : "pointer" }}>
              <S.LinkContent>
                <S.LinkLabel>{isDemo ? "W trybie demo nie możesz kopiować linków" : "Kliknij, aby skopiować link"}</S.LinkLabel>
                <S.LinkUrl>{getInviteLink()}</S.LinkUrl>
              </S.LinkContent>
            </S.LinkBox>
          )}
          {panel === "danger" && (
            <>
              {onRenameFamily && (
                <S.RenameForm>
                  <S.RenameLabel>Zmień nazwę rodziny</S.RenameLabel>
                  <S.RenameInput
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="np. Rodzina Kowalskich"
                  />
                  <S.RenameButton
                    onClick={() => onRenameFamily(editName)}
                    disabled={!editName.trim() || editName.trim() === family?.name}
                  >
                    Zapisz nazwę
                  </S.RenameButton>
                </S.RenameForm>
              )}
              <S.DeleteFamilyButton onClick={onDeleteFamily} disabled={isDemo}>
                Usuń rodzinę
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
            {activeMembers.length} {activeMembers.length === 1 ? "członek" : "członków"}
          </S.FamilySubtitle>
        </S.HeaderContent>
      </S.FamilyHeader>

      <S.CardsGrid>
        {cards.map(({ key, label }) => (
          <S.Card key={key} onClick={() => setPanel(key)}>
            <S.CardLabel>{label}</S.CardLabel>
            <S.CardChevron>›</S.CardChevron>
          </S.Card>
        ))}
      </S.CardsGrid>
    </S.Container>
  );
};
