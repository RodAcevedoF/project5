  export const appState = {
    isLoggedIn: false,
    currentUser: null,
    currentPage: "landing",
    currentForm: "",
    bookCards: {},   
    currentSavedCard: null  
  };

  export const setState = (key, value) => {
    appState[key] = value;
  };

  export const getState = (key) => {
    return appState[key];
  };
