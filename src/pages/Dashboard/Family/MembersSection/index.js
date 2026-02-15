import React from "react";
import * as S from "./styled";

export const MembersSection = ({ activeMembers, pendingMembers, isOwner, onRemoveMember }) => (
  <>
    <S.MembersList>
      {activeMembers.map((member) => (
        <S.MemberCard key={member.email}>
          <S.MemberAvatar $isOwner={member.role === "owner"}>
            {member.displayName?.charAt(0).toUpperCase() || "?"}
          </S.MemberAvatar>
          <S.MemberInfo>
            <S.MemberName>{member.displayName}</S.MemberName>
            <S.MemberEmail>{member.email}</S.MemberEmail>
          </S.MemberInfo>
          {member.role === "owner" && <S.OwnerBadge>👑</S.OwnerBadge>}
          {isOwner && member.role !== "owner" && (
            <S.RemoveButton onClick={() => onRemoveMember(member.email)}>✕</S.RemoveButton>
          )}
        </S.MemberCard>
      ))}
    </S.MembersList>
    {pendingMembers.length > 0 && (
      <>
        <S.PendingDivider>Oczekujące zaproszenia</S.PendingDivider>
        {pendingMembers.map((member) => (
          <S.PendingCard key={member.email}>
            <S.PendingIcon>📧</S.PendingIcon>
            <S.PendingEmail>{member.email}</S.PendingEmail>
            {isOwner && (
              <S.RemoveButton onClick={() => onRemoveMember(member.email)}>✕</S.RemoveButton>
            )}
          </S.PendingCard>
        ))}
      </>
    )}
  </>
);
