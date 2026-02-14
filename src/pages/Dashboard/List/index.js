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
import * as S from "./styled";

const PaymentsList = () => {
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const statusFilter = useSelector(selectFilter);
  const categoryFilter = useSelector(selectCategoryFilter);
  const dateFilter = useSelector(selectDateFilter);
  const [expandedPayment, setExpandedPayment] = React.useState(null);

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

    return filtered.sort((a, b) => {
      if (a.paid !== b.paid) return a.paid ? 1 : -1;
      return new Date(a.date) - new Date(b.date);
    });
  }, [payments, statusFilter, categoryFilter, dateFilter]);

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

  const getBankLabel = (bank) => {
    switch (bank) {
      case "revolut":
        return "🟣 Revolut";
      case "mbank":
        return "🔴 mBank";
      case "ing":
        return "🟠 ING";
      case "pko":
        return "🔵 PKO BP";
      case "millennium":
        return "⚫ Millennium";
      case "santander":
        return "🔴 Santander";
      case "cash":
        return "💵 Gotówka";
      default:
        return "💳 Inne";
    }
  };

  const handleStatusToggle = (payment) => {
    dispatch(
      updatePaymentStatusRequest({
        id: payment.id,
        currentStatus: payment.paid,
      })
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
      })
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

  return (
    <S.ListContainer>
      <S.ListHeader>
        <S.ListTitle>
          Płatności ({filteredPayments.length})
        </S.ListTitle>
      </S.ListHeader>

      <S.PaymentGrid>
        {filteredPayments.map((payment) => (
          <S.PaymentCard
            key={payment.id}
            id={`payment-${payment.id}`}
            $paid={payment.paid}
            $priority={payment.priority}
            $expanded={expandedPayment === payment.id}
            onClick={() => setExpandedPayment(expandedPayment === payment.id ? null : payment.id)}
          >
            <S.PaymentIcon>{getCategoryLabel(payment.category).split(' ')[0]}</S.PaymentIcon>
            <S.CompactInfo>
              <S.CompactName $paid={payment.paid}>{payment.name}</S.CompactName>
              <S.CompactAmount $paid={payment.paid}>
                {Number(payment.amount).toFixed(2)} zł
              </S.CompactAmount>
              <S.CompactDate>{payment.date}</S.CompactDate>
            </S.CompactInfo>

            {expandedPayment === payment.id && (
              <S.ExpandedDetails onClick={(e) => e.stopPropagation()}>
                <S.DetailRow>
                  <S.DetailLabel>Kategoria:</S.DetailLabel>
                  <S.DetailValue>{getCategoryLabel(payment.category)}</S.DetailValue>
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
                    <S.DetailValue>{getBankLabel(payment.bank)}</S.DetailValue>
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
                          payment.attachmentName
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
