import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    plan: "free",
    loading: false,
    subscription: null,
    renewalDate: null,
    status: null,
  },
  reducers: {
    setPlan: (state, { payload }) => {
      state.plan = payload || "free";
      state.loading = false;
    },
    setSubscriptionDetails: (state, { payload }) => {
      if (payload) {
        state.subscription = payload;
        state.plan = "pro";
        state.renewalDate = payload.currentPeriodEnd
          ? new Date(payload.currentPeriodEnd * 1000).toISOString()
          : null;
        state.status = payload.status || null;
      } else {
        state.subscription = null;
        state.renewalDate = null;
        state.status = null;
      }
      state.loading = false;
    },
    fetchSubscriptionRequest: (state) => {
      state.loading = true;
    },
    fetchSubscriptionError: (state) => {
      state.plan = "free";
      state.subscription = null;
      state.renewalDate = null;
      state.status = null;
      state.loading = false;
    },
  },
});

export const {
  setPlan,
  setSubscriptionDetails,
  fetchSubscriptionRequest,
  fetchSubscriptionError,
} = subscriptionSlice.actions;

export const selectPlan = (state) => state.subscription.plan;
export const selectIsPro = (state) => state.subscription.plan === "pro";
export const selectSubscriptionLoading = (state) => state.subscription.loading;
export const selectSubscription = (state) => state.subscription.subscription;
export const selectRenewalDate = (state) => state.subscription.renewalDate;
export const selectSubscriptionStatus = (state) => state.subscription.status;

export default subscriptionSlice.reducer;
