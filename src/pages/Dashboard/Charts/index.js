import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPayments,
  selectFilter,
  selectCategoryFilter,
  selectDateFilter,
  setCategoryFilter,
} from "../../../features/payments/paymentSlice";
import { selectCurrency, formatAmount } from "../../../features/currency/currencySlice";
import { getDateRange, isDateInRange } from "../../../utils/dateFilters";
import { getDisplayCategory } from "../List/constants";
import * as S from "./styled";

const Charts = ({ onBeforeCategorySelect, payments: paymentsProp = null }) => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);
  const dispatch = useDispatch();
  const paymentsFromStore = useSelector(selectPayments);
  const payments = paymentsProp !== null ? paymentsProp : paymentsFromStore;
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
      filtered = filtered.filter((p) => getDisplayCategory(p) === categoryFilter);
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
      bills: { amount: 0, count: 0, icon: "🧾", nameKey: "charts.bills", color: "#3182ce" },
      shopping: { amount: 0, count: 0, icon: "🛒", nameKey: "charts.shopping", color: "#38a169" },
      other: { amount: 0, count: 0, icon: "📌", nameKey: "charts.other", color: "#718096" },
    };

    filteredPayments.forEach((payment) => {
      const category = getDisplayCategory(payment);
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
          <S.ChartsTitle>{t("charts.byCategory")}</S.ChartsTitle>
        </S.ChartsHeader>
        <S.EmptyChart>
          {t("charts.noData")}
        </S.EmptyChart>
      </S.ChartsContainer>
    );
  }

  return (
    <S.ChartsContainer>
      <S.ChartsHeader>
        <S.ChartsTitle>{t("charts.byCategory")}</S.ChartsTitle>
      </S.ChartsHeader>

      <S.ChartsGrid>
        {Object.entries(categoryStats).map(([key, stat]) => (
          <S.CategoryCard
            key={key}
            $color={stat.color}
            $active={categoryFilter === key}
            onClick={() => {
              if (categoryFilter === key) {
                dispatch(setCategoryFilter("all"));
              } else {
                onBeforeCategorySelect?.();
                dispatch(setCategoryFilter(key));
              }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (categoryFilter === key) {
                  dispatch(setCategoryFilter("all"));
                } else {
                  onBeforeCategorySelect?.();
                  dispatch(setCategoryFilter(key));
                }
              }
            }}
          >
            <S.CategoryIcon>{stat.icon}</S.CategoryIcon>
            <S.CategoryName>{t(stat.nameKey)}</S.CategoryName>
            <S.CategoryAmount $color={stat.color}>
              {formatAmount(stat.amount, currency)}
            </S.CategoryAmount>
            <S.CategoryCount>{t("charts.paymentsCount", { count: stat.count })}</S.CategoryCount>
          </S.CategoryCard>
        ))}
      </S.ChartsGrid>
    </S.ChartsContainer>
  );
};

export default Charts;
