import { getTokens, scheduleTokenRefresh } from "./authUtils.js";
import { logoutUser } from "../api/authApi.js";
import { setState } from "./state.js";
import { getProfile } from "../api/userApi.js";
import { isAuthenticated } from "./authUtils.js";

export const initAuthFlow = async () => {
  const reject = (needsVerification = false) => {
    setState("isLoggedIn", false);
    return { authenticated: false, needsVerification };
  };

  const { accessToken } = getTokens();
  if (!accessToken) return reject();

  const valid = await isAuthenticated();
  if (!valid) return reject();

  try {
    const { user } = await getProfile();
    setState("currentUser", user);

    if (!user.is_verified) return reject(true);

    setState("isLoggedIn", true);
    scheduleTokenRefresh();

    return { authenticated: true, needsVerification: false };
  } catch (error) {
    console.error("Error fetching profile:", error);
    logoutUser();
    return reject();
  }
};
