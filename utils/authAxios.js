import axios from "axios";

export const authAxios = axios.create({
  baseURL: "https://service.todo-api.site/api"
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
