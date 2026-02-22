import React from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styled";

export const EmptyState = ({ sharedOnly }) => {
  const { t } = useTranslation();
  return (
  <S.Wrapper>
    <S.Icon>📝</S.Icon>
    <S.Title>
      {sharedOnly ? t("shopping.noListsShared") : t("shopping.noLists")}
    </S.Title>
    <S.Text>
      {sharedOnly ? t("shopping.shareHint") : t("shopping.noListsHint")}
    </S.Text>
  </S.Wrapper>
  );
};
