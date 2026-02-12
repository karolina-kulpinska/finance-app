import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import authReducer from "./features/auth/authSlice";
import { authSaga } from "./features/auth/authSaga";
import paymentReducer from "./features/payments/paymentSlice";
import { paymentSaga } from "./features/payments/paymentSaga";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([authSaga(), paymentSaga()]);
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    payments: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
