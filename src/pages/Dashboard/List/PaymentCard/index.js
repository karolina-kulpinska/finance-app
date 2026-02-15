import React from "react";
import { FaUniversity } from "react-icons/fa";
import { getBankConfig } from "../../../../utils/bankIcons";
import { getCategoryLabel, getPriorityLabel } from "../constants";
import { isOverdue, getOverdueDays } from "../utils";
import * as S from "./styled";

export const PaymentCard = ({
  payment,
  isExpanded,
  onCardClick,
  onStatusToggle,
  onEdit,
  onDelete,
  onDownload,
}) => {
  const overdue = isOverdue(payment);
  const overdueDays = overdue ? getOverdueDays(payment) : 0;

  const renderBankIcon = () => {
    if (!payment.bank) return null;
    try {
      const config = getBankConfig(payment.bank);
      const IconComponent = config.icon || FaUniversity;
      return (
        <S.BankIconWrapper $color={config.color}>
          <IconComponent size={14} style={{ flexShrink: 0 }} />
          <span>{config.label}</span>
        </S.BankIconWrapper>
      );
    } catch {
      return <S.DetailValue>{payment.bank}</S.DetailValue>;
    }
  };

  return (
    <S.Card
      id={`payment-${payment.id}`}
      $paid={payment.paid}
      $overdue={overdue}
      $priority={payment.priority}
      $expanded={isExpanded}
      onClick={() => onCardClick(payment.id)}
    >
      <S.PaymentIcon>
        {getCategoryLabel(payment.category).split(" ")[0]}
      </S.PaymentIcon>
      <S.CompactInfo>
        <S.CompactName $paid={payment.paid} $overdue={overdue}>
          {overdue && (
            <>
              ⚠️{" "}
              <b style={{ color: "#f5576c" }}>
                Po terminie: {overdueDays} dni
              </b>{" "}
              <br />
            </>
          )}
          {payment.name}
          {payment.isInstallment && (
            <S.InstallmentBadge>
              {payment.installmentInfo.current}/{payment.installmentInfo.total}
            </S.InstallmentBadge>
          )}
          {payment.sharedWithFamily && <S.FamilyBadge>👨‍👩‍👧‍👦</S.FamilyBadge>}
        </S.CompactName>
        <S.CompactAmount $paid={payment.paid} $expanded={isExpanded}>
          {Number(payment.amount).toFixed(2)} zł
        </S.CompactAmount>
        <S.CompactDate>{payment.date}</S.CompactDate>
      </S.CompactInfo>

      {isExpanded && (
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
              {renderBankIcon()}
            </S.DetailRow>
          )}

          {payment.notes && (
            <S.PaymentNotes>"{payment.notes}"</S.PaymentNotes>
          )}

          <S.PaymentActions>
            <S.ActionButton
              $variant="status"
              onClick={() => onStatusToggle(payment)}
            >
              {payment.paid ? "↩️" : "✓"}
            </S.ActionButton>
            <S.ActionButton $variant="edit" onClick={() => onEdit(payment)}>
              ✏️
            </S.ActionButton>
            {payment.attachmentUrl && (
              <S.ActionButton
                $variant="download"
                onClick={() =>
                  onDownload(payment.attachmentUrl, payment.attachmentName)
                }
              >
                📎
              </S.ActionButton>
            )}
            <S.ActionButton
              $variant="delete"
              onClick={() => onDelete(payment.id)}
            >
              🗑️
            </S.ActionButton>
          </S.PaymentActions>
        </S.ExpandedDetails>
      )}
    </S.Card>
  );
};
