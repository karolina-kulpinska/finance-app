import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    plan: "free",
    loading: false,
  },
  reducers: {
    setPlan: (state, { payload }) => {
      state.plan = payload || "free";
      state.loading = false;
    },
    fetchSubscriptionRequest: (state) => {
      state.loading = true;
    },
    fetchSubscriptionError: (state) => {
      state.plan = "free";
      state.loading = false;
    },
  },
});

export const {
  setPlan,
  fetchSubscriptionRequest,
  fetchSubscriptionError,
} = subscriptionSlice.actions;

export const selectPlan = (state) => state.subscription.plan;
export const selectIsPro = (state) => state.subscription.plan === "pro";
export const selectSubscriptionLoading = (state) => state.subscription.loading;

export default subscriptionSlice.reducer;
