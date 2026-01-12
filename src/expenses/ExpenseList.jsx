import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, updateExpense } from "./expenseSlice";

export default function Transactions() {
  const dispatch = useDispatch();

  const {
    expenses = [],
    search = "",
    category = "All",
  } = useSelector((s) => s.expenses);

  // ================= LOCAL FILTER STATE =================
  const [localSearch, setLocalSearch] = useState(search);
  const [localCategory, setLocalCategory] = useState(category);

  // ================= EDIT STATE =================
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    status: "Pending",
  });

  // ================= PAGINATION =================
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ================= DARK MODE INPUT CLASS =================
  const editInputClass = `
    w-full px-2 py-1 rounded border
    bg-white text-gray-900 placeholder-gray-400
    dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400
    border-gray-300 dark:border-gray-600
    outline-none
  `;

  // ================= FILTER =================
  const filtered = expenses.filter((e) => {
  const text = search.toLowerCase();

  const matchSearch =
    (e.title || "").toLowerCase().includes(text);

  const matchCategory =
    localCategory === "All"
      ? true
      : (e.category || "").toLowerCase() ===
        localCategory.toLowerCase();

  return matchSearch && matchCategory;
});


  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [localSearch, localCategory]);

  // ================= HANDLERS =================
  const handleEdit = (e) => {
    setEditId(e.id);
    setEditForm({
      title: e.title,
      amount: e.amount,
      category: e.category,
      date: e.date,
      status: e.status,
    });
  };

  const handleSave = (id) => {
    dispatch(updateExpense({ id, data: editForm }));
    setEditId(null);
  };

  // ================= UI =================
  return (
    <div className="mt-6">
      {/* ================= FILTER BAR ================= */}
      <div className="flex flex-col md:flex-row gap-3 mb-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
        <input
          type="text"
          placeholder="Search title / amount / category / date"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className={editInputClass}
        />

        <select
          value={localCategory}
          onChange={(e) => setLocalCategory(e.target.value)}
          className={editInputClass}
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
        </select>
      </div>

      {/* ================= EMPTY ================= */}
      {!filtered.length && (
        <p className="text-center text-gray-500 mt-4">
          No transactions found
        </p>
      )}

      {/* ================= MOBILE VIEW ================= */}
      <div className="block md:hidden space-y-3">
        {paginatedData.map((e) => (
          <div
            key={e.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
          >
            {editId === e.id ? (
              <>
                <input
                  className={editInputClass + " mb-2"}
                  value={editForm.title}
                  onChange={(ev) =>
                    setEditForm({ ...editForm, title: ev.target.value })
                  }
                />

                <input
                  type="number"
                  className={editInputClass + " mb-2"}
                  value={editForm.amount}
                  onChange={(ev) =>
                    setEditForm({ ...editForm, amount: ev.target.value })
                  }
                />

                <input
                  className={editInputClass + " mb-2"}
                  value={editForm.category}
                  onChange={(ev) =>
                    setEditForm({ ...editForm, category: ev.target.value })
                  }
                />

                <input
                  type="date"
                  className={editInputClass + " mb-2"}
                  value={editForm.date}
                  onChange={(ev) =>
                    setEditForm({ ...editForm, date: ev.target.value })
                  }
                />

                <div className="flex gap-4">
                  <button
                    onClick={() => handleSave(e.id)}
                    className="text-green-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="text-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <h3 className="font-semibold">{e.title}</h3>
                  <span className="font-bold">₹{e.amount}</span>
                </div>

                <p className="text-sm text-gray-500">
                  {e.category} • {e.date}
                </p>

                <div className="flex gap-4 mt-3 text-sm">
                  <button
                    onClick={() => handleEdit(e)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteExpense(e.id))}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b dark:border-gray-700">
              <th className="p-3">Title</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((e) => (
              <tr
                key={e.id}
                className={`border-b dark:border-gray-700 ${editId === e.id
                    ? "bg-purple-50 dark:bg-gray-700/50"
                    : ""
                  }`}
              >
                {editId === e.id ? (
                  <>
                    <td className="p-3">
                      <input
                        className={editInputClass}
                        value={editForm.title}
                        onChange={(ev) =>
                          setEditForm({
                            ...editForm,
                            title: ev.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        className={editInputClass}
                        value={editForm.amount}
                        onChange={(ev) =>
                          setEditForm({
                            ...editForm,
                            amount: ev.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="p-3">
                      <input
                        className={editInputClass}
                        value={editForm.category}
                        onChange={(ev) =>
                          setEditForm({
                            ...editForm,
                            category: ev.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="date"
                        className={editInputClass}
                        value={editForm.date}
                        onChange={(ev) =>
                          setEditForm({
                            ...editForm,
                            date: ev.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => handleSave(e.id)}
                        className="text-green-500"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="text-gray-400"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3">{e.title}</td>
                    <td className="p-3">₹{e.amount}</td>
                    <td className="p-3">{e.category}</td>
                    <td className="p-3">{e.date}</td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => handleEdit(e)}
                        className="text-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => dispatch(deleteExpense(e.id))}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
