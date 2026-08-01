import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [],
    summary: null,
    total: 0,
    page: 1,
    totalPages: 1,
  },
  reducers: {
    setTransactions: (state, action) => {
      state.items = action.payload.transactions;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    addTransaction: (state, action) => {
      state.items.unshift(action.payload);
    },
    removeTransaction: (state, action) => {
      state.items = state.items.filter((t) => t._id !== action.payload);
    },
  },
});

export const { setTransactions, setSummary, addTransaction, removeTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
