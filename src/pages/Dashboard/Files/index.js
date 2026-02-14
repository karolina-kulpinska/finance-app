import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectPayments } from "../../../features/payments/paymentSlice";
import * as S from "./styled";
import { generateFilesPDF } from "./generatePDF";

const Files = () => {
  const payments = useSelector(selectPayments);
  const [activeFilter, setActiveFilter] = useState("all");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [selected, setSelected] = useState([]);

  const filters = [
    { id: "all", label: "Wszystkie", icon: "📋" },
    { id: "bills", label: "Rachunki", icon: "🧾" },
    { id: "shopping", label: "Zakupy", icon: "🛒" },
    { id: "other", label: "Inne", icon: "📌" },
  ];

  const filesWithAttachments = payments.filter((p) => p.attachmentUrl);

  let filteredFiles =
    activeFilter === "all"
      ? filesWithAttachments
      : filesWithAttachments.filter((p) => p.category === activeFilter);

  if (minDate) {
    filteredFiles = filteredFiles.filter(
      (f) => new Date(f.date) >= new Date(minDate),
    );
  }
  if (maxDate) {
    filteredFiles = filteredFiles.filter(
      (f) => new Date(f.date) <= new Date(maxDate),
    );
  }

  const handleDownload = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name || "plik";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelect = (id) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id],
    );
  };

  const handleSelectAll = () => {
    if (selected.length === filteredFiles.length) {
      setSelected([]);
    } else {
      setSelected(filteredFiles.map((f) => f.id));
    }
  };

  const handleDownloadSelected = () => {
    filteredFiles
      .filter((f) => selected.includes(f.id))
      .forEach((f) => handleDownload(f.attachmentUrl, f.attachmentName));
  };

  const handleDownloadPDF = () => {
    const files = filteredFiles.filter((f) => selected.includes(f.id));
    if (files.length > 0) {
      generateFilesPDF(files);
    }
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
        <S.DateInputs>
          <S.DateInput
            type="date"
            value={minDate}
            onChange={(e) => setMinDate(e.target.value)}
            placeholder="Od"
          />
          <S.DateSeparator>-</S.DateSeparator>
          <S.DateInput
            type="date"
            value={maxDate}
            onChange={(e) => setMaxDate(e.target.value)}
            placeholder="Do"
          />
        </S.DateInputs>
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
        <>
          <S.FilesActions>
            <S.SelectAllCheckbox
              type="checkbox"
              checked={
                selected.length === filteredFiles.length &&
                filteredFiles.length > 0
              }
              onChange={handleSelectAll}
            />
            <S.SelectAllLabel>Zaznacz wszystkie</S.SelectAllLabel>
            <S.DownloadSelectedButton
              disabled={selected.length === 0}
              onClick={handleDownloadSelected}
            >
              Pobierz wybrane ({selected.length})
            </S.DownloadSelectedButton>
            <S.DownloadSelectedButton
              disabled={selected.length === 0}
              onClick={handleDownloadPDF}
              style={{
                background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
              }}
            >
              PDF zestawienie
            </S.DownloadSelectedButton>
          </S.FilesActions>
          <S.FilesGrid>
            {filteredFiles.map((payment) => (
              <S.FileCard key={payment.id}>
                <S.FileCheckbox
                  type="checkbox"
                  checked={selected.includes(payment.id)}
                  onChange={() => handleSelect(payment.id)}
                />
                <S.FileIcon>
                  {payment.attachmentName.endsWith(".pdf") ? "📄" : "🖼️"}
                </S.FileIcon>
                <S.FileInfo>
                  <S.FileName>{payment.name}</S.FileName>
                  <S.FileDetails>{payment.attachmentName}</S.FileDetails>
                  <S.FileDate>{payment.date}</S.FileDate>
                </S.FileInfo>
                <S.DownloadIcon
                  onClick={() =>
                    handleDownload(
                      payment.attachmentUrl,
                      payment.attachmentName,
                    )
                  }
                >
                  ⬇️
                </S.DownloadIcon>
              </S.FileCard>
            ))}
          </S.FilesGrid>
        </>
      )}
    </S.Container>
  );
};

export default Files;
