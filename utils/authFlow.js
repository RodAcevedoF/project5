// utils/authFlow.js
import axios from "axios";
import {
  isAuthenticated,
  scheduleTokenRefresh,
  getTokens,
  setTokens
} from "./authUtils.js";
import { logoutUser } from "../api/userApi.js";
import { setState } from "./state.js";
import { changePage } from "./changePage.js";
import { Home } from "../pages/Home/Home.js";

// Interceptor que refresca el token antes de cada request
const setupAxiosInterceptor = () => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/refresh")
      ) {
        originalRequest._retry = true;

        const { refreshToken } = getTokens();

        try {
          const res = await axios.post(
            "https://service.todo-api.site/api/auth/refresh",
            { refreshToken }
          );

          const { accessToken, refreshToken: newRefreshToken } = res.data.data;
          setTokens(accessToken, newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return axios(originalRequest);
        } catch (refreshError) {
          logoutUser();
          return Promise.reject(refreshError);
        }
      }
      logoutUser();
      return Promise.reject(error);
    }
  );
};

export const initAuthFlow = async () => {
  const authenticated = await isAuthenticated();
  setState("isLoggedIn", authenticated);

  const { accessToken } = getTokens();
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  if (authenticated) {
    changePage(Home, "home");
    scheduleTokenRefresh();
  }

  setupAxiosInterceptor();
  return authenticated;
};
