import { createSlice } from "@reduxjs/toolkit";

const storedDeposit = JSON.parse(
  localStorage.getItem("deposit")
) || 0;

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    deposit: storedDeposit,
  },
  reducers: {
    addDeposit(state, action) {
      state.deposit += Number(action.payload);
      localStorage.setItem(
        "deposit",
        JSON.stringify(state.deposit)
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
