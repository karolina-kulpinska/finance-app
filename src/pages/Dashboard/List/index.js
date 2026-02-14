import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPayments,
  selectFilter,
  selectCategoryFilter,
  selectDateFilter,
  updatePaymentStatusRequest,
  openEditModal,
} from "../../../features/payments/paymentSlice";
import { showConfirm } from "../../../features/notification/confirmSlice";
import { getDateRange, isDateInRange } from "../../../utils/dateFilters";
import { getBankConfig } from "../../../utils/bankIcons";
import { FaUniversity } from "react-icons/fa";
import * as S from "./styled";

const PaymentsList = ({
  collapseAll = false,
  minDate,
  maxDate,
  minAmount,
  maxAmount,
}) => {
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const statusFilter = useSelector(selectFilter);
  const categoryFilter = useSelector(selectCategoryFilter);
  const dateFilter = useSelector(selectDateFilter);
  const [expandedPayment, setExpandedPayment] = React.useState(null);

  // Jeśli collapseAll jest true, zamknij wszystkie
  React.useEffect(() => {
    if (collapseAll) {
      setExpandedPayment(null);
    }
  }, [collapseAll]);

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

    // Nowe filtry: minDate, maxDate, minAmount, maxAmount
    if (minDate) {
      filtered = filtered.filter((p) => new Date(p.date) >= new Date(minDate));
    }
    if (maxDate) {
      filtered = filtered.filter((p) => new Date(p.date) <= new Date(maxDate));
    }
    if (minAmount) {
      filtered = filtered.filter((p) => Number(p.amount) >= Number(minAmount));
    }
    if (maxAmount) {
      filtered = filtered.filter((p) => Number(p.amount) <= Number(maxAmount));
    }

    return filtered.sort((a, b) => {
      if (a.paid !== b.paid) return a.paid ? 1 : -1;
      return new Date(a.date) - new Date(b.date);
    });
  }, [
    payments,
    statusFilter,
    categoryFilter,
    dateFilter,
    minDate,
    maxDate,
    minAmount,
    maxAmount,
  ]);

  const getCategoryLabel = (category) => {
    switch (category) {
      case "bills":
        return "🧾 Rachunki";
      case "shopping":
        return "🛒 Zakupy";
      default:
        return "📌 Inne";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "Wysoki";
      case "low":
        return "Niski";
      default:
        return "Normalny";
    }
  };

  const renderBankIcon = (bank) => {
    if (!bank) return null;
    try {
      const config = getBankConfig(bank);
      const IconComponent = config.icon || FaUniversity;
      return (
        <S.BankIconWrapper $color={config.color}>
          <IconComponent size={14} style={{ flexShrink: 0 }} />
          <span>{config.label}</span>
        </S.BankIconWrapper>
      );
    } catch (error) {
      console.error("Error rendering bank icon:", error);
      return <S.DetailValue>{bank}</S.DetailValue>;
    }
  };

  const isOverdue = (payment) => {
    if (payment.paid) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const paymentDate = new Date(payment.date);
    paymentDate.setHours(0, 0, 0, 0);
    return paymentDate < today;
  };

  const handleStatusToggle = (payment) => {
    dispatch(
      updatePaymentStatusRequest({
        id: payment.id,
        currentStatus: payment.paid,
      }),
    );
  };

  const handleEdit = (payment) => {
    dispatch(openEditModal(payment));
  };

  const handleDelete = (paymentId) => {
    dispatch(
      showConfirm({
        message: "Czy na pewno chcesz usunąć tę płatność?",
        paymentId,
      }),
    );
  };

  const handleDownload = (url, name) => {
    window.open(url, "_blank");
  };

  if (!payments || payments.length === 0) {
    return (
      <S.ListContainer>
        <S.EmptyState>
          <S.EmptyIcon>📋</S.EmptyIcon>
          <S.EmptyTitle>Brak płatności</S.EmptyTitle>
          <S.EmptyText>
            Dodaj swoją pierwszą płatność, aby rozpocząć zarządzanie budżetem
          </S.EmptyText>
        </S.EmptyState>
      </S.ListContainer>
    );
  }

  if (filteredPayments.length === 0) {
    return (
      <S.ListContainer>
        <S.EmptyState>
          <S.EmptyIcon>🔍</S.EmptyIcon>
          <S.EmptyTitle>Brak wyników</S.EmptyTitle>
          <S.EmptyText>
            Nie znaleziono płatności spełniających wybrane filtry
          </S.EmptyText>
        </S.EmptyState>
      </S.ListContainer>
    );
  }

  // Jeśli collapseAll jest true, nie pozwól rozwijać
  const handleCardClick = (paymentId) => {
    if (!collapseAll) {
      setExpandedPayment(expandedPayment === paymentId ? null : paymentId);
    }
  };

  return (
    <S.ListContainer>
      <S.PaymentGrid>
        {filteredPayments.map((payment) => (
          <S.PaymentCard
            key={payment.id}
            id={`payment-${payment.id}`}
            $paid={payment.paid}
            $overdue={isOverdue(payment)}
            $priority={payment.priority}
            $expanded={!collapseAll && expandedPayment === payment.id}
            onClick={() => handleCardClick(payment.id)}
          >
            <S.PaymentIcon>
              {getCategoryLabel(payment.category).split(" ")[0]}
            </S.PaymentIcon>
            <S.CompactInfo>
              <S.CompactName $paid={payment.paid} $overdue={isOverdue(payment)}>
                {isOverdue(payment) && "⚠️ "}
                {payment.name}
                {payment.isInstallment && (
                  <S.InstallmentBadge>
                    {payment.installmentInfo.current}/
                    {payment.installmentInfo.total}
                  </S.InstallmentBadge>
                )}
              </S.CompactName>
              <S.CompactAmount
                $paid={payment.paid}
                $expanded={
                  expandedPayment === "ALL" ||
                  (!collapseAll && expandedPayment === payment.id)
                }
              >
                {Number(payment.amount).toFixed(2)} zł
              </S.CompactAmount>
              <S.CompactDate>{payment.date}</S.CompactDate>
            </S.CompactInfo>

            {!collapseAll && expandedPayment === payment.id && (
              <S.ExpandedDetails
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <S.DetailRow>
                  <S.DetailLabel>Kategoria:</S.DetailLabel>
                  <S.DetailValue>
                    {getCategoryLabel(payment.category)}
                  </S.DetailValue>
                </S.DetailRow>
                <S.DetailRow>
                  <S.DetailLabel>Priorytet:</S.DetailLabel>
                  <S.PriorityBadge $priority={payment.priority}>
                    {getPriorityLabel(payment.priority)}
                  </S.PriorityBadge>
                </S.DetailRow>
                <S.DetailRow>
                  <S.DetailLabel>Status:</S.DetailLabel>
                  <S.DetailValue>
                    {payment.paid ? "✅ Zapłacone" : "⏳ Do zapłaty"}
                  </S.DetailValue>
                </S.DetailRow>
                {payment.bank && (
                  <S.DetailRow>
                    <S.DetailLabel>Płatność:</S.DetailLabel>
                    {renderBankIcon(payment.bank)}
                  </S.DetailRow>
                )}

                {payment.notes && (
                  <S.PaymentNotes>"{payment.notes}"</S.PaymentNotes>
                )}

                <S.PaymentActions>
                  <S.ActionButton
                    $variant="status"
                    onClick={() => handleStatusToggle(payment)}
                  >
                    {payment.paid ? "↩️" : "✓"}
                  </S.ActionButton>
                  <S.ActionButton
                    $variant="edit"
                    onClick={() => handleEdit(payment)}
                  >
                    ✏️
                  </S.ActionButton>
                  {payment.attachmentUrl && (
                    <S.ActionButton
                      $variant="download"
                      onClick={() =>
                        handleDownload(
                          payment.attachmentUrl,
                          payment.attachmentName,
                        )
                      }
                    >
                      📎
                    </S.ActionButton>
                  )}
                  <S.ActionButton
                    $variant="delete"
                    onClick={() => handleDelete(payment.id)}
                  >
                    🗑️
                  </S.ActionButton>
                </S.PaymentActions>
              </S.ExpandedDetails>
            )}
          </S.PaymentCard>
        ))}
      </S.PaymentGrid>
    </S.ListContainer>
  );
};

export default PaymentsList;
