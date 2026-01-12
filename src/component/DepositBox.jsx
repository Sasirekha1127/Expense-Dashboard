import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDeposit, clearWallet } from "../wallet/walletSlice";

export default function DepositBox() {
  const dispatch = useDispatch();
  const deposit = useSelector((s) => s.wallet.deposit);

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!amount) {
      setError("Amount is required");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    dispatch(addDeposit(amount));
    setAmount("");
    setError("");
  };

  return (
    <div
      className="
        mt-6 mb-6 p-5 rounded-xl
        bg-white dark:bg-gray-800
        shadow
      "
    >
      {/* TITLE */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Add Deposit
      </h3>

      {/* INPUT + BUTTON */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          min="1"
          step="1"
          inputMode="numeric"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError("");
          }}
          className={`
            w-full px-4 py-2 rounded-lg border
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-400
            focus:outline-none focus:ring-2
            ${
              error
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 dark:border-gray-600 focus:ring-purple-500"
            }
          `}
        />

        <button
          onClick={handleAdd}
          className="
            px-6 py-2 rounded-lg
            bg-purple-600 text-white
            hover:bg-purple-700
            transition
          "
        >
          Add
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* INFO */}
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Current Deposit:{" "}
        <span className="font-semibold text-gray-800 dark:text-gray-100">
          ₹{deposit}
        </span>
      </p>

      {/* CLEAR */}
      {deposit > 0 && (
        <button
          onClick={() => dispatch(clearWallet())}
          className="
            mt-2 text-sm
            text-red-500 hover:underline
          "
        >
          Clear Deposit
        </button>
      )}
    </div>
  );
}
