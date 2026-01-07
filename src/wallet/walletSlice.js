import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    deposit: 0,
  },
  reducers: {
    addDeposit(state, action) {
      state.deposit += Number(action.payload);
    },
    clearWallet(state) {
      state.deposit = 0;
    },
  },
});

export const { addDeposit, clearWallet } = walletSlice.actions;
export default walletSlice.reducer;
