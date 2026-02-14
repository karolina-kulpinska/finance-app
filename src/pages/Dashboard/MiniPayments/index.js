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

const MiniPayments = ({ onPaymentClick }) => {
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

  const upcomingPayments = filteredPayments
    .filter((p) => !p.paid)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const recentPaidPayments = filteredPayments
    .filter((p) => p.paid)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "bills":
        return "🧾";
      case "shopping":
        return "🛒";
      default:
        return "📌";
    }
  };

  return (
    <S.MiniPaymentsContainer>
      <S.Section>
        <S.SectionTitle>⏳ Do zapłaty</S.SectionTitle>
        {upcomingPayments.length > 0 ? (
          <S.PaymentsList>
            {upcomingPayments.map((payment) => (
              <S.MiniPaymentCard key={payment.id} onClick={() => onPaymentClick(payment.id)}>
                <S.PaymentIcon>{getCategoryIcon(payment.category)}</S.PaymentIcon>
                <S.PaymentInfo>
                  <S.PaymentName>{payment.name}</S.PaymentName>
                  <S.PaymentDate>{payment.date}</S.PaymentDate>
                </S.PaymentInfo>
                <S.PaymentAmount>{payment.amount.toFixed(2)} zł</S.PaymentAmount>
              </S.MiniPaymentCard>
            ))}
          </S.PaymentsList>
        ) : (
          <S.EmptyMessage>Brak płatności do zapłaty</S.EmptyMessage>
        )}
      </S.Section>

      <S.Section>
        <S.SectionTitle>✅ Ostatnio zapłacone</S.SectionTitle>
        {recentPaidPayments.length > 0 ? (
          <S.PaymentsList>
            {recentPaidPayments.map((payment) => (
              <S.MiniPaymentCard key={payment.id} onClick={() => onPaymentClick(payment.id)}>
                <S.PaymentIcon>{getCategoryIcon(payment.category)}</S.PaymentIcon>
                <S.PaymentInfo>
                  <S.PaymentName>{payment.name}</S.PaymentName>
                  <S.PaymentDate>{payment.date}</S.PaymentDate>
                </S.PaymentInfo>
                <S.PaymentAmount>{payment.amount.toFixed(2)} zł</S.PaymentAmount>
              </S.MiniPaymentCard>
            ))}
          </S.PaymentsList>
        ) : (
          <S.EmptyMessage>Brak ostatnio zapłaconych</S.EmptyMessage>
        )}
      </S.Section>
    </S.MiniPaymentsContainer>
  );
};

export default MiniPayments;
