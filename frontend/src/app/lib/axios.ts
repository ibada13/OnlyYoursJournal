import axios from "axios";
import type { AxiosRequestConfig ,AxiosInstance} from "axios";

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const api: AxiosInstance = axios.create(config);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
