import { call, put, takeLatest, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../../api/firebase";
import {
  addPaymentRequest,
  addPaymentSuccess,
  fetchPaymentsRequest,
  setPayments,
  deletePaymentRequest,
  updatePaymentStatusRequest,
  updatePaymentRequest,
  updatePaymentsBatchRequest,
  changeSeriesCountRequest,
  updatePaymentSuccess,
  selectPayments,
} from "./paymentSlice";
import { selectUser } from "../auth/authSlice";
import { showNotification } from "../notification/notificationSlice";

function createPaymentsChannel(userId) {
  return eventChannel((emitter) => {
    let oldList = [];
    let newList = [];

    const emitMerged = () => {
      emitter([...oldList, ...newList]);
    };

    const oldQuery = query(collection(db, "payments"), where("userId", "==", userId));
    const unsubscribeOld = onSnapshot(oldQuery, (snapshot) => {
      oldList = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        source: "old",
      }));
      emitMerged();
    });

    const newRef = collection(db, "users", userId, "payments");
    const unsubscribeNew = onSnapshot(newRef, (snapshot) => {
      newList = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        source: "new",
      }));
      emitMerged();
    });

    return () => {
      unsubscribeOld();
      unsubscribeNew();
    };
  });
}

function* fetchPaymentsHandler() {
  const user = yield select(selectUser);
  if (!user) return;

  const channel = yield call(createPaymentsChannel, user.uid);
  try {
    while (true) {
      const payments = yield take(channel);
      yield put(setPayments(payments));
    }
  } finally {
    channel.close();
  }
}

