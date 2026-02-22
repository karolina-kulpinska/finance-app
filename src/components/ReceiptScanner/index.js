import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Tesseract from "tesseract.js";
import i18n from "../../i18n";
import * as S from "./styled";

const ReceiptScanner = ({ onScanComplete }) => {
  const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setScanning(true);
    setProgress(0);

    try {
      const result = await Tesseract.recognize(file, "pol", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      const text = result.data.text;
      const parsedData = parseReceipt(text);
      onScanComplete(parsedData);
    } catch (error) {
      alert(t("form.receiptScanError"));
    } finally {
      setScanning(false);
      setProgress(0);
    }
  };

  const parseReceipt = (text) => {
    const lines = text.split("\n").map((line) => line.trim());
    
    const amountRegex = /(\d+[.,]\d{2})\s*(zł|PLN)?/gi;
    const amounts = [];
    lines.forEach((line) => {
      const matches = line.matchAll(amountRegex);
      for (const match of matches) {
        const amount = parseFloat(match[1].replace(",", "."));
        if (amount > 0 && amount < 100000) {
          amounts.push(amount);
        }
      }
    });

    const dateRegex = /(\d{2})[./-](\d{2})[./-](\d{4})/;
    let date = "";
    for (const line of lines) {
      const match = line.match(dateRegex);
      if (match) {
        const [, day, month, year] = match;
        date = `${year}-${month}-${day}`;
        break;
      }
    }

    const storeName = lines.slice(0, 3)
      .find((line) => line.length > 3 && line.length < 50 && /[a-zA-Z]/.test(line)) || "";

    const totalAmount = amounts.length > 0 
      ? Math.max(...amounts) 
      : 0;

    return {
      name: storeName || (i18n.language?.startsWith("en") ? "Shopping" : "Zakupy"),
      amount: totalAmount,
      date: date || new Date().toISOString().split("T")[0],
      category: "shopping",
    };
  };

  return (
    <S.Container>
      <S.ScanButton as="label" htmlFor="receipt-scan" disabled={scanning}>
        {scanning ? (
          <>
            <S.ScanIcon>⏳</S.ScanIcon>
            {t("form.scanning")} {progress}%
          </>
        ) : (
          <>
            <S.ScanIcon>📸</S.ScanIcon>
            {t("form.scanReceipt")}
          </>
        )}
      </S.ScanButton>
      <S.HiddenInput
        id="receipt-scan"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        disabled={scanning}
      />
      {scanning && (
        <S.ProgressBar>
          <S.ProgressFill $progress={progress} />
        </S.ProgressBar>
      )}
      <S.HintText>
        📝 {t("form.scanHint")}
      </S.HintText>
    </S.Container>
  );
};

export default ReceiptScanner;
