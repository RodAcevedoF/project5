  export const appState = {
    isLoggedIn: false,
    currentUser: null,
    currentPage: "landing",
    currentForm: "",
    bookCards: {},       // Mapa de tarjetas guardadas
    currentSavedCard: null  // Tarjeta guardada actualmente mostrada
  };

  export const setState = (key, value) => {
    appState[key] = value;
  };

  export const getState = (key) => {
    return appState[key];
  };
