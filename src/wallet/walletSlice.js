import { createSlice } from "@reduxjs/toolkit";

const storedDeposit = Number(
  localStorage.getItem("deposit")
) || 0;

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    deposit: storedDeposit,
  },
  reducers: {
    addDeposit(state, action) {
      const amount = Number(action.payload);

      if (isNaN(amount) || amount <= 0) return;

      state.deposit += amount;
      localStorage.setItem(
        "deposit",
        state.deposit.toString()
      );
    },
    clearWallet(state) {
      state.deposit = 0;
      localStorage.removeItem("deposit");
    },
  },
});

export const { addDeposit, clearWallet } =
  walletSlice.actions;

export default walletSlice.reducer;
