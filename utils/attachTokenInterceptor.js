// utils/attachTokenInterceptor.js
import { getTokens, refreshAccessToken, removeTokens } from "./authUtils";
import { logoutUser } from "../api/authApi";

export const attachTokenInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        error.response?.data?.message?.includes("expired")
      ) {
        originalRequest._retry = true;

        const { refreshToken } = getTokens();
        const success = await refreshAccessToken(refreshToken);

        if (success) {
          const { accessToken } = getTokens();
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }

        removeTokens();
        logoutUser();
      }

      return Promise.reject(error);
    }
  );
};
