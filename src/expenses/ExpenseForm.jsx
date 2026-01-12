import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "./expenseSlice";

export default function ExpenseForm() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const [errors, setErrors] = useState({});

  // ================= VALIDATION =================
  const validate = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!form.title) {
      newErrors.title = "Title is required";
    }

    if (!form.amount) {
      newErrors.amount = "Amount is required";
    } else if (!Number.isInteger(Number(form.amount))) {
      newErrors.amount = "Decimal not allowed";
    } else if (Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!form.category) {
      newErrors.category = "Category is required";
    }

    if (!form.date) {
      newErrors.date = "Date is required";
    } else if (form.date > today) {
      newErrors.date = "Future date not allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(
      addExpense({
        ...form,
        amount: Number(form.amount),
        id: Date.now(),
      })
    );

    setForm({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
    setErrors({});
    setShowForm(false);
  };

  // ================= INPUT CLASS =================
  const inputClass = (field) =>
    `
      mt-1 w-full px-4 py-2 rounded-lg border
      bg-white dark:bg-gray-700
      text-gray-900 dark:text-gray-100
      placeholder-gray-400 dark:placeholder-gray-400
      focus:outline-none focus:ring-2
      ${
        errors[field]
          ? "border-red-500 focus:ring-red-400"
          : "border-gray-300 dark:border-gray-600 focus:ring-purple-400"
      }
    `;

  return (
    <div className="rounded-xl shadow p-6 mb-6 bg-white dark:bg-gray-800">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          {showForm ? "Close" : "Add New"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form onSubmit={submit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* TITLE */}
            <div>
              <label className="text-sm text-gray-500">Title</label>
              <input
                className={inputClass("title")}
                placeholder="Eg: Grocery"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            {/* AMOUNT */}
            <div>
              <label className="text-sm text-gray-500">Amount</label>
              <input
                type="number"
                step="1"
                min="0"
                className={inputClass("amount")}
                placeholder="₹ 0"
                value={form.amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setForm({ ...form, amount: value });
                  }
                }}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.amount}
                </p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <label className="text-sm text-gray-500">Category</label>
              <select
                className={inputClass("category")}
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">Select category</option>
                <option>Food</option>
                <option>Travel</option>
                <option>Bills</option>
                <option>Shopping</option>
                <option>Savings</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category}
                </p>
              )}
            </div>

            {/* DATE */}
            <div>
              <label className="text-sm text-gray-500">Date</label>
              <input
                type="date"
                className={inputClass("date")}
                value={form.date}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.date}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 w-full md:w-40 bg-purple-600 text-white py-2 rounded-lg"
          >
            Add Expense
          </button>
        </form>
      )}
    </div>
  );
}
