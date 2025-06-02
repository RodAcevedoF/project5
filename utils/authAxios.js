// utils/authAxios.js
import axios from "axios";
import { attachTokenInterceptor } from "./attachTokenInterceptor";

export const authAxios = axios.create({
  baseURL: "https://service.todo-api.site/api"
});

// Setea token al vuelo antes de cada request
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de renovación automática si expiró
attachTokenInterceptor(authAxios);
