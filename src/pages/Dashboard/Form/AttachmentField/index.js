import React from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styled";

export const AttachmentField = ({
  isPro,
  register,
  fileInfo,
  onFileChange,
}) => {
  const { t } = useTranslation();
  const { onChange: formOnChange, ...attachmentRegister } = register("attachment");
  return (
    <S.FormGroup $fullWidth>
      <S.Label>{t("form.attachment")}</S.Label>
      {isPro ? (
        <>
          <S.FileInputWrapper>
            <S.Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              {...attachmentRegister}
              onChange={(e) => {
                formOnChange(e);
                onFileChange(e);
              }}
            />
            <S.FileInputLabel>
              {fileInfo?.name || t("form.noFileChosen")}
            </S.FileInputLabel>
            <S.ChooseFileButton>{t("form.chooseFile")}</S.ChooseFileButton>
          </S.FileInputWrapper>
          {fileInfo && (
            <S.FileInfo>
              📎 {fileInfo.name}
              <br />
              {fileInfo.compressing && `🔄 ${t("form.compressing")}`}
              {fileInfo.compressedSize && (
                <S.CompressionInfo>
                  ✅ {t("form.compressedFromTo", { from: fileInfo.originalSize, to: fileInfo.compressedSize })}
                  ({t("form.savings")}: {fileInfo.savings})
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
          🔒 {t("form.proUpsell")}
        </S.ProUpsell>
      )}
    </S.FormGroup>
  );
};
