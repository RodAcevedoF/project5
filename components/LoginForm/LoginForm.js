import "./LoginForm.css";
import { loginUser } from "../../api/userApi";
import { changePage } from "../../utils/changePage";
import { Home } from "../../pages/Home/Home";
import MainBtn from "../MainBtn/MainBtn";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { setState } from "../../utils/state.js";
import { NavBar } from "../NavBar/NavBar.js";

export const LoginForm = () => {
  const div = document.createElement("div");
  div.innerHTML = `
      <form id="login-form">
          <h2>Nice to see you back!</h2>
          <label for="login-email">Email:</label>
          <input type="email" id="login-email" placeholder="example@site.com" required>
          <label for="login-password">Password:</label>
          <input type="password" id="login-password" placeholder="At least 8 characters" required>
          ${MainBtn("submit", "login-button", "main-btn", "Go in!")}
          <p class="no-registered">Still no account? Register!</p>
          <p id="login-error" style="color: red;"></p>
      </form>
  `;

  div.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = div.querySelector("#login-email").value;
    const password = div.querySelector("#login-password").value;
    const errorMessage = div.querySelector("#login-error");

    const response = await loginUser(email, password);
    if (response && response.data && response.data.token) {
      changePage(Home, "home"); 
      NavBar(); 
    } else {
      errorMessage.textContent = "Error al iniciar sesión";
    }
  });
  
  div.querySelector(".no-registered").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("changeForm", { detail: "register" }));
  });

  return div;
};
