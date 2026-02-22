import React from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styled";

const PaymentTypeSelector = ({ onSelectType, onClose }) => {
  const { t } = useTranslation();
  const types = [
    {
      id: "installments",
      icon: "📅",
      title: t("form.typeInstallments"),
      description: t("form.typeInstallmentsDesc"),
      color: "#3182ce",
    },
    {
      id: "bills",
      icon: "🧾",
      title: t("form.typeBills"),
      description: t("form.typeBillsDesc"),
      color: "#f5576c",
    },
    {
      id: "shopping",
      icon: "🛒",
      title: t("form.typeShopping"),
      description: t("form.typeShoppingDesc"),
      color: "#38a169",
    },
    {
      id: "insurance",
      icon: "🛡️",
      title: t("form.typeInsurance"),
      description: t("form.typeInsuranceDesc"),
      color: "#3182ce",
    },
    {
      id: "other",
      icon: "📌",
      title: t("form.typeOther"),
      description: t("form.typeOtherDesc"),
      color: "#718096",
    },
  ];

  return (
    <S.Overlay onClick={onClose}>
      <S.Container onClick={(e) => e.stopPropagation()}>
        <S.Title>{t("form.selectType")}</S.Title>
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
        <S.CancelButton onClick={onClose}>{t("form.cancel")}</S.CancelButton>
      </S.Container>
    </S.Overlay>
  );
};

export default PaymentTypeSelector;
