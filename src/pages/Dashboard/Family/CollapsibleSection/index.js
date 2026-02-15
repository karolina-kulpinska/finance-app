import React from "react";
import * as S from "./styled";

export const CollapsibleSection = ({
  title,
  open,
  onToggle,
  children,
}) => (
  <S.CollapsibleSection>
    <S.CollapsibleHeader type="button" $open={open} onClick={onToggle}>
      <S.CollapsibleTitle>{title}</S.CollapsibleTitle>
      <S.CollapsibleChevron $open={open}>▼</S.CollapsibleChevron>
    </S.CollapsibleHeader>
    <S.CollapsibleContent $open={open}>{children}</S.CollapsibleContent>
  </S.CollapsibleSection>
);
