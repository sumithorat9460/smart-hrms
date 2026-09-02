import { useState } from "react";
import { Outlet } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Icon from "./Icons";
const nav = [
  ["/dashboard", "Dashboard", "dashboard"],
  ["/employees", "Employees", "users", "ADMIN"],
  ["/departments", "Departments", "building", "ADMIN"],
];
export default function Layout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navg = useNavigate();
  return (
    <div className="min-h-screen page-bg flex">
      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-slate-950 text-slate-300 p-4 transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="h-9 w-9 rounded-xl bg-blue-500 flex items-center justify-center text-white font-black">
            S
          </div>
          <div>
            <div className="font-black tracking-tight text-white">
              SMART HRMS
            </div>
            <div className="text-[10px] text-slate-500">
              v1.0 · Human Resources
            </div>
          </div>
        </div>
        <div className="space-y-1">
          {nav
            .filter((n) => !n[3] || user?.role === n[3])
            .map(([to, label, icon]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" : "hover:bg-white/5 hover:text-white"}`
                }
              >
                <Icon name={icon} />
                {label}
              </NavLink>
            ))}
        </div>
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="px-3 text-[10px] uppercase tracking-wider text-slate-600 mb-2">
            Account
          </div>
          <button
            onClick={() => {
              logout();
              navg("/login");
            }}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-white/5 hover:text-white"
          >
            <Icon name="logout" />
            Logout
          </button>
        </div>
        <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs font-bold text-white">
            {user?.role === "ADMIN" ? "Admin access" : "Employee access"}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Role-based permissions enabled
          </div>
        </div>
      </aside>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-slate-950/40 z-20 lg:hidden"
        />
      )}
      <div className="flex-1 min-w-0">
        <header className="h-16 glass border-b border-slate-200/70 flex items-center justify-between px-4 md:px-7 sticky top-0 z-10">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <Icon name="menu" />
          </button>
          <div className="hidden lg:block">
            <div className="text-sm font-bold">
              {location.pathname === "/dashboard"
                ? "Dashboard"
                : location.pathname
                    .split("/")[1]
                    ?.replace(/^[a-z]/, (c) => c.toUpperCase())}
            </div>
            <div className="text-[11px] text-slate-400">
              Manage your workforce with confidence
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-slate-500">
              <Icon name="bell" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                {user?.email?.[0]?.toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-bold">
                  {user?.email?.split("@")[0]}
                </div>
                <div className="text-[10px] text-slate-400">{user?.role}</div>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 md:p-7 max-w-[1600px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
