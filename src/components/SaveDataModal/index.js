import React from "react";
import { useNavigate } from "react-router-dom";
import { toRegistration, toLogin } from "../../routes";
import * as S from "./styled";

const SaveDataModal = ({ onClose, onContinue }) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate(toRegistration());
    onClose();
  };

  const handleLogin = () => {
    navigate(toLogin());
    onClose();
  };

  return (
    <>
      <S.Overlay onClick={onClose} />
      <S.Modal>
        <S.Header>
          <S.Icon>💾</S.Icon>
          <S.Title>Zachowaj swoje dane</S.Title>
        </S.Header>
        <S.Content>
          <S.Message>
            W trybie demo możesz dodawać płatności i listy zakupów, ale dane są przechowywane tylko lokalnie w przeglądarce.
          </S.Message>
          <S.Warning>
            ⚠️ Jeśli opuścisz stronę bez rejestracji lub logowania, wszystkie dodane dane zostaną utracone!
          </S.Warning>
          <S.Info>
            Aby zachować swoje dane na stałe i mieć dostęp z dowolnego urządzenia, zaloguj się lub zarejestruj się.
          </S.Info>
        </S.Content>
        <S.Footer>
          <S.ButtonGroup>
            <S.PrimaryButton onClick={handleRegister}>
              Zarejestruj się
            </S.PrimaryButton>
            <S.SecondaryButton onClick={handleLogin}>
              Zaloguj się
            </S.SecondaryButton>
            <S.CancelButton onClick={onContinue}>
              Kontynuuj w trybie demo
            </S.CancelButton>
          </S.ButtonGroup>
        </S.Footer>
      </S.Modal>
    </>
  );
};

export default SaveDataModal;
