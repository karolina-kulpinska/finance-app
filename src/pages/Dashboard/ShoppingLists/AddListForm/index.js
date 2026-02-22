import React from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styled";

export const AddListForm = ({
  newListName,
  onNameChange,
  shareWithFamily,
  onShareChange,
  canShareWithFamily = true,
  onAdd,
}) => {
  const { t } = useTranslation();
  return (
  <S.Form>
    <S.Input
      type="text"
      placeholder={t("shopping.listNamePlaceholder")}
      value={newListName}
      onChange={(e) => onNameChange(e.target.value)}
    />
    <S.CheckboxWrapper>
      <S.Checkbox
        type="checkbox"
        id="shareNewListMain"
        checked={shareWithFamily}
        disabled={!canShareWithFamily}
        onChange={(e) => canShareWithFamily && onShareChange(e.target.checked)}
      />
      <S.CheckboxLabel htmlFor="shareNewListMain">
        👨‍👩‍👧‍👦 {t("shopping.shareWithFamily")}
      </S.CheckboxLabel>
    </S.CheckboxWrapper>
    <S.SaveButton onClick={onAdd}>{t("shopping.addList")}</S.SaveButton>
  </S.Form>
  );
};
