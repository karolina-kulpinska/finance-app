import React from "react";
import { useSelector } from "react-redux";
import { selectPayments } from "../../../features/payments/paymentSlice";
import * as S from "./styled";

const PaymentsList = () => {
  const payments = useSelector(selectPayments);

  if (payments.length === 0) {
    return (
      <S.NoData>Brak zarejestrowanych płatności. Dodaj pierwszą!</S.NoData>
    );
  }

  return (
    <S.TableWrapper>
      <S.Table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Kwota</th>
            <th>Termin</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.name}</td>
              <td>{payment.amount.toFixed(2)} zł</td>
              <td>{payment.date}</td>
              <td>{payment.paid ? "✅ Opłacone" : "⏳ Do zapłaty"}</td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
};

export default PaymentsList;
