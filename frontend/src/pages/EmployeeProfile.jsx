import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icons";
export default function EmployeeProfile() {
  const { id } = useParams(),
    [e, setE] = useState(null);
  useEffect(() => {
    api.get(`/employees/${id}`).then((r) => setE(r.data));
  }, [id]);
  if (!e)
    return <div className="card p-8 text-slate-400">Loading profile...</div>;
  return (
    <>
      <PageHeader
        title="Employee Profile"
        subtitle={`Home / Employees / EMP${String(e.id).padStart(3, "0")}`}
        action={
          <Link to={`/employees/${e.id}/edit`} className="btn btn-primary">
            <Icon name="edit" size={15} /> Edit Profile
          </Link>
        }
      />
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
          <div className="h-20 w-20 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-black">
            {e.firstName[0]}
            {e.lastName[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black">
                {e.firstName} {e.lastName}
              </h2>
              <span
                className={`badge ${e.status === "ACTIVE" ? "badge-active" : "badge-inactive"}`}
              >
                {e.status}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {e.profession} · {e.departmentName}
            </p>
          </div>
        </div>
        <div className="mt-7 grid md:grid-cols-2 gap-x-10 gap-y-5 border-t border-slate-100 pt-6">
          {[
            ["Employee ID", `EMP${String(e.id).padStart(3, "0")}`],
            ["Email", e.email],
            ["Phone", e.phone || "—"],
            ["Department", e.departmentName],
            ["Joining Date", e.joiningDate],
            ["Date of Birth", e.dateOfBirth || "—"],
            [
              "Salary",
              new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(e.salary),
            ],
            ["Education", e.education || "—"],
            ["Address", e.address || "—"],
          ].map(([a, b]) => (
            <div key={a}>
              <div className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">
                {a}
              </div>
              <div className="text-sm font-semibold text-slate-700 mt-1">
                {b}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
