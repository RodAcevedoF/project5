import axios from "axios";
import { getState, setState } from "../utils/state";
const API_URL = "https://service.todo-api.site/api/auth";

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password
    });
    if (response.data) {
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      setState("isLoggedIn", true);
      setState("currentUser", user);
      localStorage.setItem("name", user.name)
      return response.data;
    }
  } catch (error) {
    console.error(
      "Error en el registro:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data) {
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      setState("isLoggedIn", true);
      setState("currentUser", user);
      localStorage.setItem("name", user.name)
      return response.data;
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Unknown Error" };
  }
};


export const logoutUser = () => {
  localStorage.removeItem("token");
  setState("isLoggedIn", false);
  setState("currentUser", null);
};
