import React from "react";
import { AddItemForm } from "../AddItemForm";
import { ItemsSection } from "../ItemsSection";
import { ReceiptSection } from "../ReceiptSection";
import * as S from "./styled";

export const ListDetailView = ({
  list,
  lists,
  setLists,
  newItemName,
  newItemPrice,
  setNewItemName,
  setNewItemPrice,
  onBack,
  onAddItem,
  onTogglePurchased,
  onDeleteItem,
  onReceiptUpload,
  onDeleteList,
}) => {
  const handleShareChange = (checked) => {
    setLists(
      lists.map((l) =>
        l.id === list.id ? { ...l, sharedWithFamily: checked } : l
      )
    );
  };

  const handleReceiptRemove = () => {
    setLists(
      lists.map((l) => (l.id === list.id ? { ...l, receipt: null } : l))
    );
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={onBack}>← Powrót</S.BackButton>
        <S.Title>{list.name}</S.Title>
        <S.DeleteButton onClick={() => onDeleteList(list.id)}>🗑️</S.DeleteButton>
      </S.Header>

      <S.GroupToggle>
        <S.Checkbox
          type="checkbox"
          id="shareListFamily"
          checked={list.sharedWithFamily === true}
          onChange={(e) => handleShareChange(e.target.checked)}
        />
        <S.CheckboxLabel htmlFor="shareListFamily">
          👨‍👩‍👧‍👦 Udostępnij rodzinie
        </S.CheckboxLabel>
      </S.GroupToggle>

      <S.TotalCard>
        <S.TotalLabel>Suma:</S.TotalLabel>
        <S.TotalAmount>{list.totalPrice.toFixed(2)} zł</S.TotalAmount>
      </S.TotalCard>

      <AddItemForm
        newItemName={newItemName}
        newItemPrice={newItemPrice}
        onNameChange={setNewItemName}
        onPriceChange={setNewItemPrice}
        onSubmit={() => onAddItem(list.id)}
      />

      {list.items.length > 0 && (
        <ItemsSection
          items={list.items}
          listId={list.id}
          onToggle={onTogglePurchased}
          onDelete={onDeleteItem}
        />
      )}

      <ReceiptSection
        receipt={list.receipt}
        listId={list.id}
        onUpload={onReceiptUpload}
        onRemove={handleReceiptRemove}
      />
    </S.Container>
  );
};
