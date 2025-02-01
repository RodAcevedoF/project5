import axios from "axios";

const API_URL = "https://api-to-do.duckdns.org/api/auth";

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password
    });
    return response.data;
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
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Guarda el token en localStorage
    }
    return response.data;
  } catch (error) {
    console.error("Error en el login:", error.response?.data || error.message);
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token"); // Elimina el token del almacenamiento local
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Devuelve true si hay token, false si no.
};
