import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!validate()) return;
    login();
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border outline-none text-sm font-semibold
     transition focus:ring-2
     ${
       isSubmitted && errors[field]
         ? "border-red-500 focus:ring-red-400"
         : "border-gray-300 focus:ring-purple-500"
     }`;

 return (
  <div
    className="
      min-h-screen flex items-center justify-center
      bg-gradient-to-br
      from-purple-200 via-purple-100 to-white
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      transition-colors
    "
  >
    {/* CARD */}
    <div
      className="
        w-full max-w-md rounded-3xl p-8 md:p-10
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        border border-purple-100 dark:border-gray-700
        shadow-[0_0_40px_rgba(0,0,0,0.15)]
      "
    >
      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold mb-4">
            💼
          </div>

          <h2 className="text-3xl font-extrabold">
            Expense Tracker
          </h2>

          <p className="text-sm font-medium mt-1 text-gray-500 dark:text-gray-400">
            Login to manage your expenses
          </p>
        </div>

        {/* NAME */}
        <div className="mb-5">
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">
            Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            autoComplete="username"
            className={inputClass("name") + " dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-400"}
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {isSubmitted && errors.name && (
            <p className="text-red-500 text-xs font-semibold mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">
            Password <span className="text-red-500">*</span>
          </label>

          <input
            type="password"
            autoComplete="current-password"
            className={inputClass("password") + " dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-400"}
            placeholder="Enter password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {isSubmitted && errors.password && (
            <p className="text-red-500 text-xs font-semibold mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="
            w-full py-3 rounded-xl
            bg-purple-600 text-white text-sm font-bold
            hover:bg-purple-700 active:scale-95
            shadow-lg shadow-purple-300/40
            transition-all
          "
        >
          LOGIN
        </button>
      </form>
    </div>
  </div>
);

}
