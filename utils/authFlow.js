import { getTokens, scheduleTokenRefresh } from "./authUtils.js";
import { logoutUser } from "../api/authApi.js";
import { setState } from "./state.js";
import { getProfile } from "../api/userApi.js";
import { isAuthenticated } from "./authUtils.js";
import { loadCategories } from "./getPopularCategories.js";

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
    const profile = await getProfile();

    if (profile.error) {
      if (profile.error.includes("not verified")) {
        return reject(true);
      }
      return reject();
    }

    const user = profile.user || profile;
    setState("currentUser", user);

    if (!user.is_verified) return reject(true);

    setState("isLoggedIn", true);
    scheduleTokenRefresh();
    await loadCategories();
    return { authenticated: true, needsVerification: false };
  } catch (error) {
    console.error("Error fetching profile:", error);
    logoutUser();
    return reject();
  }
};
