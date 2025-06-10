import { getTokens, removeTokens, scheduleTokenRefresh } from "./authUtils";
import { logoutUser, refreshAccessToken } from "../api/authApi";
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

export const attachTokenInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
      const errorMsg = error.response?.data?.message?.toLowerCase?.() || "";

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        errorMsg.includes("expired")
      ) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({
              resolve: (token) => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                resolve(axiosInstance(originalRequest));
              },
              reject: (err) => reject(err)
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const { refreshToken } = getTokens();
        try {
          await refreshAccessToken(refreshToken);
          const { accessToken } = getTokens();

          scheduleTokenRefresh();
          processQueue(null, accessToken);

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          processQueue(err, null);
          removeTokens();
          logoutUser();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
