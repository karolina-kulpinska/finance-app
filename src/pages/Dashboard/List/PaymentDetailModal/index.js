import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FaUniversity } from "react-icons/fa";
import { getBankConfig } from "../../../../utils/bankIcons";
import { getCategoryLabel, getDisplayCategory } from "../constants";
import { selectCurrency, formatAmount } from "../../../../features/currency/currencySlice";
import { isOverdue, getOverdueDays } from "../utils";
import * as S from "./styled";

export const PaymentDetailModal = ({
  payment,
  onClose,
  onStatusToggle,
  onEdit,
  onDelete,
  onDownload,
}) => {
  const { t, i18n } = useTranslation();
  const currency = useSelector(selectCurrency);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!payment) return null;

  const overdue = isOverdue(payment);
  const overdueDays = overdue ? getOverdueDays(payment) : 0;

  const renderBankIcon = () => {
    if (!payment.bank) return null;
    try {
      const config = getBankConfig(payment.bank);
      const IconComponent = config.icon || FaUniversity;
      return (
        <S.BankIconWrapper $color={config.color}>
          <IconComponent size={16} style={{ flexShrink: 0 }} />
          <span>{config.label}</span>
        </S.BankIconWrapper>
      );
    } catch {
      return <S.DetailValue>{payment.bank}</S.DetailValue>;
    }
  };

  return (
    <S.ModalOverlay onClick={onClose} role="dialog" aria-modal="true">
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>
            {overdue && (
              <S.OverdueWarning>
                ⚠️ {t("paymentCard.overdueDays", { days: overdueDays })}
              </S.OverdueWarning>
            )}
            {payment.name}
            {payment.isInstallment && (
              <S.InstallmentBadge>
                {t("paymentCard.installment")} {payment.installmentInfo.current}/{payment.installmentInfo.total}
              </S.InstallmentBadge>
            )}
            {payment.paymentType === "insurance" && payment.insuranceInfo && (
              <S.InstallmentBadge>
                {payment.insuranceInfo.current}/{payment.insuranceInfo.total}
              </S.InstallmentBadge>
            )}
            {payment.sharedWithFamily && <S.FamilyBadge>👨‍👩‍👧‍👦</S.FamilyBadge>}
          </S.ModalTitle>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          <S.AmountSection>
            <S.AmountLabel>{t("paymentCard.amount")}</S.AmountLabel>
            <S.AmountValue $paid={payment.paid}>
              {formatAmount(payment.amount, currency)}
            </S.AmountValue>
          </S.AmountSection>

          <S.DetailsGrid>
            <S.DetailRow>
              <S.DetailLabel>{t("paymentCard.paymentDate")}</S.DetailLabel>
              <S.DetailValue>{payment.date}</S.DetailValue>
            </S.DetailRow>

            <S.DetailRow>
              <S.DetailLabel>{t("paymentCard.category")}</S.DetailLabel>
              <S.DetailValue>{getCategoryLabel(getDisplayCategory(payment), t)}</S.DetailValue>
            </S.DetailRow>

            <S.DetailRow>
              <S.DetailLabel>{t("paymentCard.status")}</S.DetailLabel>
              <S.StatusBadge $paid={payment.paid}>
                {payment.paid ? `✅ ${t("filters.paid")}` : `⏳ ${t("filters.toPay")}`}
              </S.StatusBadge>
            </S.DetailRow>

            {payment.bank && i18n.language?.startsWith("pl") && (
              <S.DetailRow>
                <S.DetailLabel>{t("paymentCard.paymentMethod")}</S.DetailLabel>
                {renderBankIcon()}
              </S.DetailRow>
            )}

            {payment.paymentType && (
              <S.DetailRow>
                <S.DetailLabel>{t("paymentCard.paymentType")}</S.DetailLabel>
                <S.DetailValue>{payment.paymentType}</S.DetailValue>
              </S.DetailRow>
            )}

            {payment.notes && (
              <S.DetailRow $fullWidth>
                <S.DetailLabel>{t("paymentCard.notes")}</S.DetailLabel>
                <S.NotesText>"{payment.notes}"</S.NotesText>
              </S.DetailRow>
            )}
          </S.DetailsGrid>

          <S.ActionsSection>
            <S.ActionButton $variant="status" onClick={() => onStatusToggle(payment)}>
              {payment.paid ? `↩️ ${t("paymentCard.markAsUnpaid")}` : `✓ ${t("paymentCard.markAsPaid")}`}
            </S.ActionButton>
            <S.ActionButton $variant="edit" onClick={() => onEdit(payment)}>
              ✏️ {t("common.edit")}
            </S.ActionButton>
            {payment.attachmentUrl && (
              <S.ActionButton
                $variant="download"
                onClick={() => onDownload(payment.attachmentUrl, payment.attachmentName)}
              >
                📎 {t("paymentCard.downloadAttachment")}
              </S.ActionButton>
            )}
            <S.ActionButton $variant="delete" onClick={() => onDelete(payment.id)}>
              🗑️ {t("common.delete")}
            </S.ActionButton>
          </S.ActionsSection>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
