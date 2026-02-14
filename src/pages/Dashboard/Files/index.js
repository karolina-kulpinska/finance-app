import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectPayments } from "../../../features/payments/paymentSlice";
import * as S from "./styled";

const Files = () => {
  const payments = useSelector(selectPayments);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Wszystkie", icon: "📋" },
    { id: "bills", label: "Rachunki", icon: "🧾" },
    { id: "shopping", label: "Zakupy", icon: "🛒" },
    { id: "other", label: "Inne", icon: "📌" },
  ];

  const filesWithAttachments = payments.filter(p => p.attachmentUrl);
  
  const filteredFiles = activeFilter === "all" 
    ? filesWithAttachments
    : filesWithAttachments.filter(p => p.category === activeFilter);

  const handleDownload = (url, name) => {
    window.open(url, "_blank");
  };

  return (
    <S.Container>
      <S.FiltersRow>
        {filters.map((filter) => (
          <S.FilterChip
            key={filter.id}
            $active={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.icon} {filter.label}
          </S.FilterChip>
        ))}
      </S.FiltersRow>

      {filteredFiles.length === 0 ? (
        <S.EmptyState>
          <S.EmptyIcon>📂</S.EmptyIcon>
          <S.EmptyTitle>Brak plików</S.EmptyTitle>
          <S.EmptyText>
            Dodaj załączniki do płatności, aby zobaczyć je tutaj
          </S.EmptyText>
        </S.EmptyState>
      ) : (
        <S.FilesGrid>
          {filteredFiles.map((payment) => (
            <S.FileCard
              key={payment.id}
              onClick={() => handleDownload(payment.attachmentUrl, payment.attachmentName)}
            >
              <S.FileIcon>
                {payment.attachmentName.endsWith('.pdf') ? '📄' : '🖼️'}
              </S.FileIcon>
              <S.FileInfo>
                <S.FileName>{payment.name}</S.FileName>
                <S.FileDetails>
                  {payment.attachmentName}
                </S.FileDetails>
                <S.FileDate>{payment.date}</S.FileDate>
              </S.FileInfo>
              <S.DownloadIcon>⬇️</S.DownloadIcon>
            </S.FileCard>
          ))}
        </S.FilesGrid>
      )}
    </S.Container>
  );
};

export default Files;
