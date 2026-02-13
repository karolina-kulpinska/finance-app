import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    registerError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
  },
});

export const { registerRequest, registerSuccess, registerError } =
  registrationSlice.actions;

export const selectRegistrationLoading = (state) => state.registration.loading;
export const selectRegistrationError = (state) => state.registration.error;
export const selectRegistrationSuccess = (state) => state.registration.success;

export default registrationSlice.reducer;
