import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, updateStatus } from "./expenseSlice";

export default function ExpenseList() {
  const dispatch = useDispatch();
  const { expenses, search, category } = useSelector(
    (s) => s.expenses
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = expenses.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || e.category === category)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  if (!filtered.length) {
    return (
      <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
        No records found
      </p>
    );
  }

  return (
    <div className="mt-6">
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="p-3">Title</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((e) => (
              <tr
                key={e.id}
                className="border-b border-gray-200 dark:border-gray-700
                           hover:bg-gray-50 dark:hover:bg-gray-700
                           text-gray-700 dark:text-gray-200"
              >
                <td className="p-3 font-medium">{e.title}</td>
                <td className="p-3">₹{e.amount}</td>
                <td className="p-3">{e.category}</td>
                <td className="p-3">{e.date}</td>

                <td className="p-3">
                  <select
                    value={e.status}
                    onChange={(ev) =>
                      dispatch(
                        updateStatus({
                          id: e.id,
                          status: ev.target.value,
                        })
                      )
                    }
                    className={`px-2 py-1 rounded text-sm
                      ${
                        e.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : e.status === "Failed"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                  >
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Failed</option>
                  </select>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => dispatch(deleteExpense(e.id))}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {paginatedData.map((e) => (
          <div
            key={e.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4
                       text-gray-900 dark:text-gray-100"
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">{e.title}</h3>
              <span className="font-bold">₹{e.amount}</span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {e.category} • {e.date}
            </p>

            <div className="flex justify-between items-center mt-3">
              <select
                value={e.status}
                onChange={(ev) =>
                  dispatch(
                    updateStatus({
                      id: e.id,
                      status: ev.target.value,
                    })
                  )
                }
                className={`px-2 py-1 rounded text-xs
                  ${
                    e.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : e.status === "Failed"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
              >
                <option>Pending</option>
                <option>Completed</option>
                <option>Failed</option>
              </select>

              <button
                onClick={() => dispatch(deleteExpense(e.id))}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded
                         border-gray-300 dark:border-gray-600
                         disabled:opacity-40"
            >
              Prev
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded
                         border-gray-300 dark:border-gray-600
                         disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
