import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  selectIsModalOpen,
} from "../../features/payments/paymentSlice";
import Button from "../../components/Button";
import AddPaymentForm from "./Form";
import * as S from "./styled";

const Dashboard = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);

  const summaryData = [
    { id: 1, title: "Suma płatności", amount: "2 450,00 zł" },
    { id: 2, title: "Do zapłaty", amount: "820,00 zł" },
    { id: 3, title: "Opłacone", amount: "1 630,00 zł" },
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
    </S.Wrapper>
  );
};

export default Dashboard;
