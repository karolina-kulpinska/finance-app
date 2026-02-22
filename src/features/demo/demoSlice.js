import { createSlice } from "@reduxjs/toolkit";

const DEMO_STORAGE_KEY = "smartbudget_demo_data";

// Funkcja do ładowania danych z localStorage
const loadDemoData = () => {
  try {
    const data = localStorage.getItem(DEMO_STORAGE_KEY);
    return data ? JSON.parse(data) : { payments: [], shoppingLists: [] };
  } catch (error) {
    console.error("Błąd podczas ładowania danych demo:", error);
    return { payments: [], shoppingLists: [] };
  }
};

// Funkcja do zapisywania danych do localStorage
const saveDemoData = (data) => {
  try {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Błąd podczas zapisywania danych demo:", error);
  }
};

const initialState = {
  payments: [],
  shoppingLists: [],
  hasUnsavedData: false,
};

const demoSlice = createSlice({
  name: "demo",
  initialState: {
    ...initialState,
    ...loadDemoData(),
  },
  reducers: {
    addDemoPayment: (state, { payload }) => {
      const newPayment = {
        id: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...payload,
        createdAt: new Date().toISOString(),
        paid: false,
      };
      state.payments.push(newPayment);
      state.hasUnsavedData = true;
      saveDemoData({ payments: state.payments, shoppingLists: state.shoppingLists });
    },
    updateDemoPayment: (state, { payload }) => {
      const { id, ...updates } = payload;
      const index = state.payments.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.payments[index] = { ...state.payments[index], ...updates };
        state.hasUnsavedData = true;
        saveDemoData({ payments: state.payments, shoppingLists: state.shoppingLists });
      }
    },
    updateDemoPaymentsBatch: (state, { payload }) => {
      const { ids, updates } = payload;
      ids.forEach((id) => {
        const index = state.payments.findIndex((p) => p.id === id);
        if (index !== -1) {
          state.payments[index] = { ...state.payments[index], ...updates };
        }
      });
      state.hasUnsavedData = true;
      saveDemoData({ payments: state.payments, shoppingLists: state.shoppingLists });
    },
    deleteDemoPaymentsBatch: (state, { payload }) => {
      const ids = Array.isArray(payload) ? payload : [payload];
      state.payments = state.payments.filter((p) => !ids.includes(p.id));
      state.hasUnsavedData = true;
      saveDemoData({ payments: state.payments, shoppingLists: state.shoppingLists });
    },
    deleteDemoPayment: (state, { payload }) => {
      state.payments = state.payments.filter((p) => p.id !== payload);
      state.hasUnsavedData = true;
      saveDemoData({ payments: state.payments, shoppingLists: state.shoppingLists });
    },
    toggleDemoPaymentStatus: (state, { payload }) => {
      const payment = state.payments.find((p) => p.id === payload);
      if (payment) {
        payment.paid = !payment.paid;
        state.hasUnsavedData = true;
        saveDemoData({ payments: state.payments, shoppingLists: state.shoppingLists });
      }
    },
    addDemoShoppingList: (state, { payload }) => {
      const newList = {
        id: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...payload,
        createdAt: new Date().toISOString(),
      };
      state.shoppingLists.push(newList);
      state.hasUnsavedData = true;
      saveDemoData({ payments: state.payments, shoppingLists: state.shoppingLists });
    },
    updateDemoShoppingList: (state, { payload }) => {
      const { id, ...updates } = payload;
      const index = state.shoppingLists.findIndex((l) => l.id === id);
      if (index !== -1) {
        state.shoppingLists[index] = { ...state.shoppingLists[index], ...updates };
        state.hasUnsavedData = true;
        saveDemoData({ payments: state.payments, shoppingLists: state.shoppingLists });
      }
    },
    deleteDemoShoppingList: (state, { payload }) => {
      state.shoppingLists = state.shoppingLists.filter((l) => l.id !== payload);
      state.hasUnsavedData = true;
      saveDemoData({ payments: state.payments, shoppingLists: state.shoppingLists });
    },
    clearDemoData: (state) => {
      state.payments = [];
      state.shoppingLists = [];
      state.hasUnsavedData = false;
      localStorage.removeItem(DEMO_STORAGE_KEY);
    },
    setHasUnsavedData: (state, { payload }) => {
      state.hasUnsavedData = payload;
    },
  },
});

export const {
  addDemoPayment,
  updateDemoPayment,
  updateDemoPaymentsBatch,
  deleteDemoPaymentsBatch,
  deleteDemoPayment,
  toggleDemoPaymentStatus,
  addDemoShoppingList,
  updateDemoShoppingList,
  deleteDemoShoppingList,
  clearDemoData,
  setHasUnsavedData,
} = demoSlice.actions;

export const selectDemoPayments = (state) => state.demo.payments;
export const selectDemoShoppingLists = (state) => state.demo.shoppingLists;
export const selectHasUnsavedData = (state) => state.demo.hasUnsavedData;

export default demoSlice.reducer;
