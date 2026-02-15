import React from "react";
import PaymentsList from "../../List";
import ShoppingLists from "../../ShoppingLists";
import Files from "../../Files";
import { CollapsibleSection } from "../CollapsibleSection";
import { MembersSection } from "../MembersSection";
import { SECTION_KEYS } from "../constants";
import * as S from "./styled";

export const MainView = ({
  family,
  activeMembers,
  pendingMembers,
  isOwner,
  sectionOpen,
  toggleSection,
  onAddMember,
  onCopyInviteLink,
  getInviteLink,
  onRemoveMember,
  onDeleteFamily,
}) => (
  <S.Container>
    <S.FamilyHeader>
      <S.HeaderIcon>👨‍👩‍👧‍👦</S.HeaderIcon>
      <S.FamilyTitle>{family.name}</S.FamilyTitle>
      <S.FamilySubtitle>
        {activeMembers.length}{" "}
        {activeMembers.length === 1 ? "członek" : "członków"}
      </S.FamilySubtitle>
    </S.FamilyHeader>

    {isOwner && (
      <S.AddMemberButton onClick={onAddMember}>➕ Zaproś członka</S.AddMemberButton>
    )}

    <CollapsibleSection
      title="👥 Członkowie rodziny"
      open={sectionOpen.members}
      onToggle={() => toggleSection(SECTION_KEYS.members)}
    >
      <MembersSection
        activeMembers={activeMembers}
        pendingMembers={pendingMembers}
        isOwner={isOwner}
        onRemoveMember={onRemoveMember}
      />
    </CollapsibleSection>

    <CollapsibleSection
      title="💳 Płatności udostępnione rodzinie"
      open={sectionOpen.payments}
      onToggle={() => toggleSection(SECTION_KEYS.payments)}
    >
      <PaymentsList sharedOnly />
    </CollapsibleSection>

    <CollapsibleSection
      title="🛒 Listy zakupów udostępnione rodzinie"
      open={sectionOpen.shopping}
      onToggle={() => toggleSection(SECTION_KEYS.shopping)}
    >
      <ShoppingLists sharedOnly />
    </CollapsibleSection>

    <CollapsibleSection
      title="📁 Pliki udostępnione rodzinie"
      open={sectionOpen.files}
      onToggle={() => toggleSection(SECTION_KEYS.files)}
    >
      <Files sharedOnly />
    </CollapsibleSection>

    {isOwner && (
      <>
        <CollapsibleSection
          title="🔗 Link zaproszeniowy"
          open={sectionOpen.link}
          onToggle={() => toggleSection(SECTION_KEYS.link)}
        >
          <S.LinkBox onClick={onCopyInviteLink}>
            <S.LinkIcon>🔗</S.LinkIcon>
            <S.LinkContent>
              <S.LinkLabel>Kliknij aby skopiować link</S.LinkLabel>
              <S.LinkUrl>{getInviteLink()}</S.LinkUrl>
            </S.LinkContent>
            <S.CopyIcon>📋</S.CopyIcon>
          </S.LinkBox>
        </CollapsibleSection>

        <CollapsibleSection
          title="⚠️ Zarządzanie rodziną"
          open={sectionOpen.danger}
          onToggle={() => toggleSection(SECTION_KEYS.danger)}
        >
          <S.DeleteFamilyButton onClick={onDeleteFamily}>Usuń rodzinę</S.DeleteFamilyButton>
        </CollapsibleSection>
      </>
    )}
  </S.Container>
);
