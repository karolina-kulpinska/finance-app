import React from "react";
import { EmptyState } from "../EmptyState";
import { AddListForm } from "../AddListForm";
import { ListCard } from "../ListCard";
import * as S from "./styled";

export const ListView = ({
  showAddForm,
  onToggleAddForm,
  newListName,
  onNewListNameChange,
  shareWithFamily,
  onShareWithFamilyChange,
  onAddList,
  displayLists,
  sharedOnly,
  listsEmpty,
  onSelectList,
}) => (
  <S.Container>
    <S.Header>
      <S.Title>🛒 Listy zakupów</S.Title>
      <S.AddButton onClick={onToggleAddForm}>
        {showAddForm ? "✕ Anuluj" : "+ Nowa lista"}
      </S.AddButton>
    </S.Header>

    {showAddForm && (
      <AddListForm
        newListName={newListName}
        onNameChange={onNewListNameChange}
        shareWithFamily={shareWithFamily}
        onShareChange={onShareWithFamilyChange}
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
