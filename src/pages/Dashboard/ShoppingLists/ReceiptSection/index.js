import React from "react";
import * as S from "./styled";

export const ReceiptSection = ({ receipt, listId, onUpload, onRemove }) => (
  <S.Wrapper>
    <S.Title>📎 Paragon</S.Title>
    {receipt ? (
      <S.Info>
        <S.ReceiptName>✓ {receipt.name}</S.ReceiptName>
        <S.DeleteButton onClick={onRemove}>✕</S.DeleteButton>
      </S.Info>
    ) : (
      <S.FileInput>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) =>
            e.target.files?.[0] && onUpload(listId, e.target.files[0])
          }
          id="receipt-upload"
        />
        <S.FileLabel htmlFor="receipt-upload">
          Dodaj paragon (PDF lub zdjęcie)
        </S.FileLabel>
      </S.FileInput>
    )}
  </S.Wrapper>
);
