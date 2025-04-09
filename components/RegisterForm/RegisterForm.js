/* import "./RegisterForm.css";
import { registerUser } from "../../api/userApi";
import { Home } from "../../pages/Home/Home";
import { changePage } from "../../utils/changePage";
import MainBtn from "../MainBtn/MainBtn";
import { LoginForm } from "../LoginForm/LoginForm";
import { setState } from "../../utils/state.js";
import { NavBar } from "../NavBar/NavBar"; 

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
          ${MainBtn("submit", "register-button", "main-btn","Register")}
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
      changePage(Home, "home"); 
      NavBar(); 
    } else {
      errorMessage.textContent = "Error al registrarse";
    }
  });

  div.querySelector(".registered").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("changeForm", { detail: "login" }));
  });

  return div;
};
 */
import "./RegisterForm.css";
import { registerUser } from "../../api/userApi";
import { Home } from "../../pages/Home/Home";
import { changePage } from "../../utils/changePage";
import MainBtn from "../MainBtn/MainBtn";
import { setState } from "../../utils/state.js";
import { NavBar } from "../NavBar/NavBar";

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
          ${MainBtn("submit", "register-button", "main-btn", "Register")}
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

  // Evento para manejar el registro
  div.querySelector("#register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = div.querySelector("#register-name").value.trim();
    const email = div.querySelector("#register-email").value.trim();
    const password = div.querySelector("#register-password").value.trim();
    const errorMessage = div.querySelector("#register-error");

    try {
      const response = await registerUser(name, email, password);

      if (response && response.data && response.data.accessToken) {
        // Guardar tokens y actualizar estado
        const { accessToken, refreshToken, user } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setState("isLoggedIn", true);
        setState("currentUser", user);

        // Redirigir al "home"
        changePage(Home, "home");
      } else {
        throw new Error("Registration failed: Missing tokens");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      errorMessage.textContent =
        error.response?.data?.error ||
        "Error al registrarse. Por favor, intente de nuevo.";
    }
  });

  // Evento para cambiar al formulario de login
  div.querySelector(".registered").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("changeForm", { detail: "login" }));
  });

  return div;
};