function* addPaymentHandler({ payload }) {
  try {
    const user = yield select(selectUser);
    if (!user) {
      yield put(
        showNotification({
          message: "Musisz być zalogowany, aby dodać płatność.",
          type: "error",
        }),
      );
      return;
    }

    let attachmentUrl = null;
    let attachmentName = null;

    if (payload.attachment && payload.attachment[0]) {
      const file = payload.attachment[0];
      const fileName = `${user.uid}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `payments/${fileName}`);
      
      yield call(uploadBytes, storageRef, file);
      attachmentUrl = yield call(getDownloadURL, storageRef);
      attachmentName = file.name;
    }

    const paymentData = {
      name: payload.name,
      amount: parseFloat(payload.amount),
      date: payload.date,
      category: payload.category || "other",
      priority: payload.priority || "normal",
      notes: payload.notes || "",
      bank: payload.bank || null,
      paymentType: payload.paymentType || null,
      sharedWithFamily: Boolean(payload.sharedWithFamily),
      isInstallment: payload.isInstallment || false,
      installmentInfo: payload.installmentInfo || null,
      isRecurring: payload.isRecurring || false,
      policyNumber: payload.policyNumber || null,
      accountNumber: payload.accountNumber || null,
      createdAt: serverTimestamp(),
      paid: false,
      attachmentUrl,
      attachmentName,
    };

    const docRef = yield call(addDoc, collection(db, "users", user.uid, "payments"), paymentData);
    yield put(addPaymentSuccess({ id: docRef.id, ...paymentData }));

    if (payload.sharedWithFamily) {
      try {
        const userDoc = yield call(getDoc, doc(db, "users", user.uid));
        const familyId = userDoc.data()?.familyId;
        if (familyId) {
          const familyDoc = yield call(getDoc, doc(db, "families", familyId));
          const members = familyDoc.data()?.members || [];
          const otherMemberIds = members
            .filter((m) => m.userId && m.userId !== user.uid && m.status === "active")
            .map((m) => m.userId);
          const notif = {
            type: "family_payment_added",
            fromName: user.displayName || user.email || "Ktoś",
            paymentName: payload.name,
            createdAt: new Date().toISOString(),
          };
          for (const memberId of otherMemberIds) {
            yield call(addDoc, collection(db, "users", memberId, "notifications"), notif);
          }
        }
      } catch {
      }
    }

    yield put(
      showNotification({
        message: "Płatność została dodana pomyślnie!",
        type: "success",
      }),
    );
  } catch (error) {
    yield put(
      showNotification({
        message: "Nie udało się dodać płatności. Spróbuj ponownie.",
        type: "error",
      }),
    );
  }
}

function* deletePaymentHandler({ payload }) {
  try {
    const user = yield select(selectUser);
    const paymentData = yield select(selectPayments);
    const payment = paymentData.find(p => p.id === payload);
    
    const paymentDoc = payment?._source === "old"
      ? doc(db, "payments", payload)
      : doc(db, "users", user.uid, "payments", payload);

    if (payment && payment.attachmentUrl) {
      try {
        const attachmentRef = ref(storage, payment.attachmentUrl);
        yield call(deleteObject, attachmentRef);
      } catch (storageError) {
      }
    }

    yield call(deleteDoc, paymentDoc);
    
    yield put(
      showNotification({
        message: "Płatność została usunięta.",
        type: "success",
      }),
    );
  } catch (error) {
    yield put(
      showNotification({
        message: "Nie udało się usunąć płatności.",
        type: "error",
      }),
    );
  }
}

function* updateStatusHandler({ payload }) {
  try {
    const user = yield select(selectUser);
    const paymentData = yield select(selectPayments);
    const payment = paymentData.find(p => p.id === payload.id);
    
    const paymentRef = payment?._source === "old" || payment?.source === "old"
      ? doc(db, "payments", payload.id)
      : doc(db, "users", user.uid, "payments", payload.id);
    
    yield call(updateDoc, paymentRef, {
      paid: !payload.currentStatus,
    });
  } catch (error) {
  }
}

function* updatePaymentHandler({ payload }) {
  try {
    const { id, ...updateData } = payload;
    const user = yield select(selectUser);
    const paymentData = yield select(selectPayments);
    const payment = paymentData.find(p => p.id === id);

    let attachmentUrl = updateData.attachmentUrl;
    let attachmentName = updateData.attachmentName;

    if (updateData.attachment && updateData.attachment[0]) {
      const file = updateData.attachment[0];
      const fileName = `${user.uid}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `payments/${fileName}`);

      if (updateData.oldAttachmentUrl) {
        try {
          const oldAttachmentRef = ref(storage, updateData.oldAttachmentUrl);
          yield call(deleteObject, oldAttachmentRef);
        } catch (error) {
        }
      }

      yield call(uploadBytes, storageRef, file);
      attachmentUrl = yield call(getDownloadURL, storageRef);
      attachmentName = file.name;
    } else if (updateData.oldAttachmentUrl) {
      try {
        const oldRef = ref(storage, updateData.oldAttachmentUrl);
        yield call(deleteObject, oldRef);
      } catch (error) {
      }
      attachmentUrl = null;
      attachmentName = null;
    }
    
    const paymentUpdateData = {
      name: updateData.name,
      amount: parseFloat(updateData.amount),
      date: updateData.date,
      category: updateData.category || "other",
      priority: updateData.priority || "normal",
      notes: updateData.notes || "",
      bank: updateData.bank || null,
      sharedWithFamily: Boolean(updateData.sharedWithFamily),
      attachmentUrl,
      attachmentName,
      accountNumber: updateData.accountNumber || null,
      policyNumber: updateData.policyNumber || null,
      ...(updateData.installmentInfo && { installmentInfo: updateData.installmentInfo }),
      ...(updateData.insuranceInfo && { insuranceInfo: updateData.insuranceInfo }),
    };

    const paymentRef = payment?._source === "old" || payment?.source === "old"
      ? doc(db, "payments", id)
      : doc(db, "users", user.uid, "payments", id);
    
    yield call(updateDoc, paymentRef, paymentUpdateData);
    yield put(updatePaymentSuccess());

    yield put(
      showNotification({
        message: "Płatność została zaktualizowana!",
        type: "success",
      })
    );
  } catch (error) {
    yield put(
      showNotification({
        message: "Nie udało się zaktualizować płatności.",
        type: "error",
      })
    );
  }
}

