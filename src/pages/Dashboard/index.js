import React from "react";
import * as S from "./styled";
import Button from "../../components/Button";

const Dashboard = () => {
  const summaryData = [
    { id: 1, title: "Suma płatności", amount: "2 450,00 zł" },
    { id: 2, title: "Do zapłaty", amount: "820,00 zł" },
    { id: 3, title: "Opłacone", amount: "1 630,00 zł" },
  ];

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>Twoje Zestawienie</S.Title>
        <Button>+ Dodaj nową płatność</Button>
      </S.Header>

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
