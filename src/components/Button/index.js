import React from "react";
import * as S from "./styled";

const Button = ({
  children,
  onClick,
  disabled,
  secondary,
  type = "button",
}) => {
  return (
    <S.StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      $secondary={secondary}
    >
      {children}
    </S.StyledButton>
  );
};

export default Button;