function* updatePaymentsBatchHandler({ payload }) {
  try {
    const { ids, updates } = payload;
    const user = yield select(selectUser);
    const paymentData = yield select(selectPayments);
    if (!user || !ids?.length) return;

    const updateData = {
      amount: updates.amount != null ? parseFloat(updates.amount) : undefined,
      notes: updates.notes,
      sharedWithFamily: Boolean(updates.sharedWithFamily),
      policyNumber: updates.policyNumber ?? null,
      accountNumber: updates.accountNumber ?? null,
    };
    const cleanUpdates = Object.fromEntries(
      Object.entries(updateData).filter(([, v]) => v !== undefined)
    );

    for (const id of ids) {
      const payment = paymentData.find((p) => p.id === id);
      if (!payment) continue;
      const paymentRef =
        payment?._source === "old" || payment?.source === "old"
          ? doc(db, "payments", id)
          : doc(db, "users", user.uid, "payments", id);
      yield call(updateDoc, paymentRef, cleanUpdates);
    }

    yield put(updatePaymentSuccess());
    yield put(
      showNotification({
        message: `${ids.length} płatności zostało zaktualizowanych!`,
        type: "success",
      })
    );
  } catch (error) {
    yield put(
      showNotification({
        message: "Nie udało się zaktualizować płatności.",
        type: "error",
      })
    );
  }
}

function* changeSeriesCountHandler({ payload }) {
  try {
    const { toDelete, toUpdate, toAdd } = payload;
    const user = yield select(selectUser);
    const paymentData = yield select(selectPayments);
    if (!user) return;

    for (const id of toDelete || []) {
      const payment = paymentData.find((p) => p.id === id);
      const paymentDoc = payment?._source === "old" || payment?.source === "old"
        ? doc(db, "payments", id)
        : doc(db, "users", user.uid, "payments", id);
      yield call(deleteDoc, paymentDoc);
    }

    for (const item of toUpdate || []) {
      const { id, ...updates } = item;
      const payment = paymentData.find((p) => p.id === id);
      const paymentRef = payment?._source === "old" || payment?.source === "old"
        ? doc(db, "payments", id)
        : doc(db, "users", user.uid, "payments", id);
      const updateData = {
        name: updates.name,
        amount: parseFloat(updates.amount),
        date: updates.date,
        notes: updates.notes ?? "",
        sharedWithFamily: Boolean(updates.sharedWithFamily),
        ...(updates.installmentInfo && { installmentInfo: updates.installmentInfo }),
        ...(updates.insuranceInfo && { insuranceInfo: updates.insuranceInfo }),
        ...(updates.policyNumber != null && { policyNumber: updates.policyNumber }),
        ...(updates.accountNumber != null && { accountNumber: updates.accountNumber }),
      };
      yield call(updateDoc, paymentRef, updateData);
    }

    for (const item of toAdd || []) {
      const paymentData = {
        name: item.name,
        amount: parseFloat(item.amount),
        date: item.date,
        category: item.category || "other",
        priority: item.priority || "normal",
        notes: item.notes || "",
        bank: item.bank || null,
        paymentType: item.paymentType || null,
        sharedWithFamily: Boolean(item.sharedWithFamily),
        isInstallment: item.isInstallment || false,
        installmentInfo: item.installmentInfo || null,
        isRecurring: item.isRecurring || false,
        policyNumber: item.policyNumber ?? null,
        accountNumber: item.accountNumber ?? null,
        createdAt: serverTimestamp(),
        paid: false,
        attachmentUrl: null,
        attachmentName: null,
      };
      yield call(addDoc, collection(db, "users", user.uid, "payments"), paymentData);
    }

    yield put(updatePaymentSuccess());
    yield put(
      showNotification({
        message: "Seria płatności została zaktualizowana!",
        type: "success",
      })
    );
  } catch (error) {
    yield put(
      showNotification({
        message: "Nie udało się zaktualizować serii płatności.",
        type: "error",
      })
    );
  }
}

export function* paymentSaga() {
  yield takeLatest(addPaymentRequest.type, addPaymentHandler);
  yield takeLatest(fetchPaymentsRequest.type, fetchPaymentsHandler);
  yield takeLatest(deletePaymentRequest.type, deletePaymentHandler);
  yield takeLatest(updatePaymentStatusRequest.type, updateStatusHandler);
  yield takeLatest(updatePaymentRequest.type, updatePaymentHandler);
  yield takeLatest(updatePaymentsBatchRequest.type, updatePaymentsBatchHandler);
  yield takeLatest(changeSeriesCountRequest.type, changeSeriesCountHandler);
}
