import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import authReducer from "./features/auth/authSlice";
import registrationReducer from "./features/auth/registrationSlice";
import { authSaga } from "./features/auth/authSaga";
import { registrationSaga } from "./features/auth/registrationSaga";
import paymentReducer from "./features/payments/paymentSlice";
import { paymentSaga } from "./features/payments/paymentSaga";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([authSaga(), registrationSaga(), paymentSaga()]);
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    payments: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
