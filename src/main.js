import { NavBar } from "../components/NavBar/NavBar.js";
import { changePage } from "../utils/changePage.js";
import { Landing } from "../pages/Landing/Landing.js";
/* import { Home } from "./pages/Home.js"; // Lo implementaremos después */

NavBar(); // Renderiza el Navbar

// Enlace de páginas con efectos de transición
changePage(Landing);

// Enlazar botones a Home cuando el usuario inicie sesión (se agregará después)
