import React from "react";
import * as S from "./styled";

export const ExportSection = ({ onExportData, onExportPDF }) => (
  <S.Card>
    <S.Icon>💾</S.Icon>
    <S.Title>Pobierz swoje dane</S.Title>
    <S.Desc>
      Pobierz wszystkie swoje dane w formacie JSON lub historię płatności w PDF.
      Plik JSON będzie zawierał płatności, listy zakupów i ustawienia.
    </S.Desc>
    <S.Button onClick={onExportData}>📥 Eksportuj dane (JSON)</S.Button>
    <S.Button onClick={onExportPDF} $secondary>
      🧾 Eksportuj historię płatności (PDF)
    </S.Button>
  </S.Card>
);
