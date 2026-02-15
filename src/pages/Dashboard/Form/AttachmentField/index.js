import React from "react";
import * as S from "./styled";

export const AttachmentField = ({
  isPro,
  register,
  fileInfo,
  onFileChange,
}) => {
  const { onChange: formOnChange, ...attachmentRegister } = register("attachment");
  return (
  <S.FormGroup $fullWidth>
    <S.Label>Załącznik (PDF, zdjęcie)</S.Label>
    {isPro ? (
      <>
        <S.Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          {...attachmentRegister}
          onChange={(e) => {
            formOnChange(e);
            onFileChange(e);
          }}
        />
        {fileInfo && (
          <S.FileInfo>
            📎 {fileInfo.name}
            <br />
            {fileInfo.compressing && "🔄 Kompresowanie..."}
            {fileInfo.compressedSize && (
              <S.CompressionInfo>
                ✅ Skompresowano: {fileInfo.originalSize} → {fileInfo.compressedSize}
                (oszczędność: {fileInfo.savings})
              </S.CompressionInfo>
            )}
            {!fileInfo.compressing && !fileInfo.compressedSize && (
              <span>📄 PDF - {fileInfo.originalSize}</span>
            )}
          </S.FileInfo>
        )}
      </>
    ) : (
      <S.ProUpsell>
        🔒 Dodawanie załączników dostępne w planie Pro. Ulepsz, aby dodawać zdjęcia i PDF-y.
      </S.ProUpsell>
    )}
  </S.FormGroup>
  );
};
