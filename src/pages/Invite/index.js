import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../api/firebase";
import { toLogin, toRegistration } from "../../routes";
import { collection, query, where, getDocs } from "firebase/firestore";
import * as S from "./styled";

const Invite = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [family, setFamily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFamilyByToken = useCallback(async () => {
    if (!token) {
      setError("Nieprawidłowy link zaproszenia");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const familiesRef = collection(db, "families");
      const q = query(familiesRef, where("inviteToken", "==", token));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Nie znaleziono rodziny dla tego zaproszenia");
        setLoading(false);
        return;
      }

      const familyDoc = querySnapshot.docs[0];
      setFamily({ id: familyDoc.id, ...familyDoc.data() });
      
      localStorage.setItem("pendingFamilyInvite", JSON.stringify({
        familyId: familyDoc.id,
        familyName: familyDoc.data().name,
        token: token,
      }));
      
      setLoading(false);
    } catch (err) {
      setError("Wystąpił błąd podczas ładowania zaproszenia");
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadFamilyByToken();
  }, [loadFamilyByToken]);

  const handleAccept = () => {
    navigate(toRegistration());
  };

  const handleLogin = () => {
    navigate(toLogin());
  };

  if (loading) {
    return (
      <S.Container>
        <S.LoadingCard>
          <S.LoadingIcon>⏳</S.LoadingIcon>
          <S.LoadingText>Ładowanie zaproszenia...</S.LoadingText>
        </S.LoadingCard>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <S.ErrorCard>
          <S.ErrorIcon>❌</S.ErrorIcon>
          <S.ErrorTitle>Błąd</S.ErrorTitle>
          <S.ErrorText>{error}</S.ErrorText>
          <S.BackButton onClick={() => navigate(-1)}>
            ← Wróć
          </S.BackButton>
        </S.ErrorCard>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.InviteCard>
        <S.FamilyIcon>👨‍👩‍👧‍👦</S.FamilyIcon>
        <S.Title>Zaproszenie do rodziny</S.Title>
        
        <S.FamilyName>{family?.name}</S.FamilyName>
        
        <S.Description>
          Zostałeś zaproszony do dołączenia do rodziny. 
          Po rejestracji będziesz mógł widzieć udostępnione płatności, 
          listy zakupów i dokumenty.
        </S.Description>

        <S.MembersInfo>
          <S.MembersIcon>👥</S.MembersIcon>
          <S.MembersText>
            {family?.members?.length || 0} {family?.members?.length === 1 ? "członek" : "członków"}
          </S.MembersText>
        </S.MembersInfo>

        <S.ButtonGroup>
          <S.AcceptButton onClick={handleAccept}>
            ✨ Zarejestruj się i dołącz
          </S.AcceptButton>
          <S.LoginButton onClick={handleLogin}>
            🔑 Mam już konto - Zaloguj się
          </S.LoginButton>
        </S.ButtonGroup>

        <S.FeaturesList>
          <S.FeatureItem>✅ Wspólny budżet rodzinny</S.FeatureItem>
          <S.FeatureItem>✅ Udostępnione listy zakupów</S.FeatureItem>
          <S.FeatureItem>✅ Wspólne dokumenty i rachunki</S.FeatureItem>
          <S.FeatureItem>✅ Przejrzystość wydatków</S.FeatureItem>
        </S.FeaturesList>
      </S.InviteCard>
    </S.Container>
  );
};

export default Invite;
