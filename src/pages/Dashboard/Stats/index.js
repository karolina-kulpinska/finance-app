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

const Stats = () => {
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

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const unpaidAmount = filteredPayments
    .filter((p) => !p.paid)
    .reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = filteredPayments
    .filter((p) => p.paid)
    .reduce((sum, p) => sum + p.amount, 0);
  const paymentsCount = filteredPayments.length;
  const unpaidCount = filteredPayments.filter((p) => !p.paid).length;

  const stats = [
    {
      id: 1,
      icon: "💰",
      label: "Wszystkie",
      value: `${totalAmount.toFixed(2)} zł`,
      subtext: `${paymentsCount} płatności`,
      variant: "total",
      delay: "0s",
    },
    {
      id: 2,
      icon: "⏳",
      label: "Do zapłaty",
      value: `${unpaidAmount.toFixed(2)} zł`,
      subtext: `${unpaidCount} niezapłaconych`,
      variant: "unpaid",
      delay: "0.1s",
    },
    {
      id: 3,
      icon: "✅",
      label: "Zapłacone",
      value: `${paidAmount.toFixed(2)} zł`,
      subtext: `${paymentsCount - unpaidCount} opłaconych`,
      variant: "paid",
      delay: "0.2s",
    },
  ];

  return (
    <S.StatsGrid>
      {stats.map((stat) => (
        <S.StatCard key={stat.id} $variant={stat.variant} $delay={stat.delay}>
          <S.StatLabel $variant={stat.variant}>{stat.label}</S.StatLabel>
          <S.StatValue $variant={stat.variant}>{stat.value}</S.StatValue>
          <S.StatSubtext $variant={stat.variant}>{stat.subtext}</S.StatSubtext>
        </S.StatCard>
      ))}
    </S.StatsGrid>
  );
};

export default Stats;
