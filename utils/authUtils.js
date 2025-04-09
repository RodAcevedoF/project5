import { jwtDecode } from "jwt-decode";

// Coloca en localStorage los tokens
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
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
    const response = await fetch(
      "https://service.todo-api.site/api/auth/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      }
    );

    if (response.ok) {
      const data = await response.json();
      const { accessToken: newAccessToken } = data.data;
      // Actualizamos el accessToken (puedes actualizar también el refreshToken si el backend lo retorna)
      setTokens(newAccessToken, refreshToken);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return false;
  }
};
