import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { db } from "../../../api/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../features/notification/notificationSlice";
import * as S from "./styled";

const Family = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [family, setFamily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("main");
  const [familyName, setFamilyName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  const loadFamily = useCallback(async () => {
    if (!user?.uid) return;

    try {
      setLoading(true);
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (userData?.familyId) {
        const familyDoc = await getDoc(doc(db, "families", userData.familyId));
        if (familyDoc.exists()) {
          setFamily({ id: familyDoc.id, ...familyDoc.data() });
        }
      }
    } catch (error) {
      console.error("Błąd ładowania rodziny:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadFamily();
  }, [loadFamily]);

  const handleCreateFamily = async () => {
    if (!familyName.trim() || !user) return;

    try {
      const familyId = `family_${user.uid}_${Date.now()}`;
      const familyData = {
        ownerId: user.uid,
        name: familyName,
        createdAt: serverTimestamp(),
        inviteToken: generateInviteToken(),
        members: [
          {
            userId: user.uid,
            email: user.email,
            displayName: user.displayName || "Ja",
            role: "owner",
            addedAt: new Date().toISOString(),
            status: "active",
          },
        ],
      };

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          displayName: user.displayName || "",
          familyId: familyId,
        },
        { merge: true },
      );

      await setDoc(doc(db, "families", familyId), familyData);

      setFamily({ id: familyId, ...familyData });
      setActiveView("main");
      setFamilyName("");
      dispatch(
        showNotification({
          message: "✅ Rodzina utworzona pomyślnie!",
          type: "success",
        }),
      );
    } catch (error) {
      console.error("Błąd tworzenia rodziny:", error);
      dispatch(
        showNotification({
          message: `❌ Nie udało się utworzyć rodziny: ${error.message}`,
          type: "error",
        }),
      );
    }
  };

  const generateInviteToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const getInviteLink = () => {
    if (!family?.inviteToken) return "";
    const baseUrl = window.location.origin;
    return `${baseUrl}/invite/${family.inviteToken}`;
  };

  const handleCopyInviteLink = () => {
    const link = getInviteLink();
    navigator.clipboard.writeText(link);
    dispatch(
      showNotification({
        message: "📋 Link skopiowany! Wyślij go członkom rodziny.",
        type: "success",
      }),
    );
  };

  const handleInviteMember = async () => {
    if (!inviteEmail.trim() || !family) return;

    try {
      const newMember = {
        userId: null,
        email: inviteEmail,
        displayName: inviteEmail.split("@")[0],
        role: "member",
        addedAt: new Date().toISOString(),
        status: "pending",
      };

      await updateDoc(doc(db, "families", family.id), {
        members: arrayUnion(newMember),
      });

      setFamily({
        ...family,
        members: [...family.members, newMember],
      });
      setInviteEmail("");
      setActiveView("main");
      dispatch(
        showNotification({
          message: `Zaproszenie wysłane do ${inviteEmail}`,
          type: "success",
        }),
      );
    } catch (error) {
      console.error("Błąd zapraszania członka:", error);
      dispatch(
        showNotification({
          message: "Nie udało się wysłać zaproszenia",
          type: "error",
        }),
      );
    }
  };

  const handleRemoveMember = async (memberEmail) => {
    if (!family || !window.confirm(`Usunąć ${memberEmail} z rodziny?`)) return;

    try {
      const updatedMembers = family.members.filter(
        (m) => m.email !== memberEmail,
      );
      await updateDoc(doc(db, "families", family.id), {
        members: updatedMembers,
      });
      setFamily({ ...family, members: updatedMembers });
    } catch (error) {
      console.error("Błąd usuwania członka:", error);
      alert("Nie udało się usunąć członka");
    }
  };

  const handleDeleteFamily = async () => {
    const confirmed = window.confirm(
      "⚠️ CZY NA PEWNO CHCESZ USUNĄĆ RODZINĘ?\n\n" +
        "Ta operacja:\n" +
        "• Usunie rodzinę na zawsze\n" +
        "• Usunie wszystkich członków z rodziny\n" +
        "• NIE usunie żadnych danych (płatności, zakupy, pliki pozostaną)\n\n" +
        "Czy jesteś pewien?",
    );

    if (!confirmed) return;

    const doubleConfirm = window.confirm(
      "🔴 OSTATNIE OSTRZEŻENIE!\n\n" +
        "Naprawdę chcesz usunąć rodzinę?\n" +
        "Tej operacji NIE MOŻNA cofnąć!",
    );

    if (!doubleConfirm) return;

    try {
      if (!family?.id) return;

      const updatePromises = family.members
        .filter((m) => m.userId)
        .map((m) => updateDoc(doc(db, "users", m.userId), { familyId: null }));

      await Promise.all(updatePromises);

      // Usuń rodzinę
      await deleteDoc(doc(db, "families", family.id));

      dispatch(
        showNotification({
          message: "✅ Rodzina została usunięta",
          type: "success",
        }),
      );

      setFamily(null);
      setActiveView("main");
    } catch (error) {
      console.error("Error deleting family:", error);
      dispatch(
        showNotification({
          message: `❌ Nie udało się usunąć rodziny: ${error.message}`,
          type: "error",
        }),
      );
    }
  };

  if (loading) {
    return (
      <S.Container>
        <S.LoadingText>⏳ Ładowanie...</S.LoadingText>
      </S.Container>
    );
  }

  if (activeView === "create") {
    return (
      <S.Container>
        <S.Header>
          <S.BackButton onClick={() => setActiveView("main")}>
            ← Powrót
          </S.BackButton>
          <S.Title>Utwórz rodzinę</S.Title>
        </S.Header>

        <S.CreateCard>
          <S.CreateIcon>👨‍👩‍👧‍👦</S.CreateIcon>
          <S.CreateTitle>Nowa rodzina</S.CreateTitle>
          <S.CreateDesc>
            Stwórz rodzinę, aby udostępniać płatności, listy zakupów i dokumenty
          </S.CreateDesc>

          <S.Input
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            placeholder="np. Rodzina Kowalskich"
          />

          <S.CreateButton
            onClick={handleCreateFamily}
            disabled={!familyName.trim()}
          >
            ✨ Utwórz rodzinę
          </S.CreateButton>
        </S.CreateCard>
      </S.Container>
    );
  }

  if (activeView === "invite") {
    return (
      <S.Container>
        <S.Header>
          <S.BackButton onClick={() => setActiveView("main")}>
            ← Powrót
          </S.BackButton>
          <S.Title>Zaproś członka</S.Title>
        </S.Header>

        <S.InviteCard>
          <S.InviteIcon>📧</S.InviteIcon>
          <S.InviteTitle>Dodaj członka rodziny</S.InviteTitle>

          <S.Input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="adres@email.com"
          />

          <S.InviteButton
            onClick={handleInviteMember}
            disabled={!inviteEmail.trim()}
          >
            📨 Wyślij zaproszenie
          </S.InviteButton>
        </S.InviteCard>
      </S.Container>
    );
  }

  // Główny widok
  if (!family) {
    return (
      <S.Container>
        <S.EmptyState>
          <S.EmptyIcon>👨‍👩‍👧‍👦</S.EmptyIcon>
          <S.EmptyTitle>Nie należysz do rodziny</S.EmptyTitle>
          <S.EmptyText>
            Utwórz rodzinę, aby udostępniać płatności, dokumenty i listy zakupów
            z najbliższymi
          </S.EmptyText>
          <S.CreateFamilyButton onClick={() => setActiveView("create")}>
            ➕ Utwórz rodzinę
          </S.CreateFamilyButton>
        </S.EmptyState>
      </S.Container>
    );
  }

  const isOwner = family.ownerId === user?.uid;
  const activeMembers =
    family.members?.filter((m) => m.status === "active") || [];
  const pendingMembers =
    family.members?.filter((m) => m.status === "pending") || [];

  return (
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
        <S.AddMemberButton onClick={() => setActiveView("invite")}>
          ➕ Zaproś członka
        </S.AddMemberButton>
      )}

      <S.Section>
        <S.SectionTitle>Członkowie rodziny</S.SectionTitle>
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
                <S.RemoveButton
                  onClick={() => handleRemoveMember(member.email)}
                >
                  ✕
                </S.RemoveButton>
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
                  <S.RemoveButton
                    onClick={() => handleRemoveMember(member.email)}
                  >
                    ✕
                  </S.RemoveButton>
                )}
              </S.PendingCard>
            ))}
          </>
        )}
      </S.Section>

      <S.Section>
        <S.SectionTitle>Udostępnione elementy</S.SectionTitle>
        <S.SharedGrid>
          <S.SharedCard>
            <S.SharedIcon>💳</S.SharedIcon>
            <S.SharedCount>0</S.SharedCount>
            <S.SharedLabel>Płatności</S.SharedLabel>
          </S.SharedCard>
          <S.SharedCard>
            <S.SharedIcon>🛒</S.SharedIcon>
            <S.SharedCount>0</S.SharedCount>
            <S.SharedLabel>Zakupy</S.SharedLabel>
          </S.SharedCard>
          <S.SharedCard>
            <S.SharedIcon>📁</S.SharedIcon>
            <S.SharedCount>0</S.SharedCount>
            <S.SharedLabel>Pliki</S.SharedLabel>
          </S.SharedCard>
        </S.SharedGrid>
        <S.HintBox>
          💡 Zaznacz "Udostępnij rodzinie" przy dodawaniu płatności lub list
        </S.HintBox>
      </S.Section>

      {isOwner && (
        <>
          <S.LinkSection>
            <S.LinkTitle>Link zaproszeniowy</S.LinkTitle>
            <S.LinkBox onClick={handleCopyInviteLink}>
              <S.LinkIcon>🔗</S.LinkIcon>
              <S.LinkContent>
                <S.LinkLabel>Kliknij aby skopiować link</S.LinkLabel>
                <S.LinkUrl>{getInviteLink()}</S.LinkUrl>
              </S.LinkContent>
              <S.CopyIcon>📋</S.CopyIcon>
            </S.LinkBox>
          </S.LinkSection>

          <S.DangerZone>
            <S.DangerTitle>Zarządzanie rodziną</S.DangerTitle>
            <S.DeleteFamilyButton onClick={handleDeleteFamily}>
              Usuń rodzinę
            </S.DeleteFamilyButton>
          </S.DangerZone>
        </>
      )}
    </S.Container>
  );
};

export default Family;
