import React from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styled";

export const ExportSection = ({ onExportData, onExportPDF }) => {
  const { t } = useTranslation();
  return (
    <S.Card>
      <S.Icon>💾</S.Icon>
      <S.Title>{t("profile.downloadData")}</S.Title>
      <S.Desc>{t("profile.downloadDataDesc")}</S.Desc>
      <S.Button onClick={onExportData}>📥 {t("profile.exportDataJson")}</S.Button>
      <S.Button onClick={onExportPDF} $secondary>
        🧾 {t("profile.exportPaymentsPdf")}
      </S.Button>
    </S.Card>
  );
};
