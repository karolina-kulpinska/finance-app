import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DatePicker, { registerLocale } from "react-datepicker";
import { pl, enUS } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import {
  setFilter,
  setCategoryFilter,
  setDateFilter,
  selectFilter,
  selectDateFilter,
} from "../../../features/payments/paymentSlice";
import { selectCurrency } from "../../../features/currency/currencySlice";
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

const Filters = ({
  minDate,
  maxDate,
  minAmount,
  maxAmount,
  searchName,
  setMinDate,
  setMaxDate,
  setMinAmount,
  setMaxAmount,
  setSearchName,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const activeFilter = useSelector(selectFilter);
  const activeDateFilter = useSelector(selectDateFilter);
  const [showAdvanced, setShowAdvanced] = useState(false);
  useEffect(() => {
    dispatch(setDateFilter("all"));
  }, [dispatch]);

  useEffect(() => {
    if (minDate || maxDate) {
      dispatch(setDateFilter("all"));
    }
  }, [minDate, maxDate, dispatch]);

  const statusFilters = [
    { id: "all", label: t("filters.allStatus") },
    { id: "unpaid", label: t("filters.toPay") },
    { id: "paid", label: t("filters.paid") },
  ];

  const dateFilters = [
    { id: "today", label: t("filters.today") },
    { id: "week", label: t("filters.week") },
    { id: "month", label: t("filters.month") },
    { id: "all", label: t("filters.all") },
  ];

  const handleClearFilters = () => {
    dispatch(setFilter("all"));
    dispatch(setCategoryFilter("all"));
    dispatch(setDateFilter("all"));
    setMinAmount("");
    setMaxAmount("");
    setMinDate("");
    setMaxDate("");
    setSearchName("");
  };

  return (
    <S.FiltersContainer>
      <S.FilterRow>
        <S.QuickFilters>
          {dateFilters.map((filter) => (
            <S.QuickChip
              key={filter.id}
              $active={activeDateFilter === filter.id}
              onClick={() => dispatch(setDateFilter(filter.id))}
            >
              {filter.label}
            </S.QuickChip>
          ))}
        </S.QuickFilters>

        <S.AdvancedToggle onClick={() => setShowAdvanced(!showAdvanced)}>
          {showAdvanced ? t("filters.less") : t("filters.more")}
        </S.AdvancedToggle>
      </S.FilterRow>

      {showAdvanced && (
        <S.AdvancedSection>
          <S.FilterGroup>
            <S.FilterLabel>{t("filters.status")}</S.FilterLabel>
            <S.FilterButtons>
              {statusFilters.map((filter) => (
                <S.FilterChip
                  key={filter.id}
                  $active={activeFilter === filter.id}
                  onClick={() => dispatch(setFilter(filter.id))}
                >
                  {filter.label}
                </S.FilterChip>
              ))}
            </S.FilterButtons>
            <S.SearchInputWrapper>
              <S.SearchIcon>🔍</S.SearchIcon>
              <S.SearchInput
                type="text"
                placeholder={t("filters.searchPlaceholder")}
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              {searchName && (
                <S.ClearSearchButton onClick={() => setSearchName("")}>
                  ✕
                </S.ClearSearchButton>
              )}
            </S.SearchInputWrapper>
          </S.FilterGroup>

          <S.FilterGroup as="div">
            <S.FilterLabel>{t("filters.paymentDate")}</S.FilterLabel>
            <S.AmountInputs>
              <S.DatePickerWrap>
                <DatePicker
                  selected={parseDateString(minDate)}
                  onChange={(d) => setMinDate(d ? toLocalDateString(d) : "")}
                  locale={i18n.language?.startsWith("en") ? "en" : "pl"}
                  dateFormat={i18n.language?.startsWith("en") ? "MM/dd/yyyy" : "dd.MM.yyyy"}
                  placeholderText={t("filters.from")}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  withPortal
                />
              </S.DatePickerWrap>
              <S.AmountSeparator>-</S.AmountSeparator>
              <S.DatePickerWrap>
                <DatePicker
                  selected={parseDateString(maxDate)}
                  onChange={(d) => setMaxDate(d ? toLocalDateString(d) : "")}
                  locale={i18n.language?.startsWith("en") ? "en" : "pl"}
                  dateFormat={i18n.language?.startsWith("en") ? "MM/dd/yyyy" : "dd.MM.yyyy"}
                  placeholderText={t("filters.to")}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  withPortal
                />
              </S.DatePickerWrap>
              <S.SearchButton onClick={() => {}} type="button">
                🔍 {t("filters.search")}
              </S.SearchButton>
            </S.AmountInputs>
          </S.FilterGroup>

          <S.FilterGroup>
            <S.FilterLabel>{t("filters.amount", { symbol: currency.symbol })}</S.FilterLabel>
            <S.AmountInputs>
              <S.AmountInput
                type="number"
                placeholder={t("filters.from")}
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
              />
              <S.AmountSeparator>-</S.AmountSeparator>
              <S.AmountInput
                type="number"
                placeholder={t("filters.to")}
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
              />
            </S.AmountInputs>
          </S.FilterGroup>

          <S.ClearButton onClick={handleClearFilters}>
            {t("filters.clearFilters")}
          </S.ClearButton>
        </S.AdvancedSection>
      )}
    </S.FiltersContainer>
  );
};

export default Filters;
