import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Guarda los tokens en localStorage y configura el header por defecto
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

// Elimina los tokens del almacenamiento local
export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Recupera los tokens del almacenamiento local
export const getTokens = () => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken")
});

// Verifica si el usuario está autenticado o intenta refrescar el token si expiró
export const isAuthenticated = async () => {
  const { accessToken, refreshToken } = getTokens();
  if (!accessToken || !refreshToken) return false;

  try {
    const decodedToken = jwtDecode(accessToken);
    const isExpired = decodedToken.exp * 1000 <= Date.now();

    if (!isExpired) return true;

    // Token expirado, intentamos refrescar
    const refreshed = await refreshAccessToken(refreshToken);
    return refreshed;
  } catch (error) {
    console.warn("❌ Token inválido o corrupto. Cerrando sesión.");
    removeTokens();
    return false;
  }
};

// Realiza la llamada al backend para obtener un nuevo accessToken usando el refreshToken
export const refreshAccessToken = async (refreshToken) => {
  try {
    const res = await axios.post(
      "https://service.todo-api.site/api/auth/refresh",
      { refreshToken }
    );

    const tokenData = res.data.data; // 🧠 FIX: usamos la propiedad "data" anidada

    if (tokenData?.accessToken) {
      const { accessToken, refreshToken: newRefreshToken } = tokenData;
      console.log("🔁 Token refreshed:", accessToken);
      setTokens(accessToken, newRefreshToken || refreshToken);
      return true;
    } else {
      console.warn("⚠️ No se recibió un nuevo accessToken.");
      return false;
    }
  } catch (error) {
    console.error("❌ Error al refrescar el token:", error);
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
    const timeUntilRefresh = expiresAt - now - 60_000; // refresco 1 minuto antes

    if (timeUntilRefresh <= 0) {
      refreshAccessToken(refreshToken);
    } else {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        refreshAccessToken(refreshToken).then((ok) => {
          if (ok) scheduleTokenRefresh(); // cadena de refrescos
        });
      }, timeUntilRefresh);
    }
  } catch (error) {
    console.error("❌ Error al programar el refresco automático:", error);
  }
};
