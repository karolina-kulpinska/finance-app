import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../../api/firebase";
import { openStorageDownloadUrl } from "../../../utils/firebaseStorageDownload";
import { selectPayments } from "../../../features/payments/paymentSlice";
import { updatePaymentRequest } from "../../../features/payments/paymentSlice";
import { showNotification } from "../../../features/notification/notificationSlice";
import * as S from "./styled";
import { generateFilesPDF } from "./generatePDF";

function getShoppingListReceipts(sharedOnly) {
  try {
    const raw = localStorage.getItem("shoppingLists");
    const lists = raw ? JSON.parse(raw) : [];
    return lists
      .filter((l) => l.receipt && (!sharedOnly || l.sharedWithFamily === true))
      .map((l) => {
        const createdAt = l.createdAt ? new Date(l.createdAt) : null;
        const dateISO = createdAt ? createdAt.toISOString().split("T")[0] : "";
        const dateDisplay = createdAt ? createdAt.toLocaleDateString("pl-PL") : "";
        return {
          id: `receipt-${l.id}`,
          name: l.name,
          attachmentName: l.receipt.name,
          date: dateISO,
          dateDisplay: dateDisplay,
          category: "shopping",
          attachmentUrl: l.receipt.url || null,
          fromShoppingList: true,
        };
      });
  } catch {
    return [];
  }
}

