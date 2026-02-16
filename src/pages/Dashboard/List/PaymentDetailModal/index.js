import React, { useEffect } from "react";
import { FaUniversity } from "react-icons/fa";
import { getBankConfig } from "../../../../utils/bankIcons";
import { getCategoryLabel, getPriorityLabel } from "../constants";
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
                ⚠️ Po terminie: {overdueDays} dni
              </S.OverdueWarning>
            )}
            {payment.name}
            {payment.isInstallment && (
              <S.InstallmentBadge>
                Rata {payment.installmentInfo.current}/{payment.installmentInfo.total}
              </S.InstallmentBadge>
            )}
            {payment.sharedWithFamily && <S.FamilyBadge>👨‍👩‍👧‍👦</S.FamilyBadge>}
          </S.ModalTitle>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          <S.AmountSection>
            <S.AmountLabel>Kwota</S.AmountLabel>
            <S.AmountValue $paid={payment.paid}>
              {Number(payment.amount).toFixed(2)} zł
            </S.AmountValue>
          </S.AmountSection>

          <S.DetailsGrid>
            <S.DetailRow>
              <S.DetailLabel>Data płatności:</S.DetailLabel>
              <S.DetailValue>{payment.date}</S.DetailValue>
            </S.DetailRow>

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
              <S.StatusBadge $paid={payment.paid}>
                {payment.paid ? "✅ Zapłacone" : "⏳ Do zapłaty"}
              </S.StatusBadge>
            </S.DetailRow>

            {payment.bank && (
              <S.DetailRow>
                <S.DetailLabel>Metoda płatności:</S.DetailLabel>
                {renderBankIcon()}
              </S.DetailRow>
            )}

            {payment.paymentType && (
              <S.DetailRow>
                <S.DetailLabel>Typ płatności:</S.DetailLabel>
                <S.DetailValue>{payment.paymentType}</S.DetailValue>
              </S.DetailRow>
            )}

            {payment.notes && (
              <S.DetailRow $fullWidth>
                <S.DetailLabel>Notatki:</S.DetailLabel>
                <S.NotesText>"{payment.notes}"</S.NotesText>
              </S.DetailRow>
            )}
          </S.DetailsGrid>

          <S.ActionsSection>
            <S.ActionButton $variant="status" onClick={() => onStatusToggle(payment)}>
              {payment.paid ? "↩️ Oznacz jako niezapłacone" : "✓ Oznacz jako zapłacone"}
            </S.ActionButton>
            <S.ActionButton $variant="edit" onClick={() => onEdit(payment)}>
              ✏️ Edytuj
            </S.ActionButton>
            {payment.attachmentUrl && (
              <S.ActionButton
                $variant="download"
                onClick={() => onDownload(payment.attachmentUrl, payment.attachmentName)}
              >
                📎 Pobierz załącznik
              </S.ActionButton>
            )}
            <S.ActionButton $variant="delete" onClick={() => onDelete(payment.id)}>
              🗑️ Usuń
            </S.ActionButton>
          </S.ActionsSection>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
