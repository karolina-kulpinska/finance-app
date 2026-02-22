import React from "react";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../EmptyState";
import { AddListForm } from "../AddListForm";
import { ListCard } from "../ListCard";
import * as S from "./styled";

export const ListView = ({
  showAddForm,
  canAddList = true,
  onToggleAddForm,
  onLimitReached,
  newListName,
  onNewListNameChange,
  shareWithFamily,
  onShareWithFamilyChange,
  canShareWithFamily = true,
  onAddList,
  displayLists,
  sharedOnly,
  listsEmpty,
  onSelectList,
}) => {
  const { t } = useTranslation();
  return (
  <S.Container>
    <S.Header>
      <S.Title>🛒 {t("shopping.title")}</S.Title>
      {canAddList ? (
        <S.AddButton onClick={onToggleAddForm}>
          {showAddForm ? `✕ ${t("common.cancel")}` : t("shopping.newList")}
        </S.AddButton>
      ) : (
        <S.AddButtonDisabled
          onClick={onLimitReached}
          title={t("shopping.listsLimitReached")}
        >
          {t("shopping.newList")}
        </S.AddButtonDisabled>
      )}
    </S.Header>

    {showAddForm && canAddList && (
      <AddListForm
        newListName={newListName}
        onNameChange={onNewListNameChange}
        shareWithFamily={shareWithFamily}
        onShareChange={onShareWithFamilyChange}
        canShareWithFamily={canShareWithFamily}
        onAdd={onAddList}
      />
    )}

    {listsEmpty ? (
      <EmptyState sharedOnly={sharedOnly} />
    ) : (
      <S.ListsGrid>
        {displayLists.map((list) => (
          <ListCard
            key={list.id}
            list={list}
            onClick={() => onSelectList(list)}
          />
        ))}
      </S.ListsGrid>
    )}
  </S.Container>
  );
};
