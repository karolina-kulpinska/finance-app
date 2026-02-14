import { call, put, takeLatest, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
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
  updatePaymentSuccess,
  selectPayments,
} from "./paymentSlice";
import { selectUser } from "../auth/authSlice";
import { showNotification } from "../notification/notificationSlice";

function createPaymentsChannel(userId) {
  return eventChannel((emitter) => {
    // Nasłuchuj na OBIE struktury jednocześnie
    let allPayments = [];
    
    // STARA STRUKTURA: /payments gdzie userId == userId
    const oldQuery = query(collection(db, "payments"), where("userId", "==", userId));
    const unsubscribeOld = onSnapshot(oldQuery, (snapshot) => {
      const oldPayments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        source: "old", // oznaczenie źródła
      }));
      
      // Połącz ze starej struktury i wyślij
      allPayments = [...oldPayments];
      emitter(allPayments);
    });
    
    // NOWA STRUKTURA: users/{userId}/payments
    const newRef = collection(db, "users", userId, "payments");
    const unsubscribeNew = onSnapshot(newRef, (snapshot) => {
      const newPayments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        source: "new", // oznaczenie źródła
      }));
      
      // Połącz obie struktury
      const oldPayments = allPayments.filter(p => p.source === "old");
      allPayments = [...oldPayments, ...newPayments];
      emitter(allPayments);
    });
    
    // Zwróć funkcję czyszczącą dla obu subskrypcji
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
      sharedWithFamily: payload.sharedWithFamily || false,
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

    // NOWA STRUKTURA: users/{userId}/payments
    const docRef = yield call(addDoc, collection(db, "users", user.uid, "payments"), paymentData);
    yield put(addPaymentSuccess({ id: docRef.id, ...paymentData }));
    
    yield put(
      showNotification({
        message: "Płatność została dodana pomyślnie!",
        type: "success",
      }),
    );
  } catch (error) {
    console.error("Błąd dodawania płatności:", error);
    
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
    
    // Sprawdź czy to stara czy nowa struktura
    const paymentDoc = payment?._source === "old"
      ? doc(db, "payments", payload)
      : doc(db, "users", user.uid, "payments", payload);

    if (payment && payment.attachmentUrl) {
      try {
        const attachmentRef = ref(storage, payment.attachmentUrl);
        yield call(deleteObject, attachmentRef);
      } catch (storageError) {
        console.error("Błąd usuwania załącznika:", storageError);
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
    console.error("Błąd usuwania płatności:", error);
    
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
    
    // Sprawdź czy to stara czy nowa struktura - sprawdź _source i source
    const paymentRef = payment?._source === "old" || payment?.source === "old"
      ? doc(db, "payments", payload.id)
      : doc(db, "users", user.uid, "payments", payload.id);
    
    yield call(updateDoc, paymentRef, {
      paid: !payload.currentStatus,
    });
  } catch (error) {
    console.error("Błąd aktualizacji statusu:", error);
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
          console.error("Błąd usuwania starego załącznika:", error);
        }
      }

      yield call(uploadBytes, storageRef, file);
      attachmentUrl = yield call(getDownloadURL, storageRef);
      attachmentName = file.name;
    }
    
    const paymentUpdateData = {
      name: updateData.name,
      amount: parseFloat(updateData.amount),
      date: updateData.date,
      category: updateData.category,
      priority: updateData.priority,
      notes: updateData.notes || "",
      bank: updateData.bank || null,
      sharedWithFamily: updateData.sharedWithFamily || false,
      attachmentUrl,
      attachmentName,
    };

    // Sprawdź czy to stara czy nowa struktura i zaktualizuj odpowiednio - sprawdź _source i source
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
    console.error("Błąd aktualizacji płatności:", error);

    yield put(
      showNotification({
        message: "Nie udało się zaktualizować płatności.",
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
}
