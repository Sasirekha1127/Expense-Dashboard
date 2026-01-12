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
      state.expenses.push(action.payload);
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

    updateExpense(state, action) {
      const { id, data } = action.payload;
      const index = state.expenses.findIndex(
        (e) => e.id === id
      );

      if (index !== -1) {
        state.expenses[index] = {
          ...state.expenses[index],
          ...data,
        };

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
  updateExpense, 
  setSearch,
  setCategory,
} = expenseSlice.actions;

export default expenseSlice.reducer;
