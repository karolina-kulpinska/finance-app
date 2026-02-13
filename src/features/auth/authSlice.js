import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginWithGoogleRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },
    loginError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const {
  loginRequest,
  loginWithGoogleRequest,
  loginSuccess,
  loginError,
  logout,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;
