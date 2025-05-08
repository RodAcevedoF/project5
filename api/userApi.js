import axios from "axios";
import { setState } from "../utils/state";
import { setTokens, removeTokens } from "../utils/authUtils";
import { changePage } from "../utils/changePage";
import { Landing } from "../pages/Landing/Landing";

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

export const getProfile = async () => {
  try {
    const res = await axios.get(`${API_URL}/profile`);
    return res.data.data;
  } catch (error) {
    console.error(
      "Failed to fetch profile:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Could not fetch profile" };
  }
};

// Update user profile
export const updateProfile = async (updates) => {
  try {
    const res = await axios.put(`${API_URL}/profile`, updates);
    const updatedUser = res.data.data;
    setState("currentUser", updatedUser);
    localStorage.setItem("name", updatedUser.name);
    return updatedUser;
  } catch (error) {
    console.error(
      "Failed to update profile:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Could not update profile" };
  }
};

// Delete user account
export const deleteUser = async () => {
  try {
    const res = await axios.delete(`${API_URL}/deleteUser`);
    logoutUser(); // Clear session and app state
    return res.data;
  } catch (error) {
    console.error(
      "Failed to delete account:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Could not delete account" };
  }
};

// Cierre de sesión
export const logoutUser = () => {
  removeTokens();
  setState("isLoggedIn", false);
  setState("currentUser", null);
  changePage(Landing, "landing");
};
