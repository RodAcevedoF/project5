import { initAuthFlow } from "../utils/authFlow.js";
import { changePage } from "../utils/changePage.js";
import { Landing } from "../pages/Landing/Landing.js";
import { Home } from "../pages/Home/Home.js";
import Footer from "../components/Footer/Footer.js";
import { NavBar } from "../components/NavBar/NavBar.js";
import checkSessionTheme from "../utils/sessionTheme.js";
import { VerifyPending } from "../pages/VerifyPending/VerifyPending.js";
import { SignLogin } from "../pages/SignLogin/SignLogin.js";

(async function init() {
  checkSessionTheme();
  NavBar();

  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");
  const token = params.get("token");
  const email = params.get("email");

  if (["success", "invalid"].includes(status)) {
    changePage(VerifyPending, "verify-pending");
    Footer();
    return;
  }

  if (token && email) {
    changePage(SignLogin, "signlogin");
    Footer();
    return;
  }

  const { authenticated, needsVerification } = await initAuthFlow();

  if (authenticated) {
    changePage(Home, "home");
  } else if (needsVerification) {
    changePage(VerifyPending, "verify-pending");
  } else {
    changePage(Landing, "landing");
  }

  Footer();
})();
