import React from "react";
import * as S from "./styled";

const PaymentTypeSelector = ({ onSelectType, onClose }) => {
  const types = [
    {
      id: "installments",
      icon: "📅",
      title: "Raty",
      description: "Płatności cykliczne co miesiąc",
      color: "#667eea",
    },
    {
      id: "bills",
      icon: "🧾",
      title: "Rachunki",
      description: "Prąd, gaz, czynsz, internet",
      color: "#f5576c",
    },
    {
      id: "shopping",
      icon: "🛒",
      title: "Zakupy",
      description: "Zakupy spożywcze i inne",
      color: "#43e97b",
    },
    {
      id: "insurance",
      icon: "🛡️",
      title: "Ubezpieczenie",
      description: "Opłaty cykliczne co miesiąc",
      color: "#4facfe",
    },
    {
      id: "other",
      icon: "📌",
      title: "Inne",
      description: "Pozostałe płatności",
      color: "#f093fb",
    },
  ];

  return (
    <S.Overlay onClick={onClose}>
      <S.Container onClick={(e) => e.stopPropagation()}>
        <S.Title>Wybierz typ płatności</S.Title>
        <S.TypeGrid>
          {types.map((type) => (
            <S.TypeCard
              key={type.id}
              $color={type.color}
              onClick={() => onSelectType(type.id)}
            >
              <S.TypeIcon>{type.icon}</S.TypeIcon>
              <S.TypeTitle>{type.title}</S.TypeTitle>
              <S.TypeDesc>{type.description}</S.TypeDesc>
            </S.TypeCard>
          ))}
        </S.TypeGrid>
        <S.CancelButton onClick={onClose}>Anuluj</S.CancelButton>
      </S.Container>
    </S.Overlay>
  );
};

export default PaymentTypeSelector;
