import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
  name: "budgets",
  initialState: { items: [] },
  reducers: {
    setBudgets: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setBudgets } = budgetSlice.actions;
export default budgetSlice.reducer;
