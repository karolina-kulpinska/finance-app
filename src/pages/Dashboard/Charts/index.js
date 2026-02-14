import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectPayments,
  selectFilter,
  selectCategoryFilter,
  selectDateFilter,
} from "../../../features/payments/paymentSlice";
import { getDateRange, isDateInRange } from "../../../utils/dateFilters";
import * as S from "./styled";

const Charts = () => {
  const payments = useSelector(selectPayments);
  const statusFilter = useSelector(selectFilter);
  const categoryFilter = useSelector(selectCategoryFilter);
  const dateFilter = useSelector(selectDateFilter);

  // Filtrowanie płatności
  const filteredPayments = useMemo(() => {
    let filtered = [...payments];

    if (statusFilter === "paid") {
      filtered = filtered.filter((p) => p.paid);
    } else if (statusFilter === "unpaid") {
      filtered = filtered.filter((p) => !p.paid);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    if (dateFilter !== "all") {
      const dateRange = getDateRange(dateFilter);
      if (dateRange) {
        filtered = filtered.filter((p) => isDateInRange(p.date, dateRange));
      }
    }

    return filtered;
  }, [payments, statusFilter, categoryFilter, dateFilter]);

  const categoryStats = useMemo(() => {
    const stats = {
      bills: { amount: 0, count: 0, icon: "🧾", name: "Rachunki", color: "#667eea" },
      shopping: { amount: 0, count: 0, icon: "🛒", name: "Zakupy", color: "#43e97b" },
      other: { amount: 0, count: 0, icon: "📌", name: "Inne", color: "#f093fb" },
    };

    filteredPayments.forEach((payment) => {
      const category = payment.category || "other";
      if (stats[category]) {
        stats[category].amount += payment.amount;
        stats[category].count += 1;
      }
    });

    return stats;
  }, [filteredPayments]);

  const hasData = Object.values(categoryStats).some((stat) => stat.count > 0);

  if (!hasData) {
    return (
      <S.ChartsContainer>
        <S.ChartsHeader>
          <S.ChartsTitle>Zestawienie wg kategorii</S.ChartsTitle>
        </S.ChartsHeader>
        <S.EmptyChart>
          Brak danych do wyświetlenia. Dodaj płatności, aby zobaczyć zestawienie.
        </S.EmptyChart>
      </S.ChartsContainer>
    );
  }

  return (
    <S.ChartsContainer>
      <S.ChartsHeader>
        <S.ChartsTitle>Zestawienie wg kategorii</S.ChartsTitle>
      </S.ChartsHeader>

      <S.ChartsGrid>
        {Object.entries(categoryStats).map(([key, stat]) => (
          <S.CategoryCard key={key} $color={stat.color}>
            <S.CategoryIcon>{stat.icon}</S.CategoryIcon>
            <S.CategoryName>{stat.name}</S.CategoryName>
            <S.CategoryAmount $color={stat.color}>
              {stat.amount.toFixed(2)} zł
            </S.CategoryAmount>
            <S.CategoryCount>{stat.count} płatności</S.CategoryCount>
          </S.CategoryCard>
        ))}
      </S.ChartsGrid>
    </S.ChartsContainer>
  );
};

export default Charts;
