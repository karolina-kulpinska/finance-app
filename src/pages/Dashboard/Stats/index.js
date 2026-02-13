import React from "react";
import * as S from "./styled";

const Stats = ({ payments }) => {
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const unpaidAmount = payments
    .filter((p) => !p.paid)
    .reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments
    .filter((p) => p.paid)
    .reduce((sum, p) => sum + p.amount, 0);
  const paymentsCount = payments.length;
  const unpaidCount = payments.filter((p) => !p.paid).length;

  const stats = [
    {
      id: 1,
      icon: "💰",
      label: "Łączne wydatki",
      value: `${totalAmount.toFixed(2)} zł`,
      subtext: `${paymentsCount} płatności`,
      variant: "total",
      delay: "0s",
    },
    {
      id: 2,
      icon: "⏳",
      label: "Do zapłaty",
      value: `${unpaidAmount.toFixed(2)} zł`,
      subtext: `${unpaidCount} niezapłaconych`,
      variant: "unpaid",
      delay: "0.1s",
    },
    {
      id: 3,
      icon: "✅",
      label: "Zapłacone",
      value: `${paidAmount.toFixed(2)} zł`,
      subtext: `${paymentsCount - unpaidCount} opłaconych`,
      variant: "paid",
      delay: "0.2s",
    },
  ];

  return (
    <S.StatsGrid>
      {stats.map((stat) => (
        <S.StatCard key={stat.id} $variant={stat.variant} $delay={stat.delay}>
          <S.StatIcon>{stat.icon}</S.StatIcon>
          <S.StatLabel $variant={stat.variant}>{stat.label}</S.StatLabel>
          <S.StatValue $variant={stat.variant}>{stat.value}</S.StatValue>
          <S.StatSubtext $variant={stat.variant}>{stat.subtext}</S.StatSubtext>
        </S.StatCard>
      ))}
    </S.StatsGrid>
  );
};

export default Stats;
