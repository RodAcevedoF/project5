import axios from "axios";
import { setTokens, removeTokens } from "../utils/authUtils";
import { setState } from "../utils/state";
import { changePage } from "../utils/changePage";
import { Landing } from "../pages/Landing/Landing";

const AUTH_URL = "https://service.todo-api.site/api/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, { email, password });
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

export const logoutUser = () => {
  removeTokens();
  setState("isLoggedIn", false);
  setState("currentUser", null);
  changePage(Landing, "landing");
};
