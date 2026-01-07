import Sidebar from "../layout/sildebar";
import Topbar from "../layout/Topbar";
import { useTheme } from "../context/ThemeContext";

export default function DashboardLayout({ children }) {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* LEFT NAV */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-6">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
