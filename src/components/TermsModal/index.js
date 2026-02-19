import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../api/firebase";
import { selectUser } from "../../features/auth/authSlice";
import { showNotification } from "../../features/notification/notificationSlice";
import RegulaminContent from "./RegulaminContent";
import * as S from "./styled";

const TermsModal = ({ onAccept, required = false, showAcceptedDate = false }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [accepted, setAccepted] = useState(false);
  const [acceptedDate, setAcceptedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const contentRef = useRef(null);

  const loadAcceptedDate = useCallback(async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.termsAcceptedAt) {
          const date = data.termsAcceptedAt.toDate();
          setAcceptedDate(date);
        }
      }
    } catch (error) {
      console.error("Błąd podczas ładowania daty akceptacji:", error);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (showAcceptedDate && user?.uid) {
      loadAcceptedDate();
    }
  }, [showAcceptedDate, user?.uid, loadAcceptedDate]);

  useEffect(() => {
    if (!required) return; // Tylko dla wymaganego akceptacji

    const contentElement = contentRef.current;
    if (!contentElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = contentElement;
      // Sprawdzamy czy użytkownik jest blisko końca (z marginesem 50px)
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setScrolledToBottom(isAtBottom);
    };

    contentElement.addEventListener("scroll", handleScroll);
    // Sprawdź też przy załadowaniu (jeśli treść jest krótka i mieści się na ekranie)
    handleScroll();

    return () => {
      contentElement.removeEventListener("scroll", handleScroll);
    };
  }, [required]);

  const handleAccept = async () => {
    if (!accepted && required) {
      dispatch(
        showNotification({
          message: "Musisz zaakceptować regulamin, aby kontynuować.",
          type: "error",
        })
      );
      return;
    }

    setLoading(true);
    try {
      if (user?.uid) {
        await setDoc(
          doc(db, "users", user.uid),
          {
            termsAcceptedAt: serverTimestamp(),
            termsAccepted: true,
          },
          { merge: true }
        );
      }
      if (onAccept) {
        onAccept();
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: "Nie udało się zapisać akceptacji regulaminu.",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <S.Overlay />
      <S.Modal>
        <S.Header>
          <S.Title>REGULAMIN SERWISU I APLIKACJI SMART BUDGET</S.Title>
          <S.Subtitle>Ostatnia aktualizacja: 19.02.2026 r.</S.Subtitle>
          {showAcceptedDate && acceptedDate && (
            <S.AcceptedDate>
              Regulamin został zaakceptowany: <strong>{formatDate(acceptedDate)}</strong>
            </S.AcceptedDate>
          )}
        </S.Header>

        <S.Content ref={contentRef}>
          <RegulaminContent />
        </S.Content>

        <S.Footer>
          {required && (
            <>
              {!scrolledToBottom && (
                <>
                  <S.ScrollHint>
                    📜 Przewiń regulamin do końca, aby móc go zaakceptować
                  </S.ScrollHint>
                  <S.ScrollButton onClick={scrollToBottom}>
                    ⬇️ Przewiń do końca
                  </S.ScrollButton>
                </>
              )}
              <S.CheckboxWrapper $disabled={!scrolledToBottom}>
                <S.Checkbox
                  type="checkbox"
                  id="accept-terms"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  disabled={!scrolledToBottom}
                />
                <S.CheckboxLabel htmlFor="accept-terms" $disabled={!scrolledToBottom}>
                  Oświadczam, że zapoznałem się z Regulaminem aplikacji Smart Budget i akceptuję wszystkie jego postanowienia, w szczególności te dotyczące wyłączenia odpowiedzialności Administratora za terminowość moich płatności.
                </S.CheckboxLabel>
              </S.CheckboxWrapper>
            </>
          )}
          <S.ButtonGroup>
            {required ? (
              <S.AcceptButton
                onClick={handleAccept}
                disabled={!accepted || loading}
              >
                {loading ? "Zapisywanie..." : "Akceptuję i kontynuuję"}
              </S.AcceptButton>
            ) : (
              <S.CloseButton onClick={onAccept}>
                Zamknij
              </S.CloseButton>
            )}
          </S.ButtonGroup>
        </S.Footer>
      </S.Modal>
    </>
  );
};

export default TermsModal;
