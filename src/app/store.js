import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "../wallet/walletSlice";
import expenseReducer from "../expenses/expenseSlice";

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    expenses: expenseReducer,
  },
});