const Files = ({ sharedOnly = false, payments: paymentsProp = null, isDemo = false }) => {
  const dispatch = useDispatch();
  const paymentsFromStore = useSelector(selectPayments);
  const payments = paymentsProp !== null ? paymentsProp : paymentsFromStore;
  const [activeFilter, setActiveFilter] = useState("all");
  const [deletingId, setDeletingId] = useState(null);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [activeMinDate, setActiveMinDate] = useState("");
  const [activeMaxDate, setActiveMaxDate] = useState("");
  const [selected, setSelected] = useState([]);

  const filters = [
    { id: "all", label: "Wszystkie", icon: "📋" },
    { id: "bills", label: "Rachunki", icon: "🧾" },
    { id: "shopping", label: "Zakupy", icon: "🛒" },
    { id: "other", label: "Inne", icon: "📌" },
  ];

  const filesFromPayments = payments
    .filter((p) => p.attachmentUrl && (!sharedOnly || p.sharedWithFamily === true))
    .map((p) => {
      let dateISO = "";
      let dateDisplay = "";
      if (p.date) {
        if (typeof p.date === "string" && p.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          dateISO = p.date;
          const d = new Date(p.date + "T00:00:00");
          dateDisplay = d.toLocaleDateString("pl-PL");
        } else {
          const paymentDate = new Date(p.date);
          if (!isNaN(paymentDate.getTime())) {
            dateISO = paymentDate.toISOString().split("T")[0];
            dateDisplay = paymentDate.toLocaleDateString("pl-PL");
          }
        }
      }
      return {
        ...p,
        date: dateISO,
        dateDisplay: dateDisplay,
        fromShoppingList: false,
      };
    });
  const filesFromLists = getShoppingListReceipts(sharedOnly);
  
  // Przykładowe pliki dla demo
  const demoFiles = isDemo ? [
    {
      id: "demo_file_1",
      name: "Rachunek za prąd",
      attachmentName: "rachunek_prad_2024_01.pdf",
      date: "2024-01-15",
      dateDisplay: "15 stycznia 2024",
      category: "bills",
      attachmentUrl: null, // Brak URL - nie można pobrać
      fromShoppingList: false,
    },
    {
      id: "demo_file_2",
      name: "Rachunek za gaz",
      attachmentName: "rachunek_gaz_2024_01.pdf",
      date: "2024-01-20",
      dateDisplay: "20 stycznia 2024",
      category: "bills",
      attachmentUrl: null,
      fromShoppingList: false,
    },
    {
      id: "demo_file_3",
      name: "Paragon - Zakupy spożywcze",
      attachmentName: "paragon_zakupy_2024_01.jpg",
      date: "2024-01-25",
      dateDisplay: "25 stycznia 2024",
      category: "shopping",
      attachmentUrl: null,
      fromShoppingList: false,
    },
    {
      id: "demo_file_4",
      name: "Faktura - Internet",
      attachmentName: "faktura_internet_2024_02.pdf",
      date: "2024-02-01",
      dateDisplay: "1 lutego 2024",
      category: "other",
      attachmentUrl: null,
      fromShoppingList: false,
    },
  ] : [];
  
  const allFiles = isDemo ? demoFiles : [...filesFromPayments, ...filesFromLists];

  let filteredFiles =
    activeFilter === "all"
      ? allFiles
      : allFiles.filter((f) => f.category === activeFilter);

  if (activeMinDate) {
    filteredFiles = filteredFiles.filter((f) => {
      if (!f.date) return false;
      const fileDate = f.date.split("T")[0];
      return fileDate >= activeMinDate;
    });
  }
  if (activeMaxDate) {
    filteredFiles = filteredFiles.filter((f) => {
      if (!f.date) return false;
      const fileDate = f.date.split("T")[0];
      return fileDate <= activeMaxDate;
    });
  }

  const handleDownload = (url, name) => {
    if (isDemo) {
      dispatch(showNotification({ message: "W trybie demo nie możesz pobierać plików.", type: "info" }));
      return;
    }
    const fileName = name || "plik";
    if (url && url.includes("firebasestorage.googleapis.com")) {
      openStorageDownloadUrl(url);
      return;
    }
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.rel = "noopener noreferrer";
    link.target = "_blank";
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
    const toDownload = filteredFiles.filter(
      (f) => selected.includes(f.id) && f.attachmentUrl
    );
    toDownload.forEach((f, i) => {
      setTimeout(
        () => handleDownload(f.attachmentUrl, f.attachmentName),
        i * 300,
      );
    });
  };

  const handleDownloadPDF = () => {
    const files = filteredFiles.filter((f) => selected.includes(f.id));
    if (files.length > 0) {
      generateFilesPDF(files);
    }
  };

  const handleSearch = () => {
    setActiveMinDate(minDate);
    setActiveMaxDate(maxDate);
  };

  const handleClearFilters = () => {
    setMinDate("");
    setMaxDate("");
    setActiveMinDate("");
    setActiveMaxDate("");
    setActiveFilter("all");
    setSelected([]);
  };

  const handleDeleteFile = async (file) => {
    if (deletingId) return;
    setDeletingId(file.id);
    try {
      if (file.fromShoppingList) {
        const listId = String(file.id).replace(/^receipt-/, "");
        const raw = localStorage.getItem("shoppingLists");
        const lists = raw ? JSON.parse(raw) : [];
        const updated = lists.map((l) =>
          String(l.id) === listId ? { ...l, receipt: null } : l
        );
        localStorage.setItem("shoppingLists", JSON.stringify(updated));
        if (file.attachmentUrl) {
          try {
            const storageRef = ref(storage, file.attachmentUrl);
            await deleteObject(storageRef);
          } catch {
          }
        }
        window.dispatchEvent(new CustomEvent("shoppingListsUpdated"));
      } else {
        const payment = payments.find((p) => p.id === file.id);
        if (payment) {
          dispatch(
            updatePaymentRequest({
              id: payment.id,
              ...payment,
              attachmentUrl: null,
              attachmentName: null,
              oldAttachmentUrl: payment.attachmentUrl,
            })
          );
        }
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <S.Container>
      {fileToDelete && (
        <S.ConfirmOverlay
          onClick={() => setFileToDelete(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
        >
          <S.ConfirmModalBox onClick={(e) => e.stopPropagation()}>
            <S.ConfirmTitle id="confirm-delete-title">
              Usuń plik
            </S.ConfirmTitle>
            <S.ConfirmMessage>
              Czy na pewno chcesz usunąć ten plik z całej aplikacji? Ta czynność
              jest nieodwracalna.
            </S.ConfirmMessage>
            <S.ConfirmButtonGroup>
              <S.ConfirmCancelBtn onClick={() => setFileToDelete(null)}>
                Anuluj
              </S.ConfirmCancelBtn>
              <S.ConfirmDeleteBtn
                onClick={() => {
                  handleDeleteFile(fileToDelete);
                  setFileToDelete(null);
                }}
                disabled={deletingId === fileToDelete.id}
              >
                {deletingId === fileToDelete.id ? "Usuwanie…" : "Usuń"}
              </S.ConfirmDeleteBtn>
            </S.ConfirmButtonGroup>
          </S.ConfirmModalBox>
        </S.ConfirmOverlay>
      )}
      <S.FiltersWrapper>
        <S.FiltersChipsRow>
          {filters.map((filter) => (
            <S.FilterChip
              key={filter.id}
              $active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.icon} {filter.label}
            </S.FilterChip>
          ))}
        </S.FiltersChipsRow>
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
          <S.SearchButton onClick={handleSearch} type="button">
            🔍 Szukaj
          </S.SearchButton>
          {(activeMinDate || activeMaxDate || activeFilter !== "all") && (
            <S.ClearButton onClick={handleClearFilters} type="button">
              ✕ Wyczyść
            </S.ClearButton>
          )}
        </S.DateInputs>
      </S.FiltersWrapper>

      {filteredFiles.length === 0 ? (
        <S.EmptyState>
          <S.EmptyIcon>📂</S.EmptyIcon>
          <S.EmptyTitle>Brak plików</S.EmptyTitle>
          <S.EmptyText>
            {isDemo
              ? "W trybie demo nie możesz dodawać załączników do płatności. Zarejestruj się, aby przesyłać pliki."
              : sharedOnly
                ? "Brak plików udostępnionych rodzinie. Zaznacz „Udostępnij rodzinie” przy płatności z załącznikiem."
                : "Dodaj załączniki do płatności lub paragony do list zakupów, aby zobaczyć je tutaj."}
          </S.EmptyText>
        </S.EmptyState>
      ) : (
        <>
          {!isDemo && (
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
                title="Pobierz wybrane"
              >
                Pobierz wybrane ({selected.length})
              </S.DownloadSelectedButton>
              <S.DownloadSelectedButton
                disabled={selected.length === 0}
                onClick={handleDownloadPDF}
                $variant="pdf"
                title="PDF zestawienie"
              >
                PDF zestawienie
              </S.DownloadSelectedButton>
            </S.FilesActions>
          )}
          <S.FilesGrid>
            {filteredFiles.map((file) => (
              <S.FileCard key={file.id}>
                {!isDemo && (
                  <S.FileCheckbox
                    type="checkbox"
                    checked={selected.includes(file.id)}
                    onChange={() => handleSelect(file.id)}
                  />
                )}
                <S.FileIcon>
                  {file.attachmentName?.endsWith(".pdf") ? "📄" : "🖼️"}
                </S.FileIcon>
                <S.FileInfo>
                  <S.FileName>
                    {file.fromShoppingList ? `🛒 ${file.name}` : file.name}
                  </S.FileName>
                  <S.FileDetails>{file.attachmentName}</S.FileDetails>
                  <S.FileDate>{file.dateDisplay || file.date}</S.FileDate>
                </S.FileInfo>
                <S.FileActions>
                  {file.attachmentUrl && !isDemo ? (
                    <S.DownloadIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(file.attachmentUrl, file.attachmentName);
                      }}
                      title="Pobierz"
                    >
                      ⬇️
                    </S.DownloadIcon>
                  ) : isDemo ? (
                    <span
                      style={{
                        fontSize: 20,
                        flexShrink: 0,
                        opacity: 0.5,
                        cursor: "not-allowed",
                      }}
                      title="W trybie demo nie można pobierać plików"
                    >
                      ⬇️
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: 20,
                        flexShrink: 0,
                        opacity: 0.7,
                      }}
                      title="Załączony do listy zakupów"
                    >
                      📎
                    </span>
                  )}
                  {!isDemo && (
                    <S.DeleteIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setFileToDelete(file);
                      }}
                      disabled={deletingId === file.id}
                      title="Usuń plik"
                    >
                      {deletingId === file.id ? "⏳" : "🗑️"}
                    </S.DeleteIcon>
                  )}
                </S.FileActions>
              </S.FileCard>
            ))}
          </S.FilesGrid>
        </>
      )}
    </S.Container>
  );
};

export default Files;
