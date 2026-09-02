import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
export default function EmployeeForm() {
  const { id } = useParams(),
    edit = !!id,
    nav = useNavigate(),
    [deps, setDeps] = useState([]),
    [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      status: "ACTIVE",
      joiningDate: new Date().toISOString().slice(0, 10),
    },
  });
  useEffect(() => {
    api.get("/departments").then((r) => setDeps(r.data));
    if (edit) api.get(`/employees/${id}`).then((r) => reset(r.data));
  }, [id]);
  const submit = async (data) => {
    setError("");
    try {
      const payload = {
        ...data,
        departmentId: Number(data.departmentId),
        salary: Number(data.salary),
      };
      if (edit) await api.put(`/employees/${id}`, payload);
      else await api.post("/employees", payload);
      nav("/employees");
    } catch (e) {
      setError(e.response?.data?.message || "Unable to save employee");
    }
  };
  return (
    <>
      <PageHeader
        title={edit ? "Edit Employee" : "Add Employee"}
        subtitle={
          edit
            ? "Update employee information."
            : "Create a new employee record."
        }
      />
      <form
        onSubmit={handleSubmit(submit)}
        className="card p-5 md:p-7 space-y-7"
      >
        <Section title="Personal Information">
          <Field label="First Name" error={errors.firstName}>
            <input
              className="input"
              {...register("firstName", { required: "Required" })}
            />
          </Field>
          <Field label="Last Name" error={errors.lastName}>
            <input
              className="input"
              {...register("lastName", { required: "Required" })}
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              type="email"
              className="input"
              {...register("email", { required: "Required" })}
            />
          </Field>
          <Field label="Phone">
            <input className="input" {...register("phone")} />
          </Field>
          <Field label="Date of Birth">
            <input type="date" className="input" {...register("dateOfBirth")} />
          </Field>
          <Field label="Address">
            <input className="input" {...register("address")} />
          </Field>
        </Section>
        <Section title="Job Information">
          <Field label="Department" error={errors.departmentId}>
            <select
              className="input"
              {...register("departmentId", { required: "Required" })}
            >
              <option value="">Select department</option>
              {deps.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Designation">
            <input className="input" {...register("profession")} />
          </Field>
          <Field label="Joining Date" error={errors.joiningDate}>
            <input
              type="date"
              className="input"
              {...register("joiningDate", { required: "Required" })}
            />
          </Field>
          <Field label="Salary" error={errors.salary}>
            <input
              type="number"
              min="0"
              className="input"
              {...register("salary", { required: "Required" })}
            />
          </Field>
          <Field label="Status">
            <select className="input" {...register("status")}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </Field>
          <Field label="Education">
            <input className="input" {...register("education")} />
          </Field>
        </Section>
        {error && (
          <div className="rounded-xl bg-red-50 text-red-700 p-3 text-sm">
            {error}
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => nav("/employees")}
            className="btn btn-muted"
          >
            Cancel
          </button>
          <button disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting
              ? "Saving..."
              : edit
                ? "Update Employee"
                : "Save Employee"}
          </button>
        </div>
      </form>
    </>
  );
}
function Section({ title, children }) {
  return (
    <section>
      <h3 className="font-black mb-4 pb-3 border-b border-slate-100">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{children}</div>
    </section>
  );
}
function Field({ label, error, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && (
        <div className="text-[11px] text-red-600 mt-1">{error.message}</div>
      )}
    </div>
  );
}
