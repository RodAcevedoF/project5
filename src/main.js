import { initAuthFlow } from "../utils/authFlow.js";
import { changePage } from "../utils/changePage.js";
import { Landing } from "../pages/Landing/Landing.js";
import { Home } from "../pages/Home/Home.js";
import { Footer } from "../components";
import { NavBar } from "../components";
import checkSessionTheme from "../utils/sessionTheme.js";
import { VerifyPending } from "../pages/VerifyPending/VerifyPending.js";
import { SignLogin } from "../pages/SignLogin/SignLogin.js";
import { hideGlobalLoader, showGlobalLoader } from "../components/index.js";

(async function initApp() {
  checkSessionTheme();
  showGlobalLoader();

  const renderLayout = () => {
    NavBar();
    Footer();
    hideGlobalLoader();
  };

  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");
  const token = params.get("token");
  const email = params.get("email");

  if (["success", "invalid"].includes(status)) {
    changePage(VerifyPending, "verify-pending");
    return renderLayout();
  }

  if (token && email) {
    changePage(SignLogin, "signlogin");
    return renderLayout();
  }

  const { authenticated, needsVerification } = await initAuthFlow();
  console.log("🔐 Auth flow result:", { authenticated, needsVerification });

  if (authenticated) {
    changePage(Home, "home");
  } else if (needsVerification) {
    changePage(VerifyPending, "verify-pending");
  } else {
    changePage(Landing, "landing");
  }

  renderLayout();
})();
