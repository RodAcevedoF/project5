import axios from "axios";
import { isAuthenticated } from "./authUtils";
import { logoutUser } from "./userApi";

// Interceptor que se ejecuta antes de cada solicitud para verificar la autenticación
axios.interceptors.request.use(
  async (config) => {
    const auth = await isAuthenticated();
    if (!auth) {
      logoutUser();
      return Promise.reject(new Error("Usuario no autenticado"));
    }
    return config;
  },
  (error) => Promise.reject(error)
);
