import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  setCategoryFilter,
  setDateFilter,
  selectFilter,
  selectDateFilter,
} from "../../../features/payments/paymentSlice";
import * as S from "./styled";

const Filters = ({
  minDate,
  maxDate,
  minAmount,
  maxAmount,
  setMinDate,
  setMaxDate,
  setMinAmount,
  setMaxAmount,
}) => {
  const dispatch = useDispatch();
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
    { id: "all", label: "Wszystkie" },
    { id: "unpaid", label: "Do zapłaty" },
    { id: "paid", label: "Zapłacone" },
  ];

  const dateFilters = [
    { id: "today", label: "Dziś" },
    { id: "week", label: "Tydzień" },
    { id: "month", label: "Miesiąc" },
    { id: "all", label: "Wszystko" },
  ];

  const handleClearFilters = () => {
    dispatch(setFilter("all"));
    dispatch(setCategoryFilter("all"));
    dispatch(setDateFilter("all"));
    setMinAmount("");
    setMaxAmount("");
    setMinDate("");
    setMaxDate("");
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
          {showAdvanced ? "Mniej ▲" : "Więcej ▼"}
        </S.AdvancedToggle>
      </S.FilterRow>

      {showAdvanced && (
        <S.AdvancedSection>
          <S.FilterGroup>
            <S.FilterLabel>Status</S.FilterLabel>
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
          </S.FilterGroup>

          <S.FilterGroup>
            <S.FilterLabel>Data płatności</S.FilterLabel>
            <S.AmountInputs>
              <S.AmountInput
                type="date"
                placeholder="Od"
                value={minDate || ""}
                onChange={(e) => setMinDate(e.target.value)}
                style={{ minWidth: 0 }}
              />
              <S.AmountSeparator>-</S.AmountSeparator>
              <S.AmountInput
                type="date"
                placeholder="Do"
                value={maxDate || ""}
                onChange={(e) => setMaxDate(e.target.value)}
                style={{ minWidth: 0 }}
              />
              <S.SearchButton onClick={() => {}} type="button">
                🔍 Szukaj
              </S.SearchButton>
            </S.AmountInputs>
          </S.FilterGroup>

          <S.FilterGroup>
            <S.FilterLabel>Kwota (zł)</S.FilterLabel>
            <S.AmountInputs>
              <S.AmountInput
                type="number"
                placeholder="Od"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
              />
              <S.AmountSeparator>-</S.AmountSeparator>
              <S.AmountInput
                type="number"
                placeholder="Do"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
              />
            </S.AmountInputs>
          </S.FilterGroup>

          <S.ClearButton onClick={handleClearFilters}>
            ✕ Wyczyść filtry
          </S.ClearButton>
        </S.AdvancedSection>
      )}
    </S.FiltersContainer>
  );
};

export default Filters;
