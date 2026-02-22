import React, { useState, useEffect, useCallback, useMemo } from "react";
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

const Family = ({ isDemo = false, activeView: activeViewProp, activePanel: activePanelProp, onNavigate, onBack }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [family, setFamily] = useState(null);
  const [loading, setLoading] = useState(!isDemo);
  const [localView, setLocalView] = useState("main");
  const [localPanel, setLocalPanel] = useState(null);
  const useHistory = Boolean(onNavigate && onBack);
  const activeView = useHistory ? (activeViewProp || "main") : localView;
  const activePanel = useHistory ? (activePanelProp ?? null) : localPanel;
  const setActiveView = useHistory ? (v) => onNavigate({ familyView: v }) : setLocalView;
  const setActivePanel = useHistory ? (p) => (p ? onNavigate({ familyPanel: p }) : onBack()) : setLocalPanel;
  const handleBack = useHistory ? onBack : () => { setLocalPanel(null); setLocalView("main"); };
  const [familyName, setFamilyName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  // Przykładowa rodzina dla demo (useMemo żeby referencja była stabilna dla useCallback)
  const demoFamily = useMemo(
    () => ({
      id: "demo_family",
      name: "Rodzina Kowalskich",
      ownerId: "demo_user",
      inviteToken: "demo_token_12345",
      members: [
        {
          userId: "demo_user",
          email: "demo@example.com",
          displayName: "Demo Użytkownik",
          role: "owner",
          addedAt: new Date().toISOString(),
          status: "active",
        },
        {
          userId: "demo_member_1",
          email: "anna.kowalska@example.com",
          displayName: "Anna Kowalska",
          role: "member",
          addedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: "active",
        },
        {
          userId: "demo_member_2",
          email: "jan.kowalski@example.com",
          displayName: "Jan Kowalski",
          role: "member",
          addedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          status: "active",
        },
      ],
    }),
    []
  );

  const loadFamily = useCallback(async () => {
    if (isDemo) {
      setFamily(demoFamily);
      setLoading(false);
      return;
    }
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
    } finally {
      setLoading(false);
    }
  }, [user?.uid, isDemo, demoFamily]);

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
    if (isDemo) return;
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
      if (useHistory) onNavigate({ familyView: "main" }); else setLocalView("main");
      setFamilyName("");
      dispatch(showNotification({ message: "✅ Rodzina utworzona pomyślnie!", type: "success" }));
    } catch (error) {
      dispatch(showNotification({ message: `❌ Nie udało się utworzyć rodziny: ${error.message}`, type: "error" }));
    }
  };

  const handleCopyInviteLink = () => {
    if (isDemo) {
      dispatch(showNotification({ message: "W trybie demo nie możesz kopiować linków zaproszeniowych.", type: "info" }));
      return;
    }
    navigator.clipboard.writeText(getInviteLink());
    dispatch(showNotification({ message: "📋 Link skopiowany! Wyślij go członkom rodziny.", type: "success" }));
  };

  const handleInviteMember = async () => {
    if (isDemo) return;
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
      if (useHistory) onNavigate({ familyView: "main" }); else setLocalView("main");
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
    if (isDemo) {
      dispatch(showNotification({ message: "W trybie demo nie możesz usuwać członków rodziny.", type: "info" }));
      return;
    }
    if (!family || !window.confirm(`Usunąć ${memberEmail} z rodziny?`)) return;
    try {
      const updatedMembers = family.members.filter((m) => m.email !== memberEmail);
      await updateDoc(doc(db, "families", family.id), { members: updatedMembers });
      setFamily({ ...family, members: updatedMembers });
    } catch (error) {
      alert("Nie udało się usunąć członka");
    }
  };

  const handleRenameFamily = async (newName) => {
    if (isDemo) {
      dispatch(showNotification({ message: "W trybie demo nie możesz zmieniać nazwy rodziny.", type: "info" }));
      return;
    }
    if (!family?.id || !newName?.trim()) return;
    try {
      await updateDoc(doc(db, "families", family.id), { name: newName.trim() });
      setFamily({ ...family, name: newName.trim() });
      dispatch(showNotification({ message: "✅ Nazwa rodziny została zmieniona!", type: "success" }));
    } catch (error) {
      dispatch(showNotification({ message: `❌ Nie udało się zmienić nazwy: ${error.message}`, type: "error" }));
    }
  };

  const handleDeleteFamily = async () => {
    if (isDemo) {
      dispatch(showNotification({ message: "W trybie demo nie możesz usuwać rodziny.", type: "info" }));
      return;
    }
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
      if (useHistory && onNavigate) onNavigate({ familyView: "main" }); else setLocalView("main");
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
    if (isDemo) {
      if (useHistory && onNavigate) onNavigate({ familyView: "main" }); else setLocalView("main");
      return null;
    }
    return (
      <CreateForm
        familyName={familyName}
        setFamilyName={setFamilyName}
        onCreateFamily={handleCreateFamily}
        onBack={handleBack}
      />
    );
  }

  if (activeView === "invite") {
    if (isDemo) {
      if (useHistory && onNavigate) onNavigate({ familyView: "main" }); else setLocalView("main");
      return null;
    }
    return (
      <InviteForm
        inviteEmail={inviteEmail}
        setInviteEmail={setInviteEmail}
        onInviteMember={handleInviteMember}
        onBack={handleBack}
      />
    );
  }

  if (!family) {
    return (
      <EmptyState
        onCreateFamily={isDemo ? undefined : () => (useHistory ? onNavigate({ familyView: "create" }) : setLocalView("create"))}
        isDemo={isDemo}
      />
    );
  }

  const isOwner = isDemo ? true : family.ownerId === user?.uid;
  const activeMembers = family.members?.filter((m) => m.status === "active") || [];
  const pendingMembers = family.members?.filter((m) => m.status === "pending") || [];

  return (
    <MainView
      family={family}
      activeMembers={activeMembers}
      pendingMembers={pendingMembers}
      isOwner={isOwner}
      activePanel={activePanel}
      onOpenPanel={setActivePanel}
      onBack={handleBack}
      onAddMember={isDemo ? undefined : () => (useHistory ? onNavigate({ familyView: "invite" }) : setLocalView("invite"))}
      onCopyInviteLink={handleCopyInviteLink}
      getInviteLink={getInviteLink}
      onRemoveMember={handleRemoveMember}
      onRenameFamily={isDemo ? undefined : handleRenameFamily}
      onDeleteFamily={handleDeleteFamily}
      isDemo={isDemo}
    />
  );
};

export default Family;
