import { useState } from "react";
import {
  Home,
  ShoppingBag,
  CreditCard,
  FileText,
  BarChart2,
  Wallet,
  Settings,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const menu = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: ShoppingBag, label: "Your shop" },
  { icon: CreditCard, label: "Pay Merchant" },
  { icon: FileText, label: "Orders" },
  { icon: BarChart2, label: "Reports" },
  { icon: Wallet, label: "Wallet" },
  { icon: Settings, label: "Manage" }
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 bg-purple-600 text-white p-2 rounded-lg"
      >
        <Menu size={20} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-[#faf7ff] border-r px-6 py-6
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* CLOSE BUTTON (MOBILE) */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-4 right-4"
        >
          <X />
        </button>

        <h1 className="text-2xl font-bold text-purple-600 mb-10">
          FloPay
        </h1>

        {/* MENU */}
        <nav className="space-y-2">
          {menu.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
              ${active
                ? "bg-purple-100 text-purple-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </div>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="mt-10 pt-4 border-t">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg
            text-red-600 font-semibold hover:bg-red-100 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
