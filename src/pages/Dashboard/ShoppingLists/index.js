import React, { useState } from "react";
import * as S from "./styled";

const ShoppingLists = () => {
  const [lists, setLists] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [selectedList, setSelectedList] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [receipt, setReceipt] = useState(null);

  const handleAddList = () => {
    if (newListName.trim()) {
      const newList = {
        id: Date.now(),
        name: newListName,
        items: [],
        totalPrice: 0,
        receipt: null,
        createdAt: new Date().toISOString(),
      };
      setLists([...lists, newList]);
      setNewListName("");
      setShowAddForm(false);
    }
  };

  const handleAddItem = (listId) => {
    if (newItemName.trim()) {
      const price = parseFloat(newItemPrice) || 0;
      const newItem = {
        id: Date.now(),
        name: newItemName,
        price: price,
      };
      
      setLists(lists.map(list => {
        if (list.id === listId) {
          const updatedItems = [...list.items, newItem];
          const totalPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);
          return { ...list, items: updatedItems, totalPrice };
        }
        return list;
      }));
      
      setNewItemName("");
      setNewItemPrice("");
    }
  };

  const handleDeleteItem = (listId, itemId) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        const updatedItems = list.items.filter(item => item.id !== itemId);
        const totalPrice = updatedItems.reduce((sum, item) => sum + item.price, 0);
        return { ...list, items: updatedItems, totalPrice };
      }
      return list;
    }));
  };

  const handleReceiptUpload = (listId, file) => {
    if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
      setLists(lists.map(list => {
        if (list.id === listId) {
          return { ...list, receipt: { name: file.name, file: file } };
        }
        return list;
      }));
    }
  };

  const handleDeleteList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
    if (selectedList?.id === listId) {
      setSelectedList(null);
    }
  };

  if (selectedList) {
    const list = lists.find(l => l.id === selectedList.id);
    
    return (
      <S.Container>
        <S.Header>
          <S.BackButton onClick={() => setSelectedList(null)}>
            ← Powrót
          </S.BackButton>
          <S.Title>{list.name}</S.Title>
          <S.DeleteButton onClick={() => handleDeleteList(list.id)}>
            🗑️
          </S.DeleteButton>
        </S.Header>

        <S.TotalCard>
          <S.TotalLabel>Suma:</S.TotalLabel>
          <S.TotalAmount>{list.totalPrice.toFixed(2)} zł</S.TotalAmount>
        </S.TotalCard>

        <S.AddItemForm>
          <S.Input
            type="text"
            placeholder="Nazwa produktu..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <S.Input
            type="number"
            step="0.01"
            placeholder="Cena..."
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
          />
          <S.SaveButton onClick={() => handleAddItem(list.id)}>
            + Dodaj
          </S.SaveButton>
        </S.AddItemForm>

        {list.items.length > 0 && (
          <S.ItemsList>
            {list.items.map((item) => (
              <S.ItemCard key={item.id}>
                <S.ItemName>{item.name}</S.ItemName>
                <S.ItemPrice>{item.price.toFixed(2)} zł</S.ItemPrice>
                <S.DeleteItemButton onClick={() => handleDeleteItem(list.id, item.id)}>
                  ✕
                </S.DeleteItemButton>
              </S.ItemCard>
            ))}
          </S.ItemsList>
        )}

        <S.ReceiptSection>
          <S.ReceiptTitle>📎 Paragon</S.ReceiptTitle>
          {list.receipt ? (
            <S.ReceiptInfo>
              <S.ReceiptName>✓ {list.receipt.name}</S.ReceiptName>
              <S.DeleteItemButton onClick={() => {
                setLists(lists.map(l => l.id === list.id ? { ...l, receipt: null } : l));
              }}>
                ✕
              </S.DeleteItemButton>
            </S.ReceiptInfo>
          ) : (
            <S.FileInput>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files[0] && handleReceiptUpload(list.id, e.target.files[0])}
                id="receipt-upload"
              />
              <S.FileLabel htmlFor="receipt-upload">
                Dodaj paragon (PDF lub zdjęcie)
              </S.FileLabel>
            </S.FileInput>
          )}
        </S.ReceiptSection>
      </S.Container>
    );
  }

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
            <S.ListCard key={list.id} onClick={() => setSelectedList(list)}>
              <S.ListIcon>📋</S.ListIcon>
              <S.ListName>{list.name}</S.ListName>
              <S.ListInfo>
                {list.items.length} przedmiotów
              </S.ListInfo>
              <S.ListPrice>{list.totalPrice.toFixed(2)} zł</S.ListPrice>
              <S.ListDate>
                {new Date(list.createdAt).toLocaleDateString("pl-PL")}
              </S.ListDate>
            </S.ListCard>
          ))}
        </S.ListsGrid>
      )}
    </S.Container>
  );
};

export default ShoppingLists;
