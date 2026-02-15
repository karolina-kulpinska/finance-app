import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../api/firebase";
import { selectUser } from "../../../features/auth/authSlice";
import { ListView } from "./ListView";
import { ListDetailView } from "./ListDetailView";

const ShoppingLists = ({ sharedOnly = false }) => {
  const user = useSelector(selectUser);
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

  useEffect(() => {
    const onListsUpdated = () => {
      try {
        const saved = localStorage.getItem("shoppingLists");
        if (saved) setLists(JSON.parse(saved));
      } catch {}
    };
    window.addEventListener("shoppingListsUpdated", onListsUpdated);
    return () => window.removeEventListener("shoppingListsUpdated", onListsUpdated);
  }, []);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [selectedList, setSelectedList] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [shareWithFamily, setShareWithFamily] = useState(sharedOnly);
  const [receiptUploadingListId, setReceiptUploadingListId] = useState(null);

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
              0
            );
            return { ...list, items: updatedItems, totalPrice };
          }
          return list;
        })
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
            item.id === itemId ? { ...item, purchased: !item.purchased } : item
          );
          return { ...list, items: updatedItems };
        }
        return list;
      })
    );
  };

  const handleDeleteItem = (listId, itemId) => {
    setLists(
      lists.map((list) => {
        if (list.id === listId) {
          const updatedItems = list.items.filter((item) => item.id !== itemId);
          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price,
            0
          );
          return { ...list, items: updatedItems, totalPrice };
        }
        return list;
      })
    );
  };

  const handleReceiptUpload = async (listId, file) => {
    if (
      !file ||
      !(file.type === "application/pdf" || file.type.startsWith("image/"))
    ) {
      return;
    }
    setReceiptUploadingListId(listId);
    try {
      if (user?.uid) {
        const fileName = `receipts/${user.uid}/${listId}_${Date.now()}_${file.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setLists(
          lists.map((list) => {
            if (list.id === listId) {
              return { ...list, receipt: { name: file.name, url } };
            }
            return list;
          })
        );
      } else {
        setLists(
          lists.map((list) => {
            if (list.id === listId) {
              return { ...list, receipt: { name: file.name } };
            }
            return list;
          })
        );
      }
    } catch {
      setLists(
        lists.map((list) => {
          if (list.id === listId) {
            return { ...list, receipt: { name: file.name } };
          }
          return list;
        })
      );
    } finally {
      setReceiptUploadingListId(null);
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
    if (!list) return null;

    return (
      <ListDetailView
        list={list}
        lists={lists}
        setLists={setLists}
        newItemName={newItemName}
        newItemPrice={newItemPrice}
        setNewItemName={setNewItemName}
        setNewItemPrice={setNewItemPrice}
        onBack={() => setSelectedList(null)}
        onAddItem={handleAddItem}
        onTogglePurchased={handleTogglePurchased}
        onDeleteItem={handleDeleteItem}
        onReceiptUpload={handleReceiptUpload}
        receiptUploading={receiptUploadingListId === list.id}
        onDeleteList={handleDeleteList}
      />
    );
  }

  const listsEmpty = sharedOnly ? displayLists.length === 0 : lists.length === 0;

  return (
    <ListView
      showAddForm={showAddForm}
      onToggleAddForm={() => setShowAddForm(!showAddForm)}
      newListName={newListName}
      onNewListNameChange={setNewListName}
      shareWithFamily={shareWithFamily}
      onShareWithFamilyChange={setShareWithFamily}
      onAddList={handleAddList}
      displayLists={displayLists}
      sharedOnly={sharedOnly}
      listsEmpty={listsEmpty}
      onSelectList={setSelectedList}
    />
  );
};

export default ShoppingLists;
