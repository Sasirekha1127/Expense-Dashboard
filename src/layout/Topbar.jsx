import { Bell, Settings, Moon, Sun } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearch } from "../expenses/expenseSlice";
import { useTheme } from "../context/ThemeContext";

export default function Topbar() {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="
        bg-white dark:bg-gray-800
        px-4 py-3 md:px-6 md:py-4
        rounded-xl shadow mb-4 md:mb-6
        flex flex-col gap-3
        md:flex-row md:items-center md:justify-between
        mt-4 md:mt-0
        text-gray-900 dark:text-gray-100
      "
    >
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search for merchants or item"
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="
          w-full md:w-2/3
          px-4 py-2 border rounded-lg outline-none
          bg-white dark:bg-gray-700
          border-gray-300 dark:border-gray-600
          text-gray-900 dark:text-gray-100
          focus:ring-2 focus:ring-purple-400
          mt-2 md:mt-0
        "
      />

      {/* RIGHT ICONS */}
      <div className="hidden md:flex items-center gap-4">
        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
          title="Toggle theme"
        >
          {theme === "light" ? (
            <Moon size={18} className="text-gray-600" />
          ) : (
            <Sun size={18} className="text-yellow-400" />
          )}
        </button>

        <Bell className="text-gray-500 dark:text-gray-300 cursor-pointer" />
        <Settings className="text-gray-500 dark:text-gray-300 cursor-pointer" />

        <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold">
          AT
        </div>
      </div>
    </div>
  );
}
