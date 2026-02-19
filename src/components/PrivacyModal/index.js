import React from "react";
import PrivacyContent from "./PrivacyContent";
import * as S from "./styled";

const PrivacyModal = ({ onClose }) => {
  const contentRef = React.useRef(null);

  return (
    <>
      <S.Overlay onClick={onClose} />
      <S.Modal>
        <S.Header>
          <S.Title>POLITYKA PRYWATNOŚCI APLIKACJI SMART BUDGET</S.Title>
          <S.Subtitle>Ostatnia aktualizacja: 19.02.2026 r.</S.Subtitle>
        </S.Header>

        <S.Content ref={contentRef}>
          <PrivacyContent />
        </S.Content>

        <S.Footer>
          <S.ButtonGroup>
            <S.CloseButton onClick={onClose}>
              Zamknij
            </S.CloseButton>
          </S.ButtonGroup>
        </S.Footer>
      </S.Modal>
    </>
  );
};

export default PrivacyModal;
