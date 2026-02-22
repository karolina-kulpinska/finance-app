import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FaUniversity } from "react-icons/fa";
import { getBankConfig } from "../../../../utils/bankIcons";
import { getCategoryLabel, getPriorityLabel } from "../constants";
import { selectCurrency, formatAmount } from "../../../../features/currency/currencySlice";
import { isOverdue, getOverdueDays } from "../utils";
import * as S from "./styled";

export const PaymentCard = ({
  payment,
  isExpanded,
  selected,
  onSelect,
  onCardClick,
  onStatusToggle,
  onEdit,
  onDelete,
  onDownload,
}) => {
  const { t } = useTranslation();
  const currency = useSelector(selectCurrency);
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
      {onSelect && (
        <S.CardCheckboxWrapper onClick={(e) => e.stopPropagation()}>
          <S.CardCheckbox
            type="checkbox"
            checked={!!selected}
            onChange={() => onSelect()}
            aria-label={t("paymentCard.selectLabel", { name: payment.name })}
          />
        </S.CardCheckboxWrapper>
      )}
      <S.PaymentIcon>
        {getCategoryLabel(payment.category, t).split(" ")[0]}
      </S.PaymentIcon>
      <S.CompactInfo>
        <S.CompactName $paid={payment.paid} $overdue={overdue}>
          {overdue && (
            <>
              ⚠️{" "}
              <b style={{ color: "#c53030" }}>
                {t("paymentCard.overdueDays", { days: overdueDays })}
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
          {formatAmount(payment.amount, currency)}
        </S.CompactAmount>
        <S.CompactDate>{payment.date}</S.CompactDate>
      </S.CompactInfo>

      {isExpanded && (
        <S.ExpandedDetails onClick={(e) => e.stopPropagation()}>
          <S.DetailRow>
            <S.DetailLabel>{t("paymentCard.category")}</S.DetailLabel>
            <S.DetailValue>{getCategoryLabel(payment.category, t)}</S.DetailValue>
          </S.DetailRow>
          <S.DetailRow>
            <S.DetailLabel>{t("paymentCard.priority")}</S.DetailLabel>
            <S.PriorityBadge $priority={payment.priority}>
              {getPriorityLabel(payment.priority, t)}
            </S.PriorityBadge>
          </S.DetailRow>
          <S.DetailRow>
            <S.DetailLabel>{t("paymentCard.status")}</S.DetailLabel>
            <S.DetailValue>
              {payment.paid ? `✅ ${t("filters.paid")}` : `⏳ ${t("filters.toPay")}`}
            </S.DetailValue>
          </S.DetailRow>
          {payment.bank && (
            <S.DetailRow>
              <S.DetailLabel>{t("paymentCard.payment")}</S.DetailLabel>
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
