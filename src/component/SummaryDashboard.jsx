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
    <div className="grid grid-cols-3 gap-4 mt-6">
      {Object.entries(categoryTotals).map(([cat, amt]) => (
        <div
          key={cat}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <p className="text-sm text-gray-500">{cat}</p>
          <h2 className="text-xl font-semibold">₹{amt}</h2>
        </div>
      ))}
    </div>
  );
}
