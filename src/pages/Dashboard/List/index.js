import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPayments,
  selectFilter,
  selectCategoryFilter,
  selectDateFilter,
  updatePaymentStatusRequest,
  openEditModal,
  deletePaymentRequest,
} from "../../../features/payments/paymentSlice";
import { showConfirm } from "../../../features/notification/confirmSlice";
import { getDateRange, isDateInRange } from "../../../utils/dateFilters";
import { getDisplayCategory } from "./constants";
import { PaymentCard } from "./PaymentCard";
import { PaymentDetailModal } from "./PaymentDetailModal";
import { SeriesEditChoiceModal } from "../../../components/InsuranceEditChoiceModal";
import * as S from "./styled";

const getRelatedSeriesPayments = (payment, allPayments) => {
  if (!payment || !allPayments?.length) return [payment];
  if (payment.paymentType === "insurance") {
    const groupId = payment.insuranceInfo?.groupId;
    if (groupId) {
      return allPayments
        .filter((p) => p.paymentType === "insurance" && p.insuranceInfo?.groupId === groupId)
        .sort((a, b) => (a.insuranceInfo?.current || 0) - (b.insuranceInfo?.current || 0));
    }
    const match = payment.name?.match(/^(.+)\s+\((\d+)\/(\d+)\)$/);
    if (!match) return [payment];
    const [, baseName, , total] = match;
    const totalNum = parseInt(total, 10);
    return allPayments
      .filter((p) => {
        if (p.paymentType !== "insurance") return false;
        const m = p.name?.match(/^(.+)\s+\((\d+)\/(\d+)\)$/);
        return m && m[1] === baseName && parseInt(m[3], 10) === totalNum;
      })
      .sort((a, b) => (a.insuranceInfo?.current || 0) - (b.insuranceInfo?.current || 0));
  }
  if (payment.paymentType === "installments" && payment.installmentInfo) {
    const orig = payment.installmentInfo.originalName;
    const tot = payment.installmentInfo.total;
    return allPayments
      .filter(
        (p) =>
          p.paymentType === "installments" &&
          p.installmentInfo?.originalName === orig &&
          p.installmentInfo?.total === tot
      )
      .sort((a, b) => (a.installmentInfo?.current || 0) - (b.installmentInfo?.current || 0));
  }
  const match = payment.name?.match(/^(.+)\s+\(Rata\s+(\d+)\/(\d+)\)$/);
  if (!match) return [payment];
  const [, baseName, , total] = match;
  const totalNum = parseInt(total, 10);
  return allPayments
    .filter((p) => {
      if (p.paymentType !== "installments") return false;
      const m = p.name?.match(/^(.+)\s+\(Rata\s+(\d+)\/(\d+)\)$/);
      return m && m[1] === baseName && parseInt(m[3], 10) === totalNum;
    })
    .sort((a, b) => (a.installmentInfo?.current || 0) - (b.installmentInfo?.current || 0));
};

