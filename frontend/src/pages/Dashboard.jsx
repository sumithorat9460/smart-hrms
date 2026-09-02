import { useEffect, useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icons";
const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n || 0);
export default function Dashboard() {
  const [data, setData] = useState(null),
    [err, setErr] = useState("");
  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then((r) => setData(r.data))
      .catch(() => setErr("Could not load dashboard"));
  }, []);
  if (err) return <div className="card p-8 text-red-600">{err}</div>;
  if (!data)
    return (
      <div className="animate-pulse space-y-5">
        <div className="h-8 bg-slate-200 rounded w-64" />
        <div className="grid md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((x) => (
            <div key={x} className="h-28 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Welcome back, Admin User!" />
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat
          title="Total Employees"
          value={data.totalEmployees}
          sub={`${data.activeEmployees} active today`}
          icon="users"
        />
        <Stat
          title="Total Departments"
          value={data.totalDepartments}
          sub="Across the organization"
          icon="building"
        />
        <Stat
          title="Average Salary"
          value={money(data.averageSalary)}
          sub={`Highest ${money(data.highestSalary)}`}
          icon="dashboard"
        />
        <Stat
          title="Active Rate"
          value={`${data.totalEmployees ? Math.round((data.activeEmployees / data.totalEmployees) * 100) : 0}%`}
          sub="Workforce currently active"
          icon="user"
        />
      </div>
      <div className="grid xl:grid-cols-3 gap-5 mt-5">
        <div className="card p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black">Department Distribution</h3>
              <p className="text-xs text-slate-400 mt-1">
                Current employee mix
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {data.departmentDistribution.map((d) => (
              <div key={d.name}>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span>{d.name}</span>
                  <span className="text-slate-500">
                    {d.count} · {d.percentage}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h3 className="font-black">Recent Employees</h3>
          <p className="text-xs text-slate-400 mt-1">Latest joined members</p>
          <div className="mt-4 space-y-3">
            {data.recentEmployees.map((e) => (
              <div key={e.id} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                  {e.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold truncate">{e.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {e.profession} · {e.departmentName}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">
                  {e.joinedLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
function Stat({ title, value, sub, icon }) {
  return (
    <div className="card p-5 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-500">{title}</div>
          <div className="text-2xl font-black mt-2 tracking-tight">{value}</div>
          <div className="text-[11px] text-slate-400 mt-2">{sub}</div>
        </div>
        <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Icon name={icon} />
        </div>
      </div>
    </div>
  );
}
