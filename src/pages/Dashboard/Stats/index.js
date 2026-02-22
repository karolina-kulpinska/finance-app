import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  selectPayments,
  selectFilter,
  selectCategoryFilter,
  selectDateFilter,
} from "../../../features/payments/paymentSlice";
import { selectCurrency, formatAmount } from "../../../features/currency/currencySlice";
import { getDateRange, isDateInRange } from "../../../utils/dateFilters";
import { getDisplayCategory } from "../List/constants";
import * as S from "./styled";

const Stats = ({ payments: paymentsProp = null }) => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);
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

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const unpaidAmount = filteredPayments
    .filter((p) => !p.paid)
    .reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = filteredPayments
    .filter((p) => p.paid)
    .reduce((sum, p) => sum + p.amount, 0);
  const paymentsCount = filteredPayments.length;
  const unpaidCount = filteredPayments.filter((p) => !p.paid).length;

  const paidCountVal = paymentsCount - unpaidCount;
  const stats = [
    {
      id: 1,
      icon: "💰",
      label: t("stats.all"),
      value: `${totalAmount.toFixed(2)} zł`,
      subtext: t("stats.paymentsCount", { count: paymentsCount }),
      variant: "total",
      delay: "0s",
    },
    {
      id: 2,
      icon: "⏳",
      label: t("stats.toPay"),
      value: formatAmount(unpaidAmount, currency),
      subtext: t("stats.unpaidCount", { count: unpaidCount }),
      variant: "unpaid",
      delay: "0.1s",
    },
    {
      id: 3,
      icon: "✅",
      label: t("stats.paid"),
      value: formatAmount(paidAmount, currency),
      subtext: t("stats.paidCount", { count: paidCountVal }),
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
