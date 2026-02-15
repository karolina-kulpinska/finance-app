import React from "react";
import { AddItemForm } from "../AddItemForm";
import { ItemsSection } from "../ItemsSection";
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
        <S.BackButton onClick={onBack}>←</S.BackButton>
        <S.Title>{list.name}</S.Title>
      </S.Header>

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

      <S.TotalCard>
        <S.TotalLabel>Suma:</S.TotalLabel>
        <S.TotalAmount>{list.totalPrice.toFixed(2)} zł</S.TotalAmount>
      </S.TotalCard>

      {list.receipt && (
        <S.ReceiptInfo>
          <S.ReceiptName>📎 {list.receipt.name}</S.ReceiptName>
          <S.ReceiptRemove onClick={handleReceiptRemove}>✕</S.ReceiptRemove>
        </S.ReceiptInfo>
      )}

      <S.BottomButtons>
        <S.BottomButton $variant="danger" onClick={() => onDeleteList(list.id)}>
          🗑️ Usuń listę
        </S.BottomButton>
        <S.BottomButton
          $variant="family"
          $active={list.sharedWithFamily === true}
          onClick={() => handleShareChange(!list.sharedWithFamily)}
        >
          👨‍👩‍👧‍👦 {list.sharedWithFamily ? "Usuń z rodziny" : "Dodaj do rodziny"}
        </S.BottomButton>
        <>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onReceiptUpload(list.id, file);
              e.target.value = "";
            }}
            id={`receipt-upload-${list.id}`}
            style={{ display: "none" }}
          />
          <S.BottomButton
            as="label"
            htmlFor={`receipt-upload-${list.id}`}
            $variant="receipt"
          >
            📎 Dodaj paragon
          </S.BottomButton>
        </>
      </S.BottomButtons>
    </S.Container>
  );
};
