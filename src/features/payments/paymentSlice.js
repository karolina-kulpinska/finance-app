import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    isModalOpen: false,
    editingPayment: null,
    items: [],
    loading: false,
    filter: "all",
    categoryFilter: "all",
    dateFilter: "all",
  },
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
      if (!state.isModalOpen) {
        state.editingPayment = null;
      }
    },
    openEditModal: (state, { payload }) => {
      state.isModalOpen = true;
      state.editingPayment = payload;
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
    updatePaymentRequest: (state) => {
      state.loading = true;
    },
    updatePaymentSuccess: (state) => {
      state.loading = false;
      state.isModalOpen = false;
      state.editingPayment = null;
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
    setCategoryFilter: (state, { payload }) => {
      state.categoryFilter = payload;
    },
    setDateFilter: (state, { payload }) => {
      state.dateFilter = payload;
    },
  },
});

export const {
  toggleModal,
  openEditModal,
  addPaymentRequest,
  addPaymentSuccess,
  setPayments,
  fetchPaymentsRequest,
  deletePaymentRequest,
  updatePaymentStatusRequest,
  updatePaymentRequest,
  updatePaymentSuccess,
  setFilter,
  setCategoryFilter,
  setDateFilter,
} = paymentSlice.actions;

export const selectIsModalOpen = (state) => state.payments.isModalOpen;
export const selectEditingPayment = (state) => state.payments.editingPayment;
export const selectPayments = (state) => state.payments.items;
export const selectFilter = (state) => state.payments.filter;
export const selectCategoryFilter = (state) => state.payments.categoryFilter;
export const selectDateFilter = (state) => state.payments.dateFilter;
export const selectLoading = (state) => state.payments.loading;

export default paymentSlice.reducer;
