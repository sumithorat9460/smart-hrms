import { createContext, useContext, useMemo, useState } from "react";
import api from "../services/api";
const C = createContext(null);
export function AuthProvider({ children }) {
  const [u, setU] = useState(() =>
    JSON.parse(localStorage.getItem("smart_hrms_user") || "null"),
  );
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    const user = { email: data.email, role: data.role };
    localStorage.setItem("smart_hrms_token", data.token);
    localStorage.setItem("smart_hrms_user", JSON.stringify(user));
    setU(user);
    return user;
  };
  const logout = () => {
    localStorage.removeItem("smart_hrms_token");
    localStorage.removeItem("smart_hrms_user");
    setU(null);
  };
  return (
    <C.Provider
      value={useMemo(
        () => ({ user: u, login, logout, isAuthenticated: !!u }),
        [u],
      )}
    >
      {children}
    </C.Provider>
  );
}
export const useAuth = () => useContext(C);
