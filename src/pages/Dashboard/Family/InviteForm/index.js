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
      <S.BackButton onClick={onBack}>← Powrót</S.BackButton>
      <S.Title>Zaproś członka</S.Title>
    </S.Header>

    <S.InviteCard>
      <S.InviteIcon>📧</S.InviteIcon>
      <S.InviteTitle>Dodaj członka rodziny</S.InviteTitle>
      <S.InviteHint>
        Wpisz e-mail – zaproszenie zostanie wysłane na ten adres (z linkiem do dołączenia). Osoba pojawi się też na liście „Oczekujące zaproszenia”.
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
        📨 Wyślij zaproszenie e-mailem
      </S.InviteButton>
    </S.InviteCard>
  </S.Container>
);
