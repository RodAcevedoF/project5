import axios from "axios";
import { authAxios } from "../utils/authAxios";
import {
  setTokens,
  removeTokens,
  scheduleTokenRefresh
} from "../utils/authUtils";
import { setState } from "../utils/state";

const AUTH_URL = import.meta.env.VITE_BACKEND_AUTH_URL;
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, { email, password });
    if (response.data) {
      const { accessToken, refreshToken, user } = response.data.data;
      setTokens(accessToken, refreshToken);
      scheduleTokenRefresh();
      setState("isLoggedIn", true);
      setState("currentUser", user);
      localStorage.setItem("name", user.name);
      return response.data;
    } else {
      throw new Error("No tokens received");
    }
  } catch (error) {
    console.error("Error en el login:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Unknown Error" };
  }
};

export const logoutUser = () => {
  removeTokens();
  setState("isLoggedIn", false);
  setState("currentUser", null);
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const res = await axios.post(`${AUTH_URL}/refresh`, { refreshToken });
    const tokenData = res.data.data;
    if (!tokenData?.accessToken || !tokenData?.refreshToken) {
      console.warn("Missing tokens.");
      return false;
    }
    const { accessToken, refreshToken: newRefreshToken } = tokenData;
    setTokens(accessToken, newRefreshToken);
    scheduleTokenRefresh();
    return true;
  } catch (error) {
    console.error("Error setting tokens", error);
    removeTokens();
    return false;
  }
};

export const pingAuth = async () => {
  try {
    const res = await authAxios.get("/auth/ping");
    return res.data; // o simplemente `return true;`
  } catch (error) {
    console.warn("Ping failed:", error.response?.data || error.message);
    return false;
  }
};
