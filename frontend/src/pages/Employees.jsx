import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icons";
export default function Employees() {
  const [data, setData] = useState(null),
    [q, setQ] = useState(""),
    [page, setPage] = useState(0),
    [status, setStatus] = useState(""),
    [departments, setDepartments] = useState([]),
    [error, setError] = useState("");
  const nav = useNavigate();
  const load = () =>
    api
      .get("/employees", {
        params: {
          q: q || undefined,
          status: status || undefined,
          page,
          size: 8,
          sort: "id",
          dir: "desc",
        },
      })
      .then((r) => setData(r.data))
      .catch(() => setError("Unable to load employees"));
  useEffect(() => {
    api.get("/departments").then((r) => setDepartments(r.data));
  }, []);
  useEffect(() => {
    load();
  }, [page, status]);
  const search = (e) => {
    e.preventDefault();
    setPage(0);
    load();
  };
  const del = async (id) => {
    if (!confirm("Delete this employee?")) return;
    try {
      await api.delete(`/employees/${id}`);
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Delete failed");
    }
  };
  return (
    <>
      <PageHeader
        title="Employees"
        subtitle="Manage your organization’s people and records."
        action={
          <button
            onClick={() => nav("/employees/new")}
            className="btn btn-primary"
          >
            <Icon name="plus" size={16} /> Add Employee
          </button>
        }
      />
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="card overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between border-b border-slate-100">
          <form onSubmit={search} className="flex gap-2 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Icon name="search" size={16} />
              <input
                className="input pl-9"
                placeholder="Search employee..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <button className="btn btn-muted">Search</button>
          </form>
          <select
            className="input md:w-44"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!data ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    Loading...
                  </td>
                </tr>
              ) : (
                data.content.map((e) => (
                  <tr key={e.id}>
                    <td className="font-bold text-slate-500">
                      EMP{String(e.id).padStart(3, "0")}
                    </td>
                    <td>
                      <Link
                        to={`/employees/${e.id}`}
                        className="font-bold text-slate-800 hover:text-blue-600"
                      >
                        {e.firstName} {e.lastName}
                      </Link>
                    </td>
                    <td>{e.email}</td>
                    <td>{e.departmentName}</td>
                    <td>{e.profession || "—"}</td>
                    <td>
                      <span
                        className={`badge ${e.status === "ACTIVE" ? "badge-active" : "badge-inactive"}`}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <Link
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                          to={`/employees/${e.id}`}
                        >
                          <Icon name="eye" size={15} />
                        </Link>
                        <Link
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                          to={`/employees/${e.id}/edit`}
                        >
                          <Icon name="edit" size={15} />
                        </Link>
                        <button
                          onClick={() => del(e.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                        >
                          <Icon name="trash" size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
          <span>
            Showing {data?.numberOfElements || 0} of {data?.totalElements || 0}{" "}
            entries
          </span>
          <div className="flex gap-1">
            {Array.from({ length: data?.totalPages || 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-8 min-w-8 rounded-lg ${page === i ? "bg-blue-600 text-white" : "hover:bg-slate-100"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
