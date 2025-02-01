import "./Navbar.css";
import { changePage } from "../../utils/changePage.js";
import { Landing } from "../../pages/Landing/Landing.js";
/* import { Home } from "../pages/Home.js"; */
import { isAuthenticated, logoutUser } from "../../api/userApi.js";

export const NavBar = () => {
  const header = document.querySelector("header");
  header.innerHTML = `
    <nav class="navbar">
        <h1 class="logo">To-Do App</h1>
        <div class="nav-links">
            ${
              isAuthenticated()
                ? `<button id="logout-btn">Cerrar Sesión</button>`
                : `<button id="landing-btn">Inicio</button>`
            }
        </div>
    </nav>
  `;

  // Evento para regresar a Landing si no está autenticado
  if (!isAuthenticated()) {
    document
      .getElementById("landing-btn")
      .addEventListener("click", () => changePage(Landing));
  }

  // Evento para cerrar sesión
  if (isAuthenticated()) {
    document.getElementById("logout-btn").addEventListener("click", () => {
      logoutUser();
      changePage(Landing);
    });
  }
};
