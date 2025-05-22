import axios from "axios";
import { setState } from "../utils/state";
import { authAxios } from "../utils/authAxios"; // ✅ lo separamos si querés (ver más abajo)

const USER_URL = "https://service.todo-api.site/api/user";

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${USER_URL}/register`, {
      name,
      email,
      password
    });

    if (response.data) {
      const { user } = response.data.data;
      setState("justRegistered", true);
      setState("currentUser", user);
      localStorage.setItem("email", user.email);
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

export const getProfile = async () => {
  try {
    const res = await authAxios.get(`${USER_URL}/profile`);
    return res.data.data;
  } catch (error) {
    console.error(
      "Failed to fetch profile:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Could not fetch profile" };
  }
};

export const updateProfile = async (updates) => {
  try {
    const res = await authAxios.put(`${USER_URL}/profile`, updates);
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

export const deleteUser = async () => {
  try {
    const res = await authAxios.delete(`${USER_URL}/delete`);
    return res.data;
  } catch (error) {
    console.error(
      "Failed to delete account:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Could not delete account" };
  }
};

export const updateCredentials = async ({
  currentPassword,
  email,
  password
}) => {
  try {
    const payload = { currentPassword };
    if (email) payload.email = email;
    if (password) payload.password = password;

    if (!email && !password) {
      return { error: "Nothing to update." };
    }

    const res = await authAxios.put(`${USER_URL}/credentials`, payload);
    const { user } = res.data.data;

    if (user.email) {
      setState("currentUser", user);
      localStorage.setItem("email", user.email);
    }

    return { success: true, user };
  } catch (error) {
    console.error(
      "Failed to update credentials:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Could not update credentials"
    };
  }
};
