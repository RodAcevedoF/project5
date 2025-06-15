const appState = {
  isLoggedIn: false,
  currentUser: null,
  currentPage: "landing",
  currentForm: "",
  currentToggle: "",
  bookCards: {},
  bookCategories: [],
  videoCards: {},
  videoCategories: [],
  justRegistered: "",
  defaultSearchResults: null,
  todos: []
};

export const setState = (key, value) => {
  if (!Object.prototype.hasOwnProperty.call(appState, key)) {
    console.error(
      `The key "${key}" doesn't exist in the state, please verify.`
    );
    return;
  }
  appState[key] = value;
  document.dispatchEvent(
    new CustomEvent("stateUpdated", { detail: { key, value } })
  );
};

export const getState = (key) => {
  if (!Object.prototype.hasOwnProperty.call(appState, key)) {
    console.error(
      `The key "${key}" doesn't exist in the state, please verify.`
    );
    return null;
  }
  return JSON.parse(JSON.stringify(appState[key]));
};

export const onStateUpdated = (key, callback) => {
  if (key === "bookCards") {
    callback();
  }
};
