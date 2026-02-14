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
          >
            <S.PaymentHeader>
              <S.PaymentInfo>
                <S.PaymentName $paid={payment.paid}>
                  {payment.name}
                </S.PaymentName>
                <S.PaymentCategory>
                  {getCategoryLabel(payment.category)}
                </S.PaymentCategory>
              </S.PaymentInfo>
              <S.PaymentAmount $paid={payment.paid}>
                {Number(payment.amount).toFixed(2)} zł
              </S.PaymentAmount>
            </S.PaymentHeader>

            <S.PaymentDetails>
              <S.DetailItem>
                <S.DetailLabel>Termin</S.DetailLabel>
                <S.DetailValue>{payment.date}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>Priorytet</S.DetailLabel>
                <S.PriorityBadge $priority={payment.priority}>
                  {getPriorityLabel(payment.priority)}
                </S.PriorityBadge>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>Status</S.DetailLabel>
                <S.DetailValue>
                  {payment.paid ? "✅ Zapłacone" : "⏳ Do zapłaty"}
                </S.DetailValue>
              </S.DetailItem>
            </S.PaymentDetails>

            {payment.notes && (
              <S.PaymentNotes>"{payment.notes}"</S.PaymentNotes>
            )}

            <S.PaymentActions>
              <S.ActionButton
                $variant="status"
                onClick={() => handleStatusToggle(payment)}
              >
                {payment.paid ? "↩️ Cofnij" : "✓ Oznacz jako zapłacone"}
              </S.ActionButton>
              <S.ActionButton
                $variant="edit"
                onClick={() => handleEdit(payment)}
              >
                ✏️ Edytuj
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
                  📎 {payment.attachmentName}
                </S.ActionButton>
              )}
              <S.ActionButton
                $variant="delete"
                onClick={() => handleDelete(payment.id)}
              >
                🗑️ Usuń
              </S.ActionButton>
            </S.PaymentActions>
          </S.PaymentCard>
        ))}
      </S.PaymentGrid>
    </S.ListContainer>
  );
};

export default PaymentsList;
