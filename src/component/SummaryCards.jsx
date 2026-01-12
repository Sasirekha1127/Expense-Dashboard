import { Home, Zap, Utensils, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const icons = {
  Home: <Home />,
  Electricity: <Zap />,
  Food: <Utensils />,
  Shopping: <ShoppingCart />,
};

export default function SummaryCards() {
  const expenses = useSelector((s) => s.expenses.expenses);

  const summary = useMemo(() => {
    const totals = {};

    expenses.forEach((e) => {
      const amount = Number(e.amount) || 0;
      totals[e.category] = (totals[e.category] || 0) + amount;
    });

    return totals;
  }, [expenses]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {Object.entries(summary)
        .sort((a, b) => b[1] - a[1])
        .map(([category, amount]) => (
          <div
            key={category}
            className="
              flex items-center gap-4 p-5 rounded-xl shadow
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
            "
          >
            {/* ICON */}
            <div
              className="
                w-12 h-12 flex items-center justify-center rounded-full
                bg-purple-100 dark:bg-purple-900
                text-purple-600 dark:text-purple-300
              "
            >
              {icons[category] || "₹"}
            </div>

            {/* TEXT */}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category}
              </p>
              <p className="text-lg font-bold">
                ₹{amount}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
