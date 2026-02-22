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
import { getDisplayCategory } from "../List/constants";
import { getDateRange, isDateInRange } from "../../../utils/dateFilters";
import * as S from "./styled";

const MiniPayments = ({ onPaymentClick, payments: paymentsProp = null }) => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);
  const paymentsFromStore = useSelector(selectPayments);
  const payments = paymentsProp !== null ? paymentsProp : paymentsFromStore;
  const statusFilter = useSelector(selectFilter);
  const categoryFilter = useSelector(selectCategoryFilter);
  const dateFilter = useSelector(selectDateFilter);

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
        <S.SectionTitle>⏳ {t("miniPayments.toPay")}</S.SectionTitle>
        {upcomingPayments.length > 0 ? (
          <S.PaymentsList>
            {upcomingPayments.map((payment) => (
              <S.MiniPaymentCard key={payment.id} $paid={payment.paid} onClick={() => onPaymentClick(payment.id)}>
                <S.PaymentIcon>{getCategoryIcon(getDisplayCategory(payment))}</S.PaymentIcon>
                <S.PaymentInfo>
                  <S.PaymentName>
                    {payment.name}
                    {payment.sharedWithFamily && <S.FamilyBadge>👨‍👩‍👧‍👦</S.FamilyBadge>}
                  </S.PaymentName>
                  <S.PaymentDate>{payment.date}</S.PaymentDate>
                </S.PaymentInfo>
                <S.PaymentAmount $paid={payment.paid}>{formatAmount(payment.amount, currency)}</S.PaymentAmount>
              </S.MiniPaymentCard>
            ))}
          </S.PaymentsList>
        ) : (
          <S.EmptyMessage>{t("miniPayments.noToPay")}</S.EmptyMessage>
        )}
      </S.Section>

      <S.Section>
        <S.SectionTitle>✅ {t("miniPayments.recentlyPaid")}</S.SectionTitle>
        {recentPaidPayments.length > 0 ? (
          <S.PaymentsList>
            {recentPaidPayments.map((payment) => (
              <S.MiniPaymentCard key={payment.id} $paid={payment.paid} onClick={() => onPaymentClick(payment.id)}>
                <S.PaymentIcon>{getCategoryIcon(getDisplayCategory(payment))}</S.PaymentIcon>
                <S.PaymentInfo>
                  <S.PaymentName>
                    {payment.name}
                    {payment.sharedWithFamily && <S.FamilyBadge>👨‍👩‍👧‍👦</S.FamilyBadge>}
                  </S.PaymentName>
                  <S.PaymentDate>{payment.date}</S.PaymentDate>
                </S.PaymentInfo>
                <S.PaymentAmount $paid={payment.paid}>{formatAmount(payment.amount, currency)}</S.PaymentAmount>
              </S.MiniPaymentCard>
            ))}
          </S.PaymentsList>
        ) : (
          <S.EmptyMessage>{t("miniPayments.noRecent")}</S.EmptyMessage>
        )}
      </S.Section>
    </S.MiniPaymentsContainer>
  );
};

export default MiniPayments;
