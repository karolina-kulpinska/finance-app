import React, { useState } from "react";
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
  onAddMember,
  onCopyInviteLink,
  getInviteLink,
  onRemoveMember,
  onDeleteFamily,
  isDemo = false,
}) => {
  const [activePanel, setActivePanel] = useState(null);

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

  if (activePanel) {
    return (
      <S.Container>
        <S.PanelHeader>
          <S.BackButton onClick={() => setActivePanel(null)}>←</S.BackButton>
          <S.PanelTitle>{PANELS[activePanel]}</S.PanelTitle>
        </S.PanelHeader>

        <S.PanelContent>
          {activePanel === "members" && (
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
          {activePanel === "payments" && <PaymentsList sharedOnly />}
          {activePanel === "shopping" && <ShoppingLists sharedOnly />}
          {activePanel === "files" && <Files sharedOnly />}
          {activePanel === "link" && (
            <S.LinkBox onClick={isDemo ? undefined : onCopyInviteLink} style={{ opacity: isDemo ? 0.6 : 1, cursor: isDemo ? "not-allowed" : "pointer" }}>
              <S.LinkContent>
                <S.LinkLabel>{isDemo ? "W trybie demo nie możesz kopiować linków" : "Kliknij, aby skopiować link"}</S.LinkLabel>
                <S.LinkUrl>{getInviteLink()}</S.LinkUrl>
              </S.LinkContent>
            </S.LinkBox>
          )}
          {activePanel === "danger" && (
            <S.DeleteFamilyButton onClick={onDeleteFamily} disabled={isDemo}>
              Usuń rodzinę
            </S.DeleteFamilyButton>
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
          <S.Card key={key} onClick={() => setActivePanel(key)}>
            <S.CardLabel>{label}</S.CardLabel>
            <S.CardChevron>›</S.CardChevron>
          </S.Card>
        ))}
      </S.CardsGrid>
    </S.Container>
  );
};
