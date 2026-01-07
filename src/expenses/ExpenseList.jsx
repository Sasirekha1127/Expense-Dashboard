import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, updateStatus } from "./expenseSlice";

export default function ExpenseList() {
  const dispatch = useDispatch();
  const { expenses, search, category } = useSelector(
    (s) => s.expenses
  );

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🔹 Filter logic
  const filtered = expenses.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || e.category === category)
  );

  // 🔹 Pagination calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 🔹 Reset page when filter changes
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  if (!filtered.length) {
    return (
      <p className="text-center mt-4 text-gray-500">
        No records found
      </p>
    );
  }

  return (
    <div className="mt-6 bg-white rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 border-b">
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
              className="border-b hover:bg-gray-50"
            >
              <td className="p-3 font-medium">
                {e.title}
              </td>
              <td className="p-3">₹{e.amount}</td>
              <td className="p-3">{e.category}</td>
              <td className="p-3">{e.date}</td>

              {/* STATUS */}
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
                  className={`px-2 py-1 rounded text-sm font-medium
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

              {/* DELETE */}
              <td className="p-3">
                <button
                  onClick={() =>
                    dispatch(deleteExpense(e.id))
                  }
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-3">
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((p) => p - 1)
              }
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((p) => p + 1)
              }
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
