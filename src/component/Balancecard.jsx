import { useSelector } from "react-redux";

export default function BalanceCard() {
  const expenses = useSelector((s) => s.expenses.expenses);
  const deposit = useSelector((s) => s.wallet.deposit); // ✅ FIXED

  const totalExpense = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const balance = Math.max(deposit - totalExpense, 0);

  return (
    <div className="
      bg-gradient-to-r from-purple-600 to-purple-500
      text-white rounded-xl
      p-4 sm:p-6
      mb-4 sm:mb-6
    ">
      <p className="text-xs sm:text-sm opacity-80">
        Wallet Balance
      </p>

      <h2 className="
        text-2xl sm:text-3xl md:text-4xl
        font-bold mt-1 mb-4
      ">
        ₹{balance}
      </h2>

      <div className="
        flex flex-col gap-3
        sm:flex-row sm:justify-between
        text-xs sm:text-sm
      ">
        <div className="flex justify-between sm:block">
          <span className="opacity-80">Deposit</span>
          <span className="font-semibold">
            ₹{deposit}
          </span>
        </div>

        <div className="flex justify-between sm:block">
          <span className="opacity-80">Expense</span>
          <span className="font-semibold">
            ₹{totalExpense}
          </span>
        </div>
      </div>
    </div>
  );
}
