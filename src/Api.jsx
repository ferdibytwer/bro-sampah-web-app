import axios from "axios";

const env = {
    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8080",
    appName: import.meta.env.VITE_APP_NAME || "bro-sampah",
}

const api = axios.create({
  baseURL: `${env.apiUrl}/v1`,
});

api.interceptors.request.use((config) => {
  const role = localStorage.getItem("role");
  if (role) {
    config.headers.Authorization = `Bearer ${role}`;
  }
  return config;
});

export default api
