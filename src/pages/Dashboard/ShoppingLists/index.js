import React, { useState } from "react";
import * as S from "./styled";

const ShoppingLists = () => {
  const [lists, setLists] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newListName, setNewListName] = useState("");

  const handleAddList = () => {
    if (newListName.trim()) {
      const newList = {
        id: Date.now(),
        name: newListName,
        items: [],
        createdAt: new Date().toISOString(),
      };
      setLists([...lists, newList]);
      setNewListName("");
      setShowAddForm(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>🛒 Listy zakupów</S.Title>
        <S.AddButton onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "✕ Anuluj" : "+ Nowa lista"}
        </S.AddButton>
      </S.Header>

      {showAddForm && (
        <S.AddForm>
          <S.Input
            type="text"
            placeholder="Nazwa listy zakupów..."
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <S.SaveButton onClick={handleAddList}>
            Dodaj listę
          </S.SaveButton>
        </S.AddForm>
      )}

      {lists.length === 0 ? (
        <S.EmptyState>
          <S.EmptyIcon>📝</S.EmptyIcon>
          <S.EmptyTitle>Brak list zakupów</S.EmptyTitle>
          <S.EmptyText>
            Dodaj swoją pierwszą listę zakupów, aby zorganizować zakupy
          </S.EmptyText>
        </S.EmptyState>
      ) : (
        <S.ListsGrid>
          {lists.map((list) => (
            <S.ListCard key={list.id}>
              <S.ListIcon>📋</S.ListIcon>
              <S.ListName>{list.name}</S.ListName>
              <S.ListInfo>
                {list.items.length} przedmiotów
              </S.ListInfo>
              <S.ListDate>
                {new Date(list.createdAt).toLocaleDateString("pl-PL")}
              </S.ListDate>
            </S.ListCard>
          ))}
        </S.ListsGrid>
      )}

      <S.InfoBox>
        <S.InfoTitle>💡 Funkcje w przygotowaniu:</S.InfoTitle>
        <S.InfoList>
          <S.InfoItem>✓ Dodawanie produktów do list</S.InfoItem>
          <S.InfoItem>✓ Załączanie rachunków PDF</S.InfoItem>
          <S.InfoItem>✓ Zdjęcia paragonów</S.InfoItem>
          <S.InfoItem>✓ Udostępnianie list innym użytkownikom</S.InfoItem>
        </S.InfoList>
      </S.InfoBox>
    </S.Container>
  );
};

export default ShoppingLists;
