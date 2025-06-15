import { pingAuth } from "../api/authApi.js";
import { getState, setState } from "./state.js";
import { handleRoute } from "./router.js";
import { removeTokens } from "./authUtils.js";

export const authGuard = async (next, fallback = "/") => {
  const isLoggedIn = getState("isLoggedIn");

  if (!isLoggedIn) {
    console.warn("Not logged in, redirecting.");
    history.pushState({}, "", fallback);
    return handleRoute();
  }

  try {
    const valid = await pingAuth();
    if (!valid) throw new Error("Invalid token");
    return next();
  } catch (err) {
    console.error("Expired token. Cleaning state.");
    removeTokens();
    setState("isLoggedIn", false);
    setState("currentUser", null);
    history.pushState({}, "", fallback);
    return handleRoute();
  }
};
