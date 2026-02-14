import React, { useState, useEffect } from "react";
import * as S from "./styled";

const ShoppingLists = ({ sharedOnly = false }) => {
  const [lists, setLists] = useState(() => {
    try {
      const saved = localStorage.getItem("shoppingLists");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("shoppingLists", JSON.stringify(lists));
    } catch {}
  }, [lists]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [selectedList, setSelectedList] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [shareWithFamily, setShareWithFamily] = useState(sharedOnly);
  const displayLists = sharedOnly
    ? lists.filter((l) => l.sharedWithFamily === true)
    : lists;

  const handleAddList = () => {
    if (newListName.trim()) {
      const newList = {
        id: Date.now(),
        name: newListName,
        items: [],
        totalPrice: 0,
        receipt: null,
        createdAt: new Date().toISOString(),
        sharedWithFamily: shareWithFamily,
      };
      setLists([...lists, newList]);
      setNewListName("");
      setShareWithFamily(false);
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
        purchased: false,
      };

      setLists(
        lists.map((list) => {
          if (list.id === listId) {
            const updatedItems = [...list.items, newItem];
            const totalPrice = updatedItems.reduce(
              (sum, item) => sum + item.price,
              0,
            );
            return { ...list, items: updatedItems, totalPrice };
          }
          return list;
        }),
      );

      setNewItemName("");
      setNewItemPrice("");
    }
  };

  const handleTogglePurchased = (listId, itemId) => {
    setLists(
      lists.map((list) => {
        if (list.id === listId) {
          const updatedItems = list.items.map((item) =>
            item.id === itemId ? { ...item, purchased: !item.purchased } : item,
          );
          return { ...list, items: updatedItems };
        }
        return list;
      }),
    );
  };

  const handleDeleteItem = (listId, itemId) => {
    setLists(
      lists.map((list) => {
        if (list.id === listId) {
          const updatedItems = list.items.filter((item) => item.id !== itemId);
          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price,
            0,
          );
          return { ...list, items: updatedItems, totalPrice };
        }
        return list;
      }),
    );
  };

  const handleReceiptUpload = (listId, file) => {
    if (
      file &&
      (file.type === "application/pdf" || file.type.startsWith("image/"))
    ) {
      setLists(
        lists.map((list) => {
          if (list.id === listId) {
            return { ...list, receipt: { name: file.name, file: file } };
          }
          return list;
        }),
      );
    }
  };

  const handleDeleteList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId));
    if (selectedList?.id === listId) {
      setSelectedList(null);
    }
  };

  if (selectedList) {
    const list = lists.find((l) => l.id === selectedList.id);

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

        <S.AddItemForm
          onSubmit={(e) => {
            e.preventDefault();
            handleAddItem(list.id);
          }}
        >
          <S.Input
            type="text"
            placeholder="Nazwa produktu..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddItem(list.id);
              }
            }}
          />
          <S.Input
            type="number"
            step="0.01"
            placeholder="Cena..."
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddItem(list.id);
              }
            }}
          />
          <S.SaveButton type="submit">+ Dodaj</S.SaveButton>
        </S.AddItemForm>

        {list.items.length > 0 && (
          <>
            {list.items.some((item) => !item.purchased) && (
              <S.SectionBlock>
                <S.SectionHeader>🛒 Do kupienia</S.SectionHeader>
                <S.ItemsList>
                  {list.items
                    .filter((item) => !item.purchased)
                    .map((item) => (
                      <S.ItemCard key={item.id} $purchased={false}>
                        <S.Checkbox
                          type="checkbox"
                          checked={false}
                          onChange={() =>
                            handleTogglePurchased(list.id, item.id)
                          }
                        />
                        <S.ItemInfo>
                          <S.ItemName $purchased={false}>
                            {item.name}
                          </S.ItemName>
                          <S.ItemPrice $purchased={false}>
                            {item.price.toFixed(2)} zł
                          </S.ItemPrice>
                        </S.ItemInfo>
                        <S.DeleteItemButton
                          onClick={() => handleDeleteItem(list.id, item.id)}
                        >
                          🗑️
                        </S.DeleteItemButton>
                      </S.ItemCard>
                    ))}
                </S.ItemsList>
              </S.SectionBlock>
            )}

            {list.items.some((item) => item.purchased) && (
              <S.SectionBlock>
                <S.SectionHeader>✓ Kupione</S.SectionHeader>
                <S.ItemsList>
                  {list.items
                    .filter((item) => item.purchased)
                    .map((item) => (
                      <S.ItemCard key={item.id} $purchased={true}>
                        <S.Checkbox
                          type="checkbox"
                          checked={true}
                          onChange={() =>
                            handleTogglePurchased(list.id, item.id)
                          }
                        />
                        <S.ItemInfo>
                          <S.ItemName $purchased={true}>{item.name}</S.ItemName>
                          <S.ItemPrice $purchased={true}>
                            {item.price.toFixed(2)} zł
                          </S.ItemPrice>
                        </S.ItemInfo>
                        <S.DeleteItemButton
                          onClick={() => handleDeleteItem(list.id, item.id)}
                        >
                          🗑️
                        </S.DeleteItemButton>
                      </S.ItemCard>
                    ))}
                </S.ItemsList>
              </S.SectionBlock>
            )}
          </>
        )}

        <S.ReceiptSection>
          <S.ReceiptTitle>📎 Paragon</S.ReceiptTitle>
          {list.receipt ? (
            <S.ReceiptInfo>
              <S.ReceiptName>✓ {list.receipt.name}</S.ReceiptName>
              <S.DeleteItemButton
                onClick={() => {
                  setLists(
                    lists.map((l) =>
                      l.id === list.id ? { ...l, receipt: null } : l,
                    ),
                  );
                }}
              >
                ✕
              </S.DeleteItemButton>
            </S.ReceiptInfo>
          ) : (
            <S.FileInput>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  e.target.files[0] &&
                  handleReceiptUpload(list.id, e.target.files[0])
                }
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
          <S.CheckboxWrapper>
            <S.Checkbox
              type="checkbox"
              id="shareNewListMain"
              checked={shareWithFamily}
              onChange={(e) => setShareWithFamily(e.target.checked)}
            />
            <S.CheckboxLabel htmlFor="shareNewListMain">
              👨‍👩‍👧‍👦 Udostępnij rodzinie
            </S.CheckboxLabel>
          </S.CheckboxWrapper>
          <S.SaveButton onClick={handleAddList}>Dodaj listę</S.SaveButton>
        </S.AddForm>
      )}

      {(sharedOnly ? displayLists.length === 0 : lists.length === 0) ? (
        <S.EmptyState>
          <S.EmptyIcon>📝</S.EmptyIcon>
          <S.EmptyTitle>
            {sharedOnly ? "Brak list udostępnionych rodzinie" : "Brak list zakupów"}
          </S.EmptyTitle>
          <S.EmptyText>
            {sharedOnly
              ? "Zaznacz „Udostępnij rodzinie” przy tworzeniu listy"
              : "Dodaj swoją pierwszą listę zakupów, aby zorganizować zakupy"}
          </S.EmptyText>
        </S.EmptyState>
      ) : (
        <S.ListsGrid>
          {displayLists.map((list) => (
            <S.ListCard key={list.id} onClick={() => setSelectedList(list)}>
              <S.ListName>{list.name}</S.ListName>
              {list.sharedWithFamily && (
                <S.SharedBadge>👨‍👩‍👧‍👦 Rodzina</S.SharedBadge>
              )}
              <S.ListStats>
                <S.ItemCount>
                  {list.items.length}{" "}
                  {list.items.length === 1 ? "produkt" : "produktów"}
                </S.ItemCount>
                <S.TotalPrice>{list.totalPrice.toFixed(2)} zł</S.TotalPrice>
              </S.ListStats>
            </S.ListCard>
          ))}
        </S.ListsGrid>
      )}
    </S.Container>
  );
};

export default ShoppingLists;
