import { createSlice } from "@reduxjs/toolkit";

const confirmSlice = createSlice({
  name: "confirm",
  initialState: {
    open: false,
    message: "",
    onConfirm: null,
    paymentId: null,
  },
  reducers: {
    showConfirm: (state, { payload }) => {
      state.open = true;
      state.message = payload.message;
      state.paymentId = payload.paymentId;
    },
    hideConfirm: (state) => {
      state.open = false;
      state.message = "";
      state.paymentId = null;
    },
    confirmAction: (state) => {
      state.open = false;
    },
  },
});

export const { showConfirm, hideConfirm, confirmAction } = confirmSlice.actions;

export const selectConfirm = (state) => state.confirm;

export default confirmSlice.reducer;
