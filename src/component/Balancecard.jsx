import { useSelector } from "react-redux";

export default function BalanceCard() {
  const expenses = useSelector(
    (s) => s.expenses.expenses
  );
  const deposit = useSelector(
    (s) => s.wallet.deposit
  );

  const totalExpense = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const balance = deposit - totalExpense;

  return (
    <div className="bg-purple-600 text-white rounded-xl p-6 mb-6">
      <p className="text-sm">Balance</p>
      <h2 className="text-3xl font-bold mb-4">
        ₹{balance}
      </h2>

      <div className="flex justify-between text-sm">
        <div>
          <p>Deposit</p>
          <p>₹{deposit}</p>
        </div>

        <div>
          <p>Expense</p>
          <p>₹{totalExpense}</p>
        </div>
      </div>
    </div>
  );
}
