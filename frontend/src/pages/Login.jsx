import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Icon from "../components/Icons";
export default function Login() {
  const [email, setEmail] = useState("admin@smarthrms.com"),
    [password, setPassword] = useState("Admin@123"),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (x) {
      setError(x.response?.data?.message || "Unable to sign in");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-5 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white relative">
        <div className="hidden lg:flex bg-gradient-to-br from-blue-700 to-slate-900 p-12 text-white flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center font-black">
                S
              </div>
              <div className="font-black">SMART HRMS</div>
            </div>
            <h2 className="text-4xl font-black mt-20 leading-tight">
              Workforce management,
              <br />
              <span className="text-blue-200">made intelligent.</span>
            </h2>
            <p className="text-slate-300 mt-5 max-w-md leading-7">
              A modern HR platform for employee records, departments, analytics
              and secure role-based access.
            </p>
          </div>
          <div className="text-xs text-slate-400">
            Java 21 · Spring Boot · React · MySQL
          </div>
        </div>
        <div className="p-7 sm:p-12">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
              S
            </div>
            <div className="font-black">SMART HRMS</div>
          </div>
          <h1 className="text-3xl font-black">Welcome back!</h1>
          <p className="text-sm text-slate-500 mt-2">
            Sign in to continue to your workspace.
          </p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label className="label">Email</label>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </div>
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm p-3">
                {error}
              </div>
            )}
            <button disabled={busy} className="btn btn-primary w-full py-3">
              {busy ? "Signing in..." : "Login"}
              <Icon name="arrow" size={16} />
            </button>
          </form>
          <div className="mt-7 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
            <b className="text-slate-700">Demo credentials</b>
            <div className="mt-2 flex justify-between">
              <span>Admin</span>
              <span>admin@smarthrms.com / Admin@123</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>Employee</span>
              <span>employee@smarthrms.com / Employee@123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
