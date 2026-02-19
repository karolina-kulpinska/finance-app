import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";
import { db, getSendFamilyInviteEmail } from "../../../api/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { showNotification } from "../../../features/notification/notificationSlice";
import { toInvite } from "../../../routes";
import { EmptyState } from "./EmptyState";
import { CreateForm } from "./CreateForm";
import { InviteForm } from "./InviteForm";
import { MainView } from "./MainView";
import * as S from "./styled";

const generateInviteToken = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

const Family = ({ isDemo = false }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [family, setFamily] = useState(null);
  const [loading, setLoading] = useState(!isDemo);
  const [activeView, setActiveView] = useState("main");
  const [familyName, setFamilyName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  const loadFamily = useCallback(async () => {
    if (isDemo || !user?.uid) return;
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
    } finally {
      setLoading(false);
    }
  }, [user?.uid, isDemo]);

  useEffect(() => {
    if (isDemo) {
      setLoading(false);
      return;
    }
    loadFamily();
  }, [loadFamily, isDemo]);

  const getInviteLink = () => {
    if (!family?.inviteToken) return "";
    const baseUrl = (process.env.REACT_APP_SITE_URL || window.location.origin).replace(/\/$/, "");
    return `${baseUrl}#${toInvite(family.inviteToken)}`;
  };

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
        { email: user.email, displayName: user.displayName || "", familyId },
        { merge: true }
      );
      await setDoc(doc(db, "families", familyId), familyData);
      setFamily({ id: familyId, ...familyData });
      setActiveView("main");
      setFamilyName("");
      dispatch(showNotification({ message: "✅ Rodzina utworzona pomyślnie!", type: "success" }));
    } catch (error) {
      dispatch(showNotification({ message: `❌ Nie udało się utworzyć rodziny: ${error.message}`, type: "error" }));
    }
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(getInviteLink());
    dispatch(showNotification({ message: "📋 Link skopiowany! Wyślij go członkom rodziny.", type: "success" }));
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
      setFamily({ ...family, members: [...family.members, newMember] });
      setInviteEmail("");
      setActiveView("main");
      try {
        const sendEmail = getSendFamilyInviteEmail();
        await sendEmail({ email: inviteEmail.trim(), inviteLink: getInviteLink(), familyName: family.name || "" });
        dispatch(showNotification({ message: `Zaproszenie wysłane na adres ${inviteEmail}. Sprawdź skrzynkę (oraz spam).`, type: "success" }));
      } catch (emailError) {
        dispatch(showNotification({ message: `${inviteEmail} dodany do listy, ale e-mail nie został wysłany. Skopiuj link zaproszeniowy i wyślij ręcznie.`, type: "warning" }));
      }
    } catch (error) {
      dispatch(showNotification({ message: "Nie udało się dodać zaproszenia", type: "error" }));
    }
  };

  const handleRemoveMember = async (memberEmail) => {
    if (!family || !window.confirm(`Usunąć ${memberEmail} z rodziny?`)) return;
    try {
      const updatedMembers = family.members.filter((m) => m.email !== memberEmail);
      await updateDoc(doc(db, "families", family.id), { members: updatedMembers });
      setFamily({ ...family, members: updatedMembers });
    } catch (error) {
      alert("Nie udało się usunąć członka");
    }
  };

  const handleDeleteFamily = async () => {
    if (!window.confirm("⚠️ CZY NA PEWNO CHCESZ USUNĄĆ RODZINĘ?\n\nTa operacja usunie rodzinę na zawsze. Czy jesteś pewien?")) return;
    if (!window.confirm("🔴 OSTATNIE OSTRZEŻENIE! Naprawdę chcesz usunąć rodzinę?")) return;
    try {
      if (!family?.id) return;
      const updatePromises = family.members
        .filter((m) => m.userId)
        .map((m) => updateDoc(doc(db, "users", m.userId), { familyId: null }));
      await Promise.all(updatePromises);
      await deleteDoc(doc(db, "families", family.id));
      dispatch(showNotification({ message: "✅ Rodzina została usunięta", type: "success" }));
      setFamily(null);
      setActiveView("main");
    } catch (error) {
      dispatch(showNotification({ message: `❌ Nie udało się usunąć rodziny: ${error.message}`, type: "error" }));
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
      <CreateForm
        familyName={familyName}
        setFamilyName={setFamilyName}
        onCreateFamily={handleCreateFamily}
        onBack={() => setActiveView("main")}
      />
    );
  }

  if (activeView === "invite") {
    return (
      <InviteForm
        inviteEmail={inviteEmail}
        setInviteEmail={setInviteEmail}
        onInviteMember={handleInviteMember}
        onBack={() => setActiveView("main")}
      />
    );
  }

  if (!family) {
    return (
      <EmptyState
        onCreateFamily={isDemo ? undefined : () => setActiveView("create")}
        isDemo={isDemo}
      />
    );
  }

  const isOwner = family.ownerId === user?.uid;
  const activeMembers = family.members?.filter((m) => m.status === "active") || [];
  const pendingMembers = family.members?.filter((m) => m.status === "pending") || [];

  return (
    <MainView
      family={family}
      activeMembers={activeMembers}
      pendingMembers={pendingMembers}
      isOwner={isOwner}
      onAddMember={() => setActiveView("invite")}
      onCopyInviteLink={handleCopyInviteLink}
      getInviteLink={getInviteLink}
      onRemoveMember={handleRemoveMember}
      onDeleteFamily={handleDeleteFamily}
    />
  );
};

export default Family;
