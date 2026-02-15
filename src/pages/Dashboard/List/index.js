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
import { PaymentCard } from "./PaymentCard";
import * as S from "./styled";

const PaymentsList = ({
  collapseAll = false,
  minDate,
  maxDate,
  minAmount,
  maxAmount,
  sharedOnly = false,
}) => {
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const statusFilter = useSelector(selectFilter);
  const categoryFilter = useSelector(selectCategoryFilter);
  const dateFilter = useSelector(selectDateFilter);
  const [expandedPayment, setExpandedPayment] = React.useState(null);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (collapseAll) {
      setExpandedPayment(null);
    }
  }, [collapseAll]);

  const filteredPayments = useMemo(() => {
    let filtered = sharedOnly
      ? payments.filter((p) => p.sharedWithFamily === true)
      : [...payments];

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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdue = filtered.filter((p) => !p.paid && new Date(p.date) < today);
    const rest = filtered.filter((p) => p.paid || new Date(p.date) >= today);
    overdue.sort((a, b) => new Date(a.date) - new Date(b.date));
    rest.sort((a, b) => {
      if (a.paid !== b.paid) return a.paid ? 1 : -1;
      return new Date(a.date) - new Date(b.date);
    });
    return [...overdue, ...rest];
  }, [
    payments,
    statusFilter,
    categoryFilter,
    dateFilter,
    minDate,
    maxDate,
    minAmount,
    maxAmount,
    sharedOnly,
  ]);

  const handleCardClick = (paymentId) => {
    if (!collapsed) {
      setExpandedPayment(expandedPayment === paymentId ? null : paymentId);
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

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  if (!payments || payments.length === 0 || filteredPayments.length === 0) {
    return null;
  }

  return (
    <S.ListContainer>
      <S.ListHeader>
        <S.ListTitle>
          {sharedOnly
            ? `Płatności udostępnione rodzinie (${filteredPayments.length})`
            : `Wszystkie płatności (${filteredPayments.length})`}
        </S.ListTitle>
        <S.CollapseButton
          onClick={() => {
            setCollapsed(!collapsed);
            setExpandedPayment(null);
          }}
        >
          {collapsed ? "Rozwiń" : "Zwiń"}
        </S.CollapseButton>
      </S.ListHeader>
      <S.PaymentGrid>
        {!collapsed &&
          filteredPayments.map((payment) => (
            <PaymentCard
              key={payment.id}
              payment={payment}
              isExpanded={expandedPayment === payment.id}
              onCardClick={handleCardClick}
              onStatusToggle={handleStatusToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          ))}
      </S.PaymentGrid>
    </S.ListContainer>
  );
};

export default PaymentsList;
