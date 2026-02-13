import React, { useState } from "react";
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
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const statusFilters = [
    { id: "all", label: "Wszystkie" },
    { id: "unpaid", label: "Do zapłaty" },
    { id: "paid", label: "Zapłacone" },
  ];

  const categoryFilters = [
    { id: "all", label: "Wszystkie" },
    { id: "bills", label: "🧾 Rachunki" },
    { id: "shopping", label: "🛒 Zakupy" },
    { id: "other", label: "📌 Inne" },
  ];

  const dateFilters = [
    { id: "all", label: "Wszystkie" },
    { id: "today", label: "📅 Dziś" },
    { id: "week", label: "📆 Ten tydzień" },
    { id: "month", label: "📊 Ten miesiąc" },
    { id: "year", label: "📈 Ten rok" },
    { id: "custom", label: "🔧 Własny zakres" },
  ];

  const handleClearFilters = () => {
    dispatch(setFilter("all"));
    dispatch(setCategoryFilter("all"));
    dispatch(setDateFilter("all"));
    setShowCustomDate(false);
    setCustomStart("");
    setCustomEnd("");
  };

  const handleDateFilterChange = (filterId) => {
    dispatch(setDateFilter(filterId));
    if (filterId === "custom") {
      setShowCustomDate(true);
    } else {
      setShowCustomDate(false);
    }
  };

  return (
    <S.FiltersContainer>
      <S.FiltersHeader>
        <S.FiltersTitle>Filtry</S.FiltersTitle>
        <S.ClearButton onClick={handleClearFilters}>
          Wyczyść filtry
        </S.ClearButton>
      </S.FiltersHeader>

      <S.FiltersGrid>
        <S.FilterGroup>
          <S.FilterLabel>Status</S.FilterLabel>
          <S.FilterButtons>
            {statusFilters.map((filter) => (
              <S.FilterButton
                key={filter.id}
                $active={activeFilter === filter.id}
                onClick={() => dispatch(setFilter(filter.id))}
              >
                {filter.label}
              </S.FilterButton>
            ))}
          </S.FilterButtons>
        </S.FilterGroup>

        <S.FilterGroup>
          <S.FilterLabel>Kategoria</S.FilterLabel>
          <S.FilterButtons>
            {categoryFilters.map((filter) => (
              <S.FilterButton
                key={filter.id}
                $active={activeCategoryFilter === filter.id}
                onClick={() => dispatch(setCategoryFilter(filter.id))}
              >
                {filter.label}
              </S.FilterButton>
            ))}
          </S.FilterButtons>
        </S.FilterGroup>

        <S.FilterGroup>
          <S.FilterLabel>Okres</S.FilterLabel>
          <S.FilterButtons>
            {dateFilters.map((filter) => (
              <S.FilterButton
                key={filter.id}
                $active={activeDateFilter === filter.id}
                onClick={() => handleDateFilterChange(filter.id)}
              >
                {filter.label}
              </S.FilterButton>
            ))}
          </S.FilterButtons>
        </S.FilterGroup>

        {showCustomDate && (
          <S.FilterGroup $fullWidth>
            <S.FilterLabel>Zakres dat</S.FilterLabel>
            <S.DateInputs>
              <S.DateInput
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                placeholder="Od"
              />
              <S.DateInput
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                placeholder="Do"
              />
            </S.DateInputs>
          </S.FilterGroup>
        )}
      </S.FiltersGrid>
    </S.FiltersContainer>
  );
};

export default Filters;
