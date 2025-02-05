import "./RegisterForm.css";
import { registerUser } from "../../api/userApi";
import { Home } from "../../pages/Home/Home";
import { changePage } from "../../utils/changePage";
import MainBtn from "../MainBtn/MainBtn";
import { LoginForm } from "../LoginForm/LoginForm";
import { setState } from "../../utils/state.js"; // Importamos setState
import { NavBar } from "../NavBar/NavBar"; // Importamos NavBar para actualizarla

export const RegisterForm = () => {
  const div = document.createElement("div");
  div.innerHTML = `
        <form id="register-form">
          <h2>Register in seconds!</h2>
          <label for="register-name">Name:</label>
          <input type="text" id="register-name" placeholder="John Smith" required>
          <label for="register-email">Email:</label>
          <input type="email" id="register-email" placeholder="example@site.com" required>
          <label for="register-password">Password:</label>
          <input type="password" id="register-password" placeholder="At least 8 characters" required>
          ${MainBtn("submit", "register-button", "Register")}
          <div class="checks">
            <input type="checkbox" id="promotions" required>
            <label for="promotions">I agree to receive promotions and marketing emails</label>
          </div>
          <div class="checks">
            <input type="checkbox" id="terms" required>
            <label for="terms">I agree to the <a href="#null">Terms of Service</a> and <a href="#null">Privacy Policy</a></label>
          </div>
          <p class="registered">You have an account? Login!</p>
        </form>
        <p id="register-error" style="color: red;"></p>
  `;

  div.querySelector("#register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = div.querySelector("#register-name").value;
    const email = div.querySelector("#register-email").value;
    const password = div.querySelector("#register-password").value;
    const errorMessage = div.querySelector("#register-error");

    const response = await registerUser(name, email, password);
  
    if (response && response.data && response.data.token) {
      // Guardamos el token en localStorage
      localStorage.setItem("token", response.data.token);

      // Actualizamos el estado global
      setState('isLoggedIn', true);
      // Si tienes información del usuario, puedes guardarla
      // setState('currentUser', response.data.user);

      changePage(Home); // Cambiamos a la página Home
      NavBar(); // Actualizamos la barra de navegación
    } else {
      errorMessage.textContent = "Error al registrarse";
    }
  });

  div.querySelector(".registered").addEventListener("click", () => {
    div.innerHTML = "";
    div.appendChild(LoginForm());
  });

  return div;
};
