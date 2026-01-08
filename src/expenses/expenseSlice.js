import { createSlice } from "@reduxjs/toolkit";

const storedExpenses =
  JSON.parse(localStorage.getItem("expenses")) || [];

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: storedExpenses,
    search: "",
    category: "All",
  },
  reducers: {
    addExpense(state, action) {
      state.expenses.push({
        ...action.payload,
        status: "Pending",
      });
      localStorage.setItem(
        "expenses",
        JSON.stringify(state.expenses)
      );
    },

    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (e) => e.id !== action.payload
      );
      localStorage.setItem(
        "expenses",
        JSON.stringify(state.expenses)
      );
    },

    updateStatus(state, action) {
      const { id, status } = action.payload;
      const expense = state.expenses.find(
        (e) => e.id === id
      );
      if (expense) {
        expense.status = status;
        localStorage.setItem(
          "expenses",
          JSON.stringify(state.expenses)
        );
      }
    },

    setSearch(state, action) {
      state.search = action.payload;
    },

    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const {
  addExpense,
  deleteExpense,
  updateStatus,
  setSearch,
  setCategory,
} = expenseSlice.actions;

export default expenseSlice.reducer;
