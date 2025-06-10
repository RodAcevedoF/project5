import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "../api/authApi";

// Guarda los tokens en localStorage
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  console.log("🧪 Guardado en localStorage:", refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getTokens = () => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken")
});

export const isAuthenticated = async () => {
  const { accessToken, refreshToken } = getTokens();
  if (!accessToken || !refreshToken) return false;

  try {
    const decodedToken = jwtDecode(accessToken);
    const isExpired = decodedToken.exp * 1000 <= Date.now();
    if (!isExpired) return true;

    const wasRefreshed = await refreshAccessToken(refreshToken);
    return wasRefreshed;
  } catch (error) {
    console.warn("Invalid token, closing session.");
    removeTokens();
    return false;
  }
};

let refreshTimeout = null;

// Programa el refresco automático antes de que expire el accessToken
export const scheduleTokenRefresh = () => {
  const { accessToken, refreshToken } = getTokens();
  if (!accessToken || !refreshToken) return;

  try {
    const decodedToken = jwtDecode(accessToken);
    const expiresAt = decodedToken.exp * 1000;
    const now = Date.now();
    const timeUntilRefresh = expiresAt - now - 60_000;

    clearTimeout(refreshTimeout); // por las dudas

    if (timeUntilRefresh <= 0) {
      refreshAccessToken(refreshToken); // Esto ya reprograma
    } else {
      refreshTimeout = setTimeout(() => {
        refreshAccessToken(refreshToken); // el refresh se encarga del schedule
      }, timeUntilRefresh);
    }
  } catch (error) {
    console.error("Error on refresh schedule:", error);
  }
};
