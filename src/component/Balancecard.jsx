import { useSelector } from "react-redux";

export default function BalanceCard() {
  const expenses = useSelector((s) => s.expenses.expenses);
  const deposit = useSelector((s) => s.wallet.deposit);

  const totalExpense = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const balance = deposit - totalExpense;

  return (
    <div className="
      bg-gradient-to-r from-purple-600 to-purple-500
      text-white rounded-xl
      p-4 sm:p-6
      mb-4 sm:mb-6
    ">
      {/* Title */}
      <p className="text-xs sm:text-sm opacity-80">
        Wallet Balance
      </p>

      {/* Balance */}
      <h2
        className={`
          text-2xl sm:text-3xl md:text-4xl
          font-bold mt-1 mb-4
          ${balance < 0 ? "text-red-200" : "text-white"}
        `}
      >
        ₹{balance}
      </h2>

      {/* Bottom section */}
      <div className="
        flex flex-col gap-3
        sm:flex-row sm:justify-between
        text-xs sm:text-sm
      ">
        {/* Deposit */}
        <div className="flex justify-between sm:block">
          <span className="opacity-80">Deposit</span>
          <span className="font-semibold sm:block">
            ₹{deposit}
          </span>
        </div>

        {/* Expense */}
        <div className="flex justify-between sm:block">
          <span className="opacity-80">Expense</span>
          <span className="font-semibold sm:block">
            ₹{totalExpense}
          </span>
        </div>
      </div>
    </div>
  );
}
