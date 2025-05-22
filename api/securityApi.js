import axios from "axios";
import { authAxios } from "../utils/authAxios";
import { parseApiError } from "../utils/apiError";

const SECURITY_URL = "https://service.todo-api.site/api/security";

// Verifica el email (con token del link)
export const verifyEmail = async (token) => {
  try {
    const res = await axios.get(`${SECURITY_URL}/verify?token=${token}`);
    return res.data;
  } catch (error) {
    console.error("Failed to verify email:", error);
    return {
      error: parseApiError(error, "Email verification failed.")
    };
  }
};

// Solicita nuevo token de verificación (requiere estar autenticado)
export const requestEmailVerification = async () => {
  try {
    const res = await authAxios.post(`${SECURITY_URL}/verify/request`);
    const token = res?.data?.data?.token;
    if (!token) throw new Error("No token received");
    return token;
  } catch (error) {
    console.error("Error al solicitar nuevo token:", error);
    return { error: parseApiError(error, "No se pudo generar token") };
  }
};

// Solicita token de recuperación de contraseña (solo email)
export const requestPasswordReset = async (email) => {
  try {
    const res = await axios.post(`${SECURITY_URL}/password/reset/request`, {
      email
    });
    return res.data;
  } catch (error) {
    console.error("Error al solicitar reseteo:", error);
    return { error: parseApiError(error, "No se pudo generar token") };
  }
};

// Cambia la contraseña usando el token
export const resetPassword = async (token, newPassword) => {
  try {
    const res = await axios.post(`${SECURITY_URL}/password/reset`, {
      token,
      newPassword
    });
    return res.data;
  } catch (error) {
    console.error("Error al resetear contraseña:", error);
    return { error: parseApiError(error, "No se pudo cambiar la contraseña") };
  }
};
