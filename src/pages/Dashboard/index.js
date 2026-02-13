import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  selectIsModalOpen,
  selectPayments,
  fetchPaymentsRequest,
} from "../../features/payments/paymentSlice";
import Header from "./Header";
import Stats from "./Stats";
import Charts from "./Charts";
import Filters from "./Filters";
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

  const handleAddPayment = () => {
    dispatch(toggleModal());
  };

  return (
    <S.Wrapper>
      <S.Container>
        <Header onAddPayment={handleAddPayment} />
        <Stats payments={payments} />
        <Charts payments={payments} />
        <Filters />
        <PaymentsList />
        {isModalOpen && <AddPaymentForm />}
      </S.Container>
    </S.Wrapper>
  );
};

export default Dashboard;
