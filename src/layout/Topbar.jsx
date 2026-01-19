import { Bell, Settings, Moon, Sun } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearch } from "../expenses/expenseSlice";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function Topbar() {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    dispatch(setSearch(value)); 
  };

  return (
    <div className="
      bg-white dark:bg-gray-800
      px-4 py-3 md:px-6 md:py-4
      rounded-xl shadow
      mb-4
      flex flex-col gap-3
      md:flex-row md:items-center md:justify-between
      text-gray-900 dark:text-gray-100
    ">
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search title "
        value={searchText}
        onChange={handleSearch}
        className="
          w-full md:w-2/3
          px-4 py-2 rounded-lg outline-none border
          bg-white dark:bg-gray-700
          border-gray-300 dark:border-gray-600
          text-gray-900 dark:text-gray-100
          focus:ring-2 focus:ring-purple-400
        "
      />

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="hidden md:flex gap-4">
          <Bell />
          <Settings />
          <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center">
            AT
          </div>
        </div>
      </div>
    </div>
  );
}
