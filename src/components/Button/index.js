import React from "react";
import * as S from "./styled";

const Button = ({ children, onClick, disabled, secondary }) => {
  return (
    <S.StyledButton
      onClick={onClick}
      disabled={disabled}
      $secondary={secondary}
    >
      {children}
    </S.StyledButton>
  );
};

export default Button;
