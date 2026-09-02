import axios from "axios";
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "/api" });
api.interceptors.request.use((c) => {
  const t = localStorage.getItem("smart_hrms_token");
  if (t) c.headers.Authorization = `Bearer ${t}`;
  return c;
});
api.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e.response?.status === 401 && location.pathname !== "/login") {
      localStorage.removeItem("smart_hrms_token");
      localStorage.removeItem("smart_hrms_user");
      location.href = "/login";
    }
    return Promise.reject(e);
  },
);
export default api;
