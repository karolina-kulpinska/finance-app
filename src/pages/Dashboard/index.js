import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  selectIsModalOpen,
  selectPayments,
  fetchPaymentsRequest,
} from "../../features/payments/paymentSlice";
import Button from "../../components/Button";
import AddPaymentForm from "./Form";
import PaymentsList from "./List";
import * as S from "./styled";

const Dashboard = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const payments = useSelector(selectPayments);

  useEffect(() => {
    dispatch(fetchPaymentsRequest());
  }, [dispatch]);

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const toPay = payments
    .filter((p) => !p.paid)
    .reduce((sum, p) => sum + p.amount, 0);
  const paid = payments
    .filter((p) => p.paid)
    .reduce((sum, p) => sum + p.amount, 0);

  const summaryData = [
    { id: 1, title: "Suma płatności", amount: `${totalAmount.toFixed(2)} zł` },
    { id: 2, title: "Do zapłaty", amount: `${toPay.toFixed(2)} zł` },
    { id: 3, title: "Opłacone", amount: `${paid.toFixed(2)} zł` },
  ];

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>Twoje Zestawienie</S.Title>
        <Button onClick={() => dispatch(toggleModal())}>
          + Dodaj nową płatność
        </Button>
      </S.Header>

      {isModalOpen && <AddPaymentForm />}

      <S.Grid>
        {summaryData.map((item) => (
          <S.Tile key={item.id}>
            <S.TileTitle>{item.title}</S.TileTitle>
            <S.Amount>{item.amount}</S.Amount>
          </S.Tile>
        ))}
      </S.Grid>
      <PaymentsList />
    </S.Wrapper>
  );
};

export default Dashboard;
