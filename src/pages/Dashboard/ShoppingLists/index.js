import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../api/firebase";
import { openStorageDownloadUrl } from "../../../utils/firebaseStorageDownload";
import { selectUser } from "../../../features/auth/authSlice";
import { selectIsPro } from "../../../features/subscription/subscriptionSlice";
import { showNotification } from "../../../features/notification/notificationSlice";
import { ListView } from "./ListView";
import { ListDetailView } from "./ListDetailView";
import * as S from "./styled";

const SHOPPING_LISTS_LIMIT_FREE = 2;
const SHOPPING_SHARED_LIMIT_FREE = 1;

const ShoppingLists = ({ sharedOnly = false, selectedListId, onSelectList, onBack }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isPro = useSelector(selectIsPro);
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
  const [localSelectedList, setLocalSelectedList] = useState(null);
  const useHistory = Boolean(onSelectList && onBack);
  const selectedList = useHistory
    ? (selectedListId ? lists.find((l) => l.id === selectedListId) ?? null : null)
    : localSelectedList;
  const setSelectedList = useHistory ? (list) => onSelectList(list) : setLocalSelectedList;
  const handleBack = useHistory ? onBack : () => setLocalSelectedList(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [shareWithFamily, setShareWithFamily] = useState(sharedOnly);
  const [receiptUploadingListId, setReceiptUploadingListId] = useState(null);
  const [deleteListConfirmId, setDeleteListConfirmId] = useState(null);

  const displayLists = sharedOnly
    ? lists.filter((l) => l.sharedWithFamily === true)
    : lists;

  const sharedListsCount = lists.filter((l) => l.sharedWithFamily === true).length;
  const canShareWithFamily = isPro || sharedListsCount < SHOPPING_SHARED_LIMIT_FREE;

  const handleAddList = () => {
    if (!isPro && lists.length >= SHOPPING_LISTS_LIMIT_FREE) {
      dispatch(
        showNotification({
          message: t("shopping.listsLimitReached"),
          type: "info",
        })
      );
      return;
    }
    if (shareWithFamily && !canShareWithFamily) {
      dispatch(
        showNotification({
          message: t("shopping.sharedLimitReached"),
          type: "info",
        })
      );
      return;
    }
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
    const fileName = file.name;
    setReceiptUploadingListId(listId);
    try {
      if (user?.uid) {
        const storagePath = `receipts/${user.uid}/${listId}_${Date.now()}_${file.name}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setLists((prev) =>
          prev.map((list) =>
            list.id === listId
              ? { ...list, receipt: { name: fileName, url } }
              : list
          )
        );
      } else {
        setLists((prev) =>
          prev.map((list) =>
            list.id === listId
              ? { ...list, receipt: { name: fileName } }
              : list
          )
        );
      }
    } catch {
      setLists((prev) =>
        prev.map((list) =>
          list.id === listId ? { ...list, receipt: { name: fileName } } : list
        )
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
    setDeleteListConfirmId(null);
  };

  const handleRequestDeleteList = (listId) => {
    setDeleteListConfirmId(listId);
  };

  const handleDownloadReceipt = (url) => {
    openStorageDownloadUrl(url);
  };

  return (
    <>
      {deleteListConfirmId && (
        <S.ConfirmOverlay
          onClick={() => setDeleteListConfirmId(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-list-title"
        >
          <S.ConfirmModalBox onClick={(e) => e.stopPropagation()}>
            <S.ConfirmTitle id="delete-list-title">{t("common.confirmation")}</S.ConfirmTitle>
            <S.ConfirmMessage>{t("shopping.removeListConfirm")}</S.ConfirmMessage>
            <S.ConfirmButtonGroup>
              <S.ConfirmCancelBtn onClick={() => setDeleteListConfirmId(null)}>
                {t("common.cancel")}
              </S.ConfirmCancelBtn>
              <S.ConfirmDeleteBtn onClick={() => handleDeleteList(deleteListConfirmId)}>
                {t("common.delete")}
              </S.ConfirmDeleteBtn>
            </S.ConfirmButtonGroup>
          </S.ConfirmModalBox>
        </S.ConfirmOverlay>
      )}
      {renderDetailOrList()}
    </>
  );

  function renderDetailOrList() {
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
        onBack={handleBack}
        onAddItem={handleAddItem}
        onTogglePurchased={handleTogglePurchased}
        onDeleteItem={handleDeleteItem}
        onReceiptUpload={handleReceiptUpload}
        receiptUploading={receiptUploadingListId === list.id}
        onDownloadReceipt={handleDownloadReceipt}
        onDeleteList={handleRequestDeleteList}
        canShareWithFamily={canShareWithFamily}
        />
      );
    }

    const listsEmpty = sharedOnly ? displayLists.length === 0 : lists.length === 0;

    const canAddList = isPro || lists.length < SHOPPING_LISTS_LIMIT_FREE;

    return (
      <ListView
      showAddForm={showAddForm}
      canAddList={canAddList}
      onToggleAddForm={() => setShowAddForm(!showAddForm)}
      onLimitReached={() =>
        dispatch(showNotification({ message: t("shopping.listsLimitReached"), type: "info" }))
      }
      newListName={newListName}
      onNewListNameChange={setNewListName}
      shareWithFamily={shareWithFamily}
      onShareWithFamilyChange={setShareWithFamily}
      canShareWithFamily={canShareWithFamily}
      onAddList={handleAddList}
      displayLists={displayLists}
      sharedOnly={sharedOnly}
      listsEmpty={listsEmpty}
      onSelectList={setSelectedList}
      />
    );
  }
};

export default ShoppingLists;
