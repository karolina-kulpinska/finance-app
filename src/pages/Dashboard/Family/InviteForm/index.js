import React from "react";
import * as S from "./styled";

export const InviteForm = ({
  inviteEmail,
  setInviteEmail,
  onInviteMember,
  onBack,
}) => (
  <S.Container>
    <S.Header>
      <S.BackButton
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onBack) onBack();
        }}
      >
        ←
      </S.BackButton>
      <S.Title>Zaproś członka</S.Title>
    </S.Header>

    <S.InviteCard>
      <S.InviteTitle>Zaproś członka</S.InviteTitle>
      <S.InviteHint>
        Wpisz e-mail, aby dodać go do listy zaproszeń.
      </S.InviteHint>

      <S.Input
        type="email"
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
        placeholder="adres@email.com"
      />

      <S.InviteButton
        onClick={onInviteMember}
        disabled={!inviteEmail.trim()}
      >
        Dodaj e-mail
      </S.InviteButton>
    </S.InviteCard>
  </S.Container>
);
