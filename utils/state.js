export const appState = {
    isLoggedIn: false,
    currentUser: null
  };
  
  export const setState = (key, value) => {
    appState[key] = value;
  };
  
  export const getState = (key) => {
    return appState[key];
  };
  