const PaymentsList = ({
  collapseAll = false,
  minDate,
  maxDate,
  minAmount,
  maxAmount,
  searchName = "",
  sharedOnly = false,
  payments: paymentsProp = null,
  dateFilterOverride = null,
  isDemo = false,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const paymentsFromStore = useSelector(selectPayments);
  const payments = paymentsProp !== null ? paymentsProp : paymentsFromStore;
  const statusFilter = useSelector(selectFilter);
  const categoryFilter = useSelector(selectCategoryFilter);
  const reduxDateFilter = useSelector(selectDateFilter);
  const dateFilter = dateFilterOverride !== null ? dateFilterOverride : reduxDateFilter;
  const [expandedPayment, setExpandedPayment] = React.useState(null);
  const [collapsed, setCollapsed] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = React.useState(false);
  const [selectedPayment, setSelectedPayment] = React.useState(null);
  const [insuranceEditChoicePayment, setInsuranceEditChoicePayment] = React.useState(null);

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
      filtered = filtered.filter((p) => getDisplayCategory(p) === categoryFilter);
    }

    if (dateFilter === "overdue") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filtered = filtered.filter((p) => !p.paid && p.date && new Date(p.date) < today);
    } else if (dateFilter === "monthOrOverdue") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const monthRange = getDateRange("month");
      filtered = filtered.filter((p) => {
        if (!p.date) return false;
        const paymentDate = new Date(p.date);
        const isOverdue = !p.paid && paymentDate < today;
        const isInMonth = monthRange && isDateInRange(p.date, monthRange);
        return isInMonth || isOverdue;
      });
    } else if (minDate || maxDate) {
      if (minDate) {
        const minDateStr = minDate.split("T")[0];
        filtered = filtered.filter((p) => {
          if (!p.date) return false;
          const paymentDateStr = p.date.split("T")[0];
          return paymentDateStr >= minDateStr;
        });
      }
      if (maxDate) {
        const maxDateStr = maxDate.split("T")[0];
        filtered = filtered.filter((p) => {
          if (!p.date) return false;
          const paymentDateStr = p.date.split("T")[0];
          return paymentDateStr <= maxDateStr;
        });
      }
    } else if (dateFilter !== "all") {
      const dateRange = getDateRange(dateFilter);
      if (dateRange) {
        filtered = filtered.filter((p) => isDateInRange(p.date, dateRange));
      }
    }
    const parseAmount = (v) => {
      if (v == null || v === "") return NaN;
      const s = String(v).trim().replace(",", ".");
      const n = parseFloat(s);
      return Number.isFinite(n) ? n : NaN;
    };
    if (minAmount) {
      const min = parseAmount(minAmount);
      if (!Number.isNaN(min)) {
        filtered = filtered.filter((p) => {
          const amt = parseAmount(p.amount);
          return !Number.isNaN(amt) && amt >= min;
        });
      }
    }
    if (maxAmount) {
      const max = parseAmount(maxAmount);
      if (!Number.isNaN(max)) {
        filtered = filtered.filter((p) => {
          const amt = parseAmount(p.amount);
          return !Number.isNaN(amt) && amt <= max;
        });
      }
    }

    if (searchName && searchName.trim()) {
      const searchLower = searchName.toLowerCase().trim();
      filtered = filtered.filter((p) =>
        p.name?.toLowerCase().includes(searchLower)
      );
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
    searchName,
    sharedOnly,
  ]);

  const handleCardClick = (paymentId) => {
    if (!collapsed) {
      const payment = filteredPayments.find((p) => p.id === paymentId);
      if (payment) {
        setSelectedPayment(payment);
      }
    }
  };

  const handleEdit = (payment) => {
    const isSeries =
      (payment?.paymentType === "installments" && payment.installmentInfo?.total > 1) ||
      (payment?.paymentType === "insurance" && (payment.insuranceInfo || /\(\d+\/\d+\)$/.test(payment.name || "")));
    if (isSeries) {
      setSelectedPayment(null);
      setInsuranceEditChoicePayment(payment);
      return;
    }
    setSelectedPayment(null);
    dispatch(openEditModal(payment));
  };

  const handleSeriesEditChoose = (scope) => {
    if (!insuranceEditChoicePayment) return;
    const payload = { ...insuranceEditChoicePayment, _editScope: scope };
    dispatch(openEditModal(payload));
    setInsuranceEditChoicePayment(null);
  };

  const handleDelete = (paymentId) => {
    setSelectedPayment(null);
    dispatch(
      showConfirm({
        message: t("list.deletePaymentConfirm"),
        paymentId,
      })
    );
  };

  const handleStatusToggle = (payment) => {
    setSelectedPayment(null);
    dispatch(
      updatePaymentStatusRequest({
        id: payment.id,
        currentStatus: payment.paid,
      })
    );
  };

  const handleCloseModal = () => {
    setSelectedPayment(null);
  };

  const allFilteredSelected =
    filteredPayments.length > 0 &&
    selectedIds.length === filteredPayments.length;
  const handleSelectAll = () => {
    if (allFilteredSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredPayments.map((p) => p.id));
    }
  };

  const handleToggleSelect = (paymentId) => {
    setSelectedIds((prev) =>
      prev.includes(paymentId)
        ? prev.filter((id) => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handleBulkDeleteConfirm = () => {
    selectedIds.forEach((id) => dispatch(deletePaymentRequest(id)));
    setSelectedIds([]);
    setShowBulkDeleteConfirm(false);
  };

  const handleDownload = (url, filename) => {
    window.open(url, "_blank");
  };

  if (!payments || payments.length === 0) {
    return null;
  }

  return (
    <S.ListContainer>
      {showBulkDeleteConfirm && (
        <S.ConfirmOverlay
          onClick={() => setShowBulkDeleteConfirm(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="bulk-delete-title"
        >
          <S.ConfirmModalBox onClick={(e) => e.stopPropagation()}>
            <S.ConfirmTitle id="bulk-delete-title">
              {t("list.deleteSelected")}
            </S.ConfirmTitle>
            <S.ConfirmMessage>
              {t("list.deleteConfirm", { count: selectedIds.length })}
            </S.ConfirmMessage>
            <S.ConfirmButtonGroup>
              <S.ConfirmCancelBtn onClick={() => setShowBulkDeleteConfirm(false)}>
                {t("common.cancel")}
              </S.ConfirmCancelBtn>
              <S.ConfirmDeleteBtn onClick={handleBulkDeleteConfirm}>
                {t("list.deleteCount", { count: selectedIds.length })}
              </S.ConfirmDeleteBtn>
            </S.ConfirmButtonGroup>
          </S.ConfirmModalBox>
        </S.ConfirmOverlay>
      )}
      <S.ListHeader>
        <S.TitleRow>
          <S.ListTitle>
            {sharedOnly
              ? t("list.sharedPayments", { count: filteredPayments.length })
              : t("list.allPayments", { count: filteredPayments.length })}
          </S.ListTitle>
          <S.CollapseButton
            onClick={() => {
              setCollapsed(!collapsed);
              setExpandedPayment(null);
            }}
          >
            {collapsed ? t("list.expand") : t("list.collapse")}
          </S.CollapseButton>
        </S.TitleRow>
        <S.HeaderActions>
          {filteredPayments.length > 0 && (
            <S.SelectAllWrapper onClick={(e) => e.stopPropagation()}>
              <S.SelectAllCheckbox
                type="checkbox"
                checked={allFilteredSelected}
                onChange={handleSelectAll}
                id="select-all-payments"
              />
              <S.SelectAllLabel htmlFor="select-all-payments">
                {t("list.selectAll")}
              </S.SelectAllLabel>
            </S.SelectAllWrapper>
          )}
          {selectedIds.length > 0 && (
            <S.BulkDeleteButton
              type="button"
              onClick={() => setShowBulkDeleteConfirm(true)}
            >
              🗑️ {t("list.deleteSelected")} ({selectedIds.length})
            </S.BulkDeleteButton>
          )}
        </S.HeaderActions>
      </S.ListHeader>
      <S.PaymentGrid>
        {!collapsed &&
          filteredPayments.map((payment) => (
            <PaymentCard
              key={payment.id}
              payment={payment}
              isExpanded={expandedPayment === payment.id}
              selected={selectedIds.includes(payment.id)}
              onSelect={() => handleToggleSelect(payment.id)}
              onCardClick={handleCardClick}
              onStatusToggle={handleStatusToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          ))}
      </S.PaymentGrid>
      {selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          onClose={handleCloseModal}
          onStatusToggle={handleStatusToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDownload={handleDownload}
        />
      )}
      {insuranceEditChoicePayment && (
        <SeriesEditChoiceModal
          payment={insuranceEditChoicePayment}
          relatedPayments={getRelatedSeriesPayments(insuranceEditChoicePayment, payments)}
          onChoose={handleSeriesEditChoose}
          onClose={() => setInsuranceEditChoicePayment(null)}
        />
      )}
    </S.ListContainer>
  );
};

export default PaymentsList;
