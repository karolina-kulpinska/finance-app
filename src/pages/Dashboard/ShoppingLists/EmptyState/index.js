import React from "react";
import * as S from "./styled";

export const EmptyState = ({ sharedOnly }) => (
  <S.Wrapper>
    <S.Icon>📝</S.Icon>
    <S.Title>
      {sharedOnly ? "Brak list udostępnionych rodzinie" : "Brak list zakupów"}
    </S.Title>
    <S.Text>
      {sharedOnly
        ? 'Zaznacz "Udostępnij rodzinie" przy tworzeniu listy'
        : "Dodaj swoją pierwszą listę zakupów, aby zorganizować zakupy"}
    </S.Text>
  </S.Wrapper>
);
