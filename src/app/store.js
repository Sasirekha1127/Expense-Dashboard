import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../expenses/expenseSlice";
import walletReducer from "../wallet/walletSlice";

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    wallet: walletReducer,
  },
});
