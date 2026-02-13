import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    isModalOpen: false,
    items: [],
    loading: false,
  },
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    addPaymentRequest: (state) => {
      state.loading = true;
    },
    addPaymentSuccess: (state) => {
      state.loading = false;
      state.isModalOpen = false;
    },
    setPayments: (state, { payload }) => {
      state.items = payload;
      state.loading = false;
    },
    fetchPaymentsRequest: (state) => {
      state.loading = true;
    },
    deletePaymentRequest: (state) => {
      state.loading = true;
    },
    updatePaymentStatusRequest: (state) => {
      state.loading = true;
    },
  },
});

export const {
  toggleModal,
  addPaymentRequest,
  addPaymentSuccess,
  setPayments,
  fetchPaymentsRequest,
  deletePaymentRequest,
  updatePaymentStatusRequest,
} = paymentSlice.actions;

export const selectIsModalOpen = (state) => state.payments.isModalOpen;
export const selectPayments = (state) => state.payments.items;

export default paymentSlice.reducer;
