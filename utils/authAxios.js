import axios from "axios";
import { attachTokenInterceptor } from "./attachTokenInterceptor";

export const authAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

attachTokenInterceptor(authAxios);
