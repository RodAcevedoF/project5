/* import axios from "axios";
import { getState, setState } from "../utils/state";

const API_URL = "https://service.todo-api.site/api/auth";

// Registro de usuario
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password
    });

    if (response.data) {
      const { accessToken, refreshToken, user } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setState("isLoggedIn", true);
      setState("currentUser", user);
      localStorage.setItem("name", user.name);
      return response.data;
    }
  } catch (error) {
    console.error(
      "Error en el registro:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Unknown Error" };
  }
};

// Inicio de sesión
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data) {
      const { accessToken, refreshToken, user } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setState("isLoggedIn", true);
      setState("currentUser", user);
      localStorage.setItem("name", user.name);
      return response.data;
    } else {
      throw new Error("No tokens received");
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Unknown Error" };
  }
};

// Cierre de sesión
export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  setState("isLoggedIn", false);
  setState("currentUser", null);
};
 */
import axios from "axios";
import { setState } from "../utils/state";
import { setTokens, removeTokens } from "../utils/authUtils";

const API_URL = "https://service.todo-api.site/api/auth";

// Registro de usuario
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password
    });

    if (response.data) {
      const { accessToken, refreshToken, user } = response.data.data;
      setTokens(accessToken, refreshToken);
      setState("isLoggedIn", true);
      setState("currentUser", user);
      localStorage.setItem("name", user.name);
      return response.data;
    }
  } catch (error) {
    console.error(
      "Error en el registro:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Unknown Error" };
  }
};

// Inicio de sesión
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data) {
      const { accessToken, refreshToken, user } = response.data.data;
      setTokens(accessToken, refreshToken);
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

// Cierre de sesión
export const logoutUser = () => {
  removeTokens();
  setState("isLoggedIn", false);
  setState("currentUser", null);
};
