import { getTokens, scheduleTokenRefresh } from "./authUtils.js";
import { logoutUser } from "../api/authApi.js";
import { setState } from "./state.js";
import { getProfile } from "../api/userApi.js";
import { isAuthenticated } from "./authUtils.js";

export const initAuthFlow = async () => {
  const { accessToken } = getTokens();

  if (!accessToken) {
    setState("isLoggedIn", false);
    return { authenticated: false, needsVerification: false };
  }

  const valid = await isAuthenticated();

  if (!valid) {
    setState("isLoggedIn", false);
    return { authenticated: false, needsVerification: false };
  }

  try {
    const { user } = await getProfile();

    setState("currentUser", user);

    if (!user.is_verified) {
      setState("isLoggedIn", false);
      return { authenticated: false, needsVerification: true };
    }

    setState("isLoggedIn", true);
    scheduleTokenRefresh();
    return { authenticated: true, needsVerification: false };
  } catch (error) {
    console.error("Error fetching profile:", error);
    logoutUser();
    return { authenticated: false, needsVerification: false };
  }
};
