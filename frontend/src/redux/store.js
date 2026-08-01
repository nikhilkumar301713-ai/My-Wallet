import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import themeReducer from "./themeSlice.js";
import transactionReducer from "./transactionSlice.js";
import budgetReducer from "./budgetSlice.js";
import goalReducer from "./goalSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    transactions: transactionReducer,
    budgets: budgetReducer,
    goals: goalReducer,
  },
});
