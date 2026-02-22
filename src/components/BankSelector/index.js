import React from "react";
import { bankOptions, getBankConfig } from "../../utils/bankIcons";
import * as S from "./styled";

const BankSelector = ({ value, onChange }) => {
  const handleBankSelect = (bankValue) => {
    onChange(bankValue);
  };

  return (
    <S.SelectorContainer>
      <S.BankGrid>
        {bankOptions.map((bank) => {
          const config = getBankConfig(bank.value);
          const IconComponent = config.icon;
          const isSelected = value === bank.value;

          return (
            <S.BankTile
              key={bank.value}
              $color={config.color}
              $selected={isSelected}
              onClick={() => handleBankSelect(bank.value)}
            >
              <S.IconWrapper>
                <IconComponent size={24} style={{ width: "100%", height: "100%" }} />
              </S.IconWrapper>
              <S.BankLabel>{config.label}</S.BankLabel>
              {isSelected && <S.SelectionCheckmark>✓</S.SelectionCheckmark>}
            </S.BankTile>
          );
        })}
      </S.BankGrid>
    </S.SelectorContainer>
  );
};

export default BankSelector;
