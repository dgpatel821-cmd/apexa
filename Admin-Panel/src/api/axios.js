import axios from "axios";

const instance = axios.create({
  baseURL: "http://apexadmin.online/api",
});

// attach token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;