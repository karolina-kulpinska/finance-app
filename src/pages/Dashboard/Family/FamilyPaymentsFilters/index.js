import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { pl, enUS } from "date-fns/locale";
import * as S from "./styled";

registerLocale("pl", pl);
registerLocale("en", enUS);

const toLocalDateString = (d) => {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const parseDateString = (s) => (s ? new Date(s + "T12:00:00") : null);

const PRESETS = ["monthOrOverdue", "month", "overdue", "all", "custom"];

export const FamilyPaymentsFilters = ({
  preset,
  minDate,
  maxDate,
  searchName,
  onPresetChange,
  onMinDateChange,
  onMaxDateChange,
  onSearchChange,
}) => {
  const { t, i18n } = useTranslation();
  const [showCustom, setShowCustom] = useState(preset === "custom");

  const presetLabels = {
    monthOrOverdue: t("family.paymentsFilterMonthOverdue"),
    month: t("family.paymentsFilterMonth"),
    overdue: t("family.paymentsFilterOverdue"),
    all: t("family.paymentsFilterAll"),
    custom: t("family.paymentsFilterCustom"),
  };

  const handlePresetClick = (p) => {
    if (p === "custom") {
      setShowCustom(true);
      onPresetChange("custom");
    } else {
      setShowCustom(false);
      onPresetChange(p);
    }
  };

  return (
    <S.Container>
      <S.QuickFilters>
        {PRESETS.map((p) => (
          <S.Chip
            key={p}
            $active={preset === p}
            onClick={() => handlePresetClick(p)}
          >
            {presetLabels[p]}
          </S.Chip>
        ))}
      </S.QuickFilters>

      {showCustom && (
        <S.CustomSection>
          <S.Label>{t("family.paymentsFilterDateRange")}</S.Label>
          <S.DateRow>
            <S.DateWrap>
              <DatePicker
                selected={parseDateString(minDate)}
                onChange={(d) => onMinDateChange(d ? toLocalDateString(d) : "")}
                locale={i18n.language?.startsWith("en") ? "en" : "pl"}
                dateFormat={i18n.language?.startsWith("en") ? "MM/dd/yyyy" : "dd.MM.yyyy"}
                placeholderText={t("filters.from")}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                yearDropdownItemNumber={100}
                scrollableYearDropdown
              />
            </S.DateWrap>
            <S.Separator>-</S.Separator>
            <S.DateWrap>
              <DatePicker
                selected={parseDateString(maxDate)}
                onChange={(d) => onMaxDateChange(d ? toLocalDateString(d) : "")}
                locale={i18n.language?.startsWith("en") ? "en" : "pl"}
                dateFormat={i18n.language?.startsWith("en") ? "MM/dd/yyyy" : "dd.MM.yyyy"}
                placeholderText={t("filters.to")}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                yearDropdownItemNumber={100}
                scrollableYearDropdown
              />
            </S.DateWrap>
          </S.DateRow>
        </S.CustomSection>
      )}

      <S.SearchRow>
        <S.SearchIcon>🔍</S.SearchIcon>
        <S.SearchInput
          type="text"
          placeholder={t("filters.searchPlaceholder")}
          value={searchName}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchName && (
          <S.ClearBtn onClick={() => onSearchChange("")}>✕</S.ClearBtn>
        )}
      </S.SearchRow>
    </S.Container>
  );
};
