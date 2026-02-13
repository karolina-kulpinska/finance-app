import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    open: false,
    message: "",
    type: "info",
  },
  reducers: {
    showNotification: (state, { payload }) => {
      state.open = true;
      state.message = payload.message;
      state.type = payload.type || "info";
    },
    hideNotification: (state) => {
      state.open = false;
    },
  },
});

export const { showNotification, hideNotification } =
  notificationSlice.actions;

export const selectNotification = (state) => state.notification;

export default notificationSlice.reducer;
