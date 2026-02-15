import React from "react";
import * as S from "./styled";

export const AddListForm = ({
  newListName,
  onNameChange,
  shareWithFamily,
  onShareChange,
  onAdd,
}) => (
  <S.Form>
    <S.Input
      type="text"
      placeholder="Nazwa listy zakupów..."
      value={newListName}
      onChange={(e) => onNameChange(e.target.value)}
    />
    <S.CheckboxWrapper>
      <S.Checkbox
        type="checkbox"
        id="shareNewListMain"
        checked={shareWithFamily}
        onChange={(e) => onShareChange(e.target.checked)}
      />
      <S.CheckboxLabel htmlFor="shareNewListMain">
        👨‍👩‍👧‍👦 Udostępnij rodzinie
      </S.CheckboxLabel>
    </S.CheckboxWrapper>
    <S.SaveButton onClick={onAdd}>Dodaj listę</S.SaveButton>
  </S.Form>
);
