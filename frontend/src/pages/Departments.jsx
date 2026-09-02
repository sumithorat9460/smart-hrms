import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icons";
export default function Departments() {
  const { user } = useAuth(),
    [data, setData] = useState([]),
    [form, setForm] = useState(null),
    [error, setError] = useState("");
  const load = () => api.get("/departments").then((r) => setData(r.data));
  useEffect(load, []);
  const save = async (e) => {
    e.preventDefault();
    try {
      if (form.id) await api.put(`/departments/${form.id}`, form);
      else await api.post("/departments", form);
      setForm(null);
      load();
    } catch (x) {
      setError(x.response?.data?.message || "Unable to save department");
    }
  };
  const del = async (id) => {
    if (!confirm("Delete this department?")) return;
    try {
      await api.delete(`/departments/${id}`);
      load();
    } catch (x) {
      setError(x.response?.data?.message || "Unable to delete department");
    }
  };
  return (
    <>
      <PageHeader
        title="Departments"
        subtitle="Manage departments, locations and workforce ownership."
        action={
          user?.role === "ADMIN" && (
            <button
              onClick={() => setForm({ name: "", location: "", manager: "" })}
              className="btn btn-primary"
            >
              <Icon name="plus" size={16} /> Add Department
            </button>
          )
        }
      />
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="card table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Department Name</th>
              <th>Manager</th>
              <th>Location</th>
              <th>Employees</th>
              {user?.role === "ADMIN" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td>DEP{String(d.id).padStart(3, "0")}</td>
                <td className="font-bold">{d.name}</td>
                <td>{d.manager || "—"}</td>
                <td>{d.location || "—"}</td>
                <td>
                  <span className="badge bg-blue-50 text-blue-700">
                    {d.employeeCount}
                  </span>
                </td>
                {user?.role === "ADMIN" && (
                  <td>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setForm(d)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                      >
                        <Icon name="edit" size={15} />
                      </button>
                      <button
                        onClick={() => del(d.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {form && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 flex items-center justify-center p-5">
          <form
            onSubmit={save}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <h2 className="text-xl font-black">
              {form.id ? "Edit Department" : "Add Department"}
            </h2>
            <div className="mt-5 space-y-4">
              {["name", "location", "manager"].map((k) => (
                <div key={k}>
                  <label className="label">
                    {k[0].toUpperCase() + k.slice(1)}
                  </label>
                  <input
                    className="input"
                    required={k === "name"}
                    value={form[k] || ""}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setForm(null)}
                className="btn btn-muted"
              >
                Cancel
              </button>
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
