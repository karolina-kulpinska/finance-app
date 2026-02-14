import React from "react";
import * as S from "./styled";

const MiniPayments = ({ payments, onPaymentClick }) => {
  const upcomingPayments = payments
    .filter((p) => !p.paid)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const recentPaidPayments = payments
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
        <S.SectionTitle>⏳ Do zapłaty</S.SectionTitle>
        {upcomingPayments.length > 0 ? (
          <S.PaymentsList>
            {upcomingPayments.map((payment) => (
              <S.MiniPaymentCard key={payment.id} onClick={() => onPaymentClick(payment.id)}>
                <S.PaymentIcon>{getCategoryIcon(payment.category)}</S.PaymentIcon>
                <S.PaymentInfo>
                  <S.PaymentName>{payment.name}</S.PaymentName>
                  <S.PaymentDate>{payment.date}</S.PaymentDate>
                </S.PaymentInfo>
                <S.PaymentAmount>{payment.amount.toFixed(2)} zł</S.PaymentAmount>
              </S.MiniPaymentCard>
            ))}
          </S.PaymentsList>
        ) : (
          <S.EmptyMessage>Brak płatności do zapłaty</S.EmptyMessage>
        )}
      </S.Section>

      <S.Section>
        <S.SectionTitle>✅ Ostatnio zapłacone</S.SectionTitle>
        {recentPaidPayments.length > 0 ? (
          <S.PaymentsList>
            {recentPaidPayments.map((payment) => (
              <S.MiniPaymentCard key={payment.id} $paid onClick={() => onPaymentClick(payment.id)}>
                <S.PaymentIcon>{getCategoryIcon(payment.category)}</S.PaymentIcon>
                <S.PaymentInfo>
                  <S.PaymentName>{payment.name}</S.PaymentName>
                  <S.PaymentDate>{payment.date}</S.PaymentDate>
                </S.PaymentInfo>
                <S.PaymentAmount $paid>{payment.amount.toFixed(2)} zł</S.PaymentAmount>
              </S.MiniPaymentCard>
            ))}
          </S.PaymentsList>
        ) : (
          <S.EmptyMessage>Brak zapłaconych płatności</S.EmptyMessage>
        )}
      </S.Section>
    </S.MiniPaymentsContainer>
  );
};

export default MiniPayments;
