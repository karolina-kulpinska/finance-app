import React from "react";
import * as S from "./styled";

const PaymentTypeSelector = ({ onSelectType, onClose }) => {
  const types = [
    {
      id: "installments",
      icon: "📅",
      title: "Raty",
      description: "Płatności cykliczne co miesiąc",
      color: "#3182ce",
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
      color: "#38a169",
    },
    {
      id: "insurance",
      icon: "🛡️",
      title: "Ubezpieczenie",
      description: "Opłaty cykliczne co miesiąc",
      color: "#3182ce",
    },
    {
      id: "other",
      icon: "📌",
      title: "Inne",
      description: "Pozostałe płatności",
      color: "#718096",
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
