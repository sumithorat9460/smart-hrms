import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/PageHeader";
export default function Profile() {
  const { user } = useAuth();
  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Your account and access information."
      />
      <div className="card p-7 max-w-2xl">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-black">
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-black">{user?.email}</h2>
            <span className="badge bg-blue-50 text-blue-700 mt-2">
              {user?.role}
            </span>
          </div>
        </div>
        <div className="mt-7 grid sm:grid-cols-2 gap-5 border-t border-slate-100 pt-6">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">
              Email
            </div>
            <div className="text-sm font-semibold mt-1">{user?.email}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">
              Role
            </div>
            <div className="text-sm font-semibold mt-1">{user?.role}</div>
          </div>
        </div>
      </div>
    </>
  );
}
