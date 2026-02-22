import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import DatePicker, { registerLocale } from "react-datepicker";
import { pl, enUS } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../../api/firebase";
import { openStorageDownloadUrl } from "../../../utils/firebaseStorageDownload";
import { selectPayments } from "../../../features/payments/paymentSlice";
import { selectIsPro } from "../../../features/subscription/subscriptionSlice";
import { updatePaymentRequest } from "../../../features/payments/paymentSlice";
import { showNotification } from "../../../features/notification/notificationSlice";
import * as S from "./styled";
import { generateFilesPDF } from "./generatePDF";

registerLocale("pl", pl);
registerLocale("en", enUS);

const parseDate = (s) => (s ? new Date(s + "T12:00:00") : null);
const toDateString = (d) =>
  d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` : "";

function getShoppingListReceipts(sharedOnly, locale = "pl-PL") {
  try {
    const raw = localStorage.getItem("shoppingLists");
    const lists = raw ? JSON.parse(raw) : [];
    return lists
      .filter((l) => l.receipt && (!sharedOnly || l.sharedWithFamily === true))
      .map((l) => {
        const createdAt = l.createdAt ? new Date(l.createdAt) : null;
        const dateISO = createdAt ? createdAt.toISOString().split("T")[0] : "";
        const dateDisplay = createdAt ? createdAt.toLocaleDateString(locale) : "";
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

const dateLocale = (lang) => (lang?.startsWith("en") ? "en-US" : "pl-PL");

const Files = ({ sharedOnly = false, payments: paymentsProp = null, isDemo = false }) => {
  const { t, i18n } = useTranslation();
  const locale = dateLocale(i18n.language);
  const dispatch = useDispatch();
  const paymentsFromStore = useSelector(selectPayments);
  const isPro = useSelector(selectIsPro);
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
    { id: "all", label: t("files.all"), icon: "📋" },
    { id: "bills", label: t("files.bills"), icon: "🧾" },
    { id: "shopping", label: t("files.shopping"), icon: "🛒" },
    { id: "other", label: t("files.other"), icon: "📌" },
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
          dateDisplay = d.toLocaleDateString(locale);
        } else {
          const paymentDate = new Date(p.date);
          if (!isNaN(paymentDate.getTime())) {
            dateISO = paymentDate.toISOString().split("T")[0];
            dateDisplay = paymentDate.toLocaleDateString(locale);
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
  const filesFromLists = getShoppingListReceipts(sharedOnly, locale);
  
  const demoFiles = isDemo ? [
    {
      id: "demo_file_1",
      name: locale === "en-US" ? "Electricity bill" : "Rachunek za prąd",
      attachmentName: "rachunek_prad_2024_01.pdf",
      date: "2024-01-15",
      dateDisplay: new Date("2024-01-15").toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" }),
      category: "bills",
      attachmentUrl: null, // Brak URL - nie można pobrać
      fromShoppingList: false,
    },
    {
      id: "demo_file_2",
      name: locale === "en-US" ? "Gas bill" : "Rachunek za gaz",
      attachmentName: "rachunek_gaz_2024_01.pdf",
      date: "2024-01-20",
      dateDisplay: new Date("2024-01-20").toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" }),
      category: "bills",
      attachmentUrl: null,
      fromShoppingList: false,
    },
    {
      id: "demo_file_3",
      name: locale === "en-US" ? "Receipt - Groceries" : "Paragon - Zakupy spożywcze",
      attachmentName: "paragon_zakupy_2024_01.jpg",
      date: "2024-01-25",
      dateDisplay: new Date("2024-01-25").toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" }),
      category: "shopping",
      attachmentUrl: null,
      fromShoppingList: false,
    },
    {
      id: "demo_file_4",
      name: locale === "en-US" ? "Invoice - Internet" : "Faktura - Internet",
      attachmentName: "faktura_internet_2024_02.pdf",
      date: "2024-02-01",
      dateDisplay: new Date("2024-02-01").toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" }),
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
      dispatch(showNotification({ message: t("files.demoNoDownload"), type: "info" }));
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
      {!isPro && !isDemo && (
        <S.ProInfoBanner>
          ℹ️ {t("files.proFilesInfo")}
        </S.ProInfoBanner>
      )}
      {fileToDelete && (
        <S.ConfirmOverlay
          onClick={() => setFileToDelete(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
        >
          <S.ConfirmModalBox onClick={(e) => e.stopPropagation()}>
            <S.ConfirmTitle id="confirm-delete-title">
              {t("files.deleteFile")}
            </S.ConfirmTitle>
            <S.ConfirmMessage>
              {t("files.deleteFileConfirm")}
            </S.ConfirmMessage>
            <S.ConfirmButtonGroup>
              <S.ConfirmCancelBtn onClick={() => setFileToDelete(null)}>
                {t("common.cancel")}
              </S.ConfirmCancelBtn>
              <S.ConfirmDeleteBtn
                onClick={() => {
                  handleDeleteFile(fileToDelete);
                  setFileToDelete(null);
                }}
                disabled={deletingId === fileToDelete.id}
              >
                {deletingId === fileToDelete.id ? t("files.deleting") : t("common.delete")}
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
          <S.DatePickerWrap>
            <DatePicker
              selected={parseDate(minDate)}
              onChange={(d) => setMinDate(toDateString(d))}
              locale={i18n.language?.startsWith("en") ? "en" : "pl"}
              dateFormat={i18n.language?.startsWith("en") ? "MM/dd/yyyy" : "dd.MM.yyyy"}
              placeholderText={t("filters.from")}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              withPortal
            />
          </S.DatePickerWrap>
          <S.DateSeparator>-</S.DateSeparator>
          <S.DatePickerWrap>
            <DatePicker
              selected={parseDate(maxDate)}
              onChange={(d) => setMaxDate(toDateString(d))}
              locale={i18n.language?.startsWith("en") ? "en" : "pl"}
              dateFormat={i18n.language?.startsWith("en") ? "MM/dd/yyyy" : "dd.MM.yyyy"}
              placeholderText={t("filters.to")}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              withPortal
            />
          </S.DatePickerWrap>
          <S.SearchButton onClick={handleSearch} type="button">
            🔍 {t("files.search")}
          </S.SearchButton>
          {(activeMinDate || activeMaxDate || activeFilter !== "all") && (
            <S.ClearButton onClick={handleClearFilters} type="button">
              ✕ {t("files.clear")}
            </S.ClearButton>
          )}
        </S.DateInputs>
      </S.FiltersWrapper>

      {filteredFiles.length === 0 ? (
        <S.EmptyState>
          <S.EmptyIcon>📂</S.EmptyIcon>
          <S.EmptyTitle>{t("files.noFiles")}</S.EmptyTitle>
          <S.EmptyText>
            {isDemo
              ? t("files.demoNoAttach")
              : sharedOnly
                ? t("files.noSharedFiles")
                : t("files.addFilesHint")}
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
              <S.SelectAllLabel>{t("files.selectAll")}</S.SelectAllLabel>
              <S.DownloadSelectedButton
                disabled={selected.length === 0}
                onClick={handleDownloadSelected}
                title={t("files.downloadSelected")}
              >
                {t("files.downloadSelected")} ({selected.length})
              </S.DownloadSelectedButton>
              <S.DownloadSelectedButton
                disabled={selected.length === 0}
                onClick={handleDownloadPDF}
                $variant="pdf"
                title={t("files.pdfReport")}
              >
                {t("files.pdfReport")}
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
                      title={t("files.download")}
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
                      title={t("files.demoNoDownload")}
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
                      title={t("files.attachedToList")}
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
                      title={t("files.deleteFile")}
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
