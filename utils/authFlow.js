// utils/authFlow.js
import axios from "axios";
import {
  isAuthenticated,
  scheduleTokenRefresh,
  getTokens
} from "./authUtils.js";
import { logoutUser } from "../api/userApi.js";
import { setState } from "./state.js";

// Interceptor que refresca el token antes de cada request
const setupAxiosInterceptor = () => {
  axios.interceptors.request.use(
    async (config) => {
      const auth = await isAuthenticated();
      if (!auth) {
        logoutUser(); // borra tokens y redirige si quieres
        throw new axios.Cancel("Sesión expirada");
      }

      const { accessToken } = getTokens();
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export const initAuthFlow = async () => {
  const authenticated = await isAuthenticated();
  setState("isLoggedIn", authenticated);

  if (authenticated) {
    scheduleTokenRefresh(); // Programa el refresco automático
  }

  setupAxiosInterceptor(); // Asegura que esté activo desde el principio
  return authenticated;
};
