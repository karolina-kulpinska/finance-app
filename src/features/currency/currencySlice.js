import { createSlice } from "@reduxjs/toolkit";

const CURRENCY_KEY = "app_currency";
const defaultCode = "PLN";

const CURRENCIES = [
  { code: "PLN", symbol: "zł", name: "Polski złoty" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "USD", symbol: "$", name: "Dollar" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna" },
  { code: "SEK", symbol: "kr", name: "Korona" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
];

function loadStored() {
  try {
    const stored = localStorage.getItem(CURRENCY_KEY);
    if (stored && CURRENCIES.some((c) => c.code === stored)) return stored;
  } catch {}
  return defaultCode;
}

const initialState = { code: loadStored() };

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      const code = action.payload;
      if (CURRENCIES.some((c) => c.code === code)) {
        state.code = code;
        try {
          localStorage.setItem(CURRENCY_KEY, code);
        } catch {}
      }
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export const selectCurrencyCode = (state) => state.currency?.code || defaultCode;
export const selectCurrency = (state) => {
  const code = selectCurrencyCode(state);
  return CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
};

export { CURRENCIES };

export function formatAmount(amount, currency) {
  const c = typeof currency === "string"
    ? CURRENCIES.find((x) => x.code === currency) || CURRENCIES[0]
    : currency;
  const n = Number(amount);
  if (isNaN(n)) return `0.00 ${c.symbol}`;
  return `${n.toFixed(2)} ${c.symbol}`;
}

export default currencySlice.reducer;
