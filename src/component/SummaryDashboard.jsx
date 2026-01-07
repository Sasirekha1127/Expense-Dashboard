import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function SummaryDashboard() {
  const expenses = useSelector((s) => s.expenses.expenses);

  const categoryTotals = useMemo(() => {
    const totals = {};
    expenses.forEach((e) => {
      totals[e.category] =
        (totals[e.category] || 0) + Number(e.amount);
    });
    return totals;
  }, [expenses]);

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(categoryTotals).map(([cat, amt]) => (
        <div
          key={cat}
          className="
            rounded-xl p-4 shadow-sm
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
          "
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {cat}
          </p>
          <h2 className="text-xl font-semibold mt-1">
            ₹{amt}
          </h2>
        </div>
      ))}
    </div>
  );
}
