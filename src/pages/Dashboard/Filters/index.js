import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  setCategoryFilter,
  setDateFilter,
  selectFilter,
  selectCategoryFilter,
  selectDateFilter,
} from "../../../features/payments/paymentSlice";
import * as S from "./styled";

const Filters = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector(selectFilter);
  const activeCategoryFilter = useSelector(selectCategoryFilter);
  const activeDateFilter = useSelector(selectDateFilter);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  // Ustaw domyślnie "Ten miesiąc" przy pierwszym załadowaniu
  useEffect(() => {
    dispatch(setDateFilter("month"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    dispatch(setDateFilter("month"));
    setMinAmount("");
    setMaxAmount("");
    setShowAdvanced(false);
  };

  const hasActiveFilters = 
    activeFilter !== "all" || 
    activeCategoryFilter !== "all" || 
    (activeDateFilter !== "month" && activeDateFilter !== "all") ||
    minAmount !== "" ||
    maxAmount !== "";

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

          {hasActiveFilters && (
            <S.ClearButton onClick={handleClearFilters}>
              ✕ Wyczyść filtry
            </S.ClearButton>
          )}
        </S.AdvancedSection>
      )}
    </S.FiltersContainer>
  );
};

export default Filters;
