/* import { setState } from "../utils/state.js";
import { isAuthenticated } from "../utils/authUtils.js";
import { changePage } from "../utils/changePage.js";
import { Landing } from "../pages/Landing/Landing.js";
import { Home } from "../pages/Home/Home.js";
import Footer from "../components/Footer/Footer.js";
import { NavBar } from "../components/NavBar/NavBar.js";
import checkSessionTheme from "../utils/sessionTheme.js";

(async function init() {
  const authenticated = await isAuthenticated();
  setState("isLoggedIn", authenticated);
  checkSessionTheme();
  NavBar();

  if (authenticated) {
    changePage(Home, "home");
  } else {
    changePage(Landing, "landing");
  }

  Footer();
})();
 */
import { initAuthFlow } from "../utils/authFlow.js";
import { changePage } from "../utils/changePage.js";
import { Landing } from "../pages/Landing/Landing.js";
import { Home } from "../pages/Home/Home.js";
import Footer from "../components/Footer/Footer.js";
import { NavBar } from "../components/NavBar/NavBar.js";
import checkSessionTheme from "../utils/sessionTheme.js";

(async function init() {
  const authenticated = await initAuthFlow();
  checkSessionTheme();
  NavBar();

  if (authenticated) {
    changePage(Home, "home");
  } else {
    changePage(Landing, "landing");
  }

  Footer();
})();
