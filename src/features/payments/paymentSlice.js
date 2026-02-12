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
    addPaymentSuccess: (state, { payload }) => {
      state.items.push(payload);
      state.loading = false;
      state.isModalOpen = false;
    },
  },
});

export const { toggleModal, addPaymentRequest, addPaymentSuccess } =
  paymentSlice.actions;
export const selectIsModalOpen = (state) => state.payments.isModalOpen;

export default paymentSlice.reducer;
