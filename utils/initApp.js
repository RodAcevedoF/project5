import { handleRoute } from "./router.js";
import { checkSessionTheme } from "./sessionTheme.js";
import { showGlobalLoader, hideGlobalLoader } from "../components";
import { initAuthFlow } from "./authFlow.js";

export async function initApp() {
  checkSessionTheme();
  showGlobalLoader();
  await initAuthFlow();
  await handleRoute();
  hideGlobalLoader();
}
