import { Home, Zap, Utensils, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const icons = {
  Home: <Home />,
  Electricity: <Zap />,
  Food: <Utensils />,
  Shopping: <ShoppingCart />
};

export default function SummaryCards() {
  const expenses = useSelector((s) => s.expenses.expenses);

  const summary = useMemo(() => {
    const totals = {};

    expenses.forEach((e) => {
      totals[e.category] =
        (totals[e.category] || 0) + Number(e.amount);
    });

    return totals;
  }, [expenses]);

  return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {Object.entries(summary).map(([category, amount]) => (
        <div
          key={category}
          className="bg-white rounded-xl shadow p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 flex items-center justify-center
                          rounded-full bg-purple-100 text-purple-600">
            {icons[category] || "₹"}
          </div>

          <div>
            <p className="text-gray-500 text-sm">{category}</p>
            <p className="text-lg text-gray-600 font-bold">₹{amount}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
