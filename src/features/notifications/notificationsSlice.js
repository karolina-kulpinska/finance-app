import { createSlice } from "@reduxjs/toolkit";

const defaultPreferences = {
  enabled: false,
  daysBeforePayment: 1,
  notifyOnDueDate: true,
  notifyFamilyPaymentAdded: true,
  notifyFamilyListAdded: true,
};

const initialState = {
  preferences: defaultPreferences,
  permission: null,
  lastCheckedAt: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setPreferences: (state, { payload }) => {
      state.preferences = { ...defaultPreferences, ...payload };
    },
    setPermission: (state, { payload }) => {
      state.permission = payload;
    },
    setLastCheckedAt: (state, { payload }) => {
      state.lastCheckedAt = payload;
    },
  },
});

export const fetchNotificationPreferencesRequest = () => ({ type: "notifications/fetchPreferences" });
export const saveNotificationPreferencesRequest = (payload) => ({ type: "notifications/savePreferences", payload });
export const checkPaymentRemindersRequest = () => ({ type: "notifications/checkPaymentReminders" });
export const startNotificationsListenerRequest = () => ({ type: "notifications/startListener" });

export const { setPreferences, setPermission, setLastCheckedAt } = notificationsSlice.actions;
export const selectNotificationPreferences = (state) => state.notifications?.preferences ?? defaultPreferences;
export const selectNotificationPermission = (state) => state.notifications?.permission;
export default notificationsSlice.reducer;
