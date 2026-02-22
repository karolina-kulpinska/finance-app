import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AddItemForm } from "../AddItemForm";
import { ItemsSection } from "../ItemsSection";
import { selectCurrency, formatAmount } from "../../../../features/currency/currencySlice";
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
  receiptUploading,
  onDownloadReceipt,
  onDeleteList,
}) => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);
  const receiptInputRef = useRef(null);

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
        <S.TotalLabel>{t("shopping.total")}</S.TotalLabel>
        <S.TotalAmount>{formatAmount(list.totalPrice, currency)}</S.TotalAmount>
      </S.TotalCard>

      {list.receipt && (
        <S.ReceiptInfo>
          <S.ReceiptName>📎 {list.receipt.name}</S.ReceiptName>
          <S.ReceiptActions>
            {list.receipt.url && (
              <S.ReceiptDownload
                type="button"
                onClick={() => onDownloadReceipt(list.receipt.url, list.receipt.name)}
                title={t("shopping.downloadFile")}
              >
                ⬇️ {t("files.download")}
              </S.ReceiptDownload>
            )}
            <S.ReceiptRemove onClick={handleReceiptRemove}>✕</S.ReceiptRemove>
          </S.ReceiptActions>
        </S.ReceiptInfo>
      )}

      <S.BottomButtons>
        <S.BottomButton $variant="danger" onClick={() => onDeleteList(list.id)}>
          🗑️ {t("shopping.removeList")}
        </S.BottomButton>
        <S.BottomButton
          $variant="family"
          $active={list.sharedWithFamily === true}
          onClick={() => handleShareChange(!list.sharedWithFamily)}
        >
          👨‍👩‍👧‍👦 {list.sharedWithFamily ? t("shopping.removeFromFamily") : t("shopping.addToFamily")}
        </S.BottomButton>
        <>
          <input
            ref={receiptInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onReceiptUpload(list.id, file);
              e.target.value = "";
            }}
            style={{ display: "none" }}
          />
          <S.BottomButton
            type="button"
            $variant="receipt"
            disabled={receiptUploading}
            onClick={() => receiptInputRef.current?.click()}
          >
            {receiptUploading ? `⏳ ${t("shopping.uploading")}` : `📎 ${t("shopping.addReceipt")}`}
          </S.BottomButton>
        </>
      </S.BottomButtons>
    </S.Container>
  );
};
