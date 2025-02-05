import { NavBar } from "../components/NavBar/NavBar.js";
import { changePage } from "../utils/changePage.js";
import { Landing } from "../pages/Landing/Landing.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";
import { Home } from "../pages/Home/Home.js";
import Footer from "../components/Footer/Footer.js";

NavBar(); 

if (isAuthenticated()) {
    changePage(Home);
  } else {
changePage(Landing);
}

Footer();
