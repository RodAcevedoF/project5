import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Coloca en localStorage los tokens
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

// Elimina los tokens de localStorage
export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Extrae los tokens desde localStorage
export const getTokens = () => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken")
});

// Verifica si el usuario está autenticado.
// Si el accessToken ha expirado, se intenta refrescarlo.
export const isAuthenticated = async () => {
  const { accessToken, refreshToken } = getTokens();
  if (!accessToken || !refreshToken) return false;

  try {
    const decodedToken = jwtDecode(accessToken);

    // Si el token aún no ha expirado, retornamos true.
    if (decodedToken.exp * 1000 > Date.now()) {
      return true;
    }

    // Si expiró, se intenta refrescar el accessToken usando el refreshToken.
    const refreshed = await refreshAccessToken(refreshToken);
    return refreshed;
  } catch (error) {
    removeTokens();
    return false;
  }
};

// Función que realiza la llamada al backend para refrescar el accessToken.
export const refreshAccessToken = async (refreshToken) => {
  try {
    const res = await axios.post(
      "https://service.todo-api.site/api/auth/refresh",
      {
        refreshToken
      }
    );

    const tokenData = res.data;

    if (tokenData?.accessToken) {
      const { accessToken, refreshToken: newRefreshToken } = tokenData;
      setTokens(accessToken, newRefreshToken || refreshToken);
      return true;
    } else {
      console.warn("No se recibió un nuevo accessToken. Datos:", res.data);
      return false;
    }
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return false;
  }
};

let refreshTimeout = null;

export const scheduleTokenRefresh = () => {
  const { accessToken, refreshToken } = getTokens();
  if (!accessToken || !refreshToken) return;

  try {
    const decodedToken = jwtDecode(accessToken);
    const expiresAt = decodedToken.exp * 1000; // milisegundos
    const now = Date.now();

    const timeUntilRefresh = expiresAt - now - 60_000; // 1 minuto antes de que expire

    if (timeUntilRefresh <= 0) {
      refreshAccessToken(refreshToken); // si ya está vencido o por vencer, lo refresca ya
    } else {
      clearTimeout(refreshTimeout); // evita duplicados
      refreshTimeout = setTimeout(() => {
        refreshAccessToken(refreshToken).then((ok) => {
          if (ok) {
            scheduleTokenRefresh(); // programa el siguiente refresh
          }
        });
      }, timeUntilRefresh);
    }
  } catch (error) {
    console.error("Error al programar el refresco automático:", error);
  }
};
