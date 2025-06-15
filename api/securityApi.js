import axios from "axios";
import { authAxios } from "../utils/authAxios";
import { parseApiError } from "../utils/apiError";

const SECURITY_URL = import.meta.env.VITE_BACKEND_SECURITY_URL;

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
