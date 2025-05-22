const appState = {
  isLoggedIn: false,
  currentUser: null,
  currentPage: "landing",
  currentForm: "",
  currentToggle: "",
  bookCards: {}, // Cambiado a un objeto para evitar manipulación incorrecta como en el caso de los índices de arrays.
  currentSavedCard: null,
  categories: [],
  bookCategories: [],
  videoCards: {},
  videoCategories: [],
  justRegistered: ""
};

// Función para actualizar el estado global
export const setState = (key, value) => {
  if (!Object.prototype.hasOwnProperty.call(appState, key)) {
    console.error(
      `La clave "${key}" no existe en el estado. Por favor, verifica.`
    );
    return;
  }
  appState[key] = value;
  document.dispatchEvent(
    new CustomEvent("stateUpdated", { detail: { key, value } })
  );
};

// Función para obtener valores del estado global
export const getState = (key) => {
  if (!Object.prototype.hasOwnProperty.call(appState, key)) {
    console.error(
      `La clave "${key}" no existe en el estado. Por favor, verifica.`
    );
    return null;
  }
  return JSON.parse(JSON.stringify(appState[key]));
};

export const onStateUpdated = (key, callback) => {
  if (key === "bookCards") {
    callback(); // Ejecuta el callback cuando el estado se actualiza.
  }
};
