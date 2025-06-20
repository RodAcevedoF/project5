import "./LoginForm.css";
import { loginUser } from "../../../../api";
import { MainBtn, PasswordEye } from "../../../../components";
import { handleAuthSuccess } from "../../../../pages/SignLogin/SignLogin";
export const LoginForm = () => {
  const div = document.createElement("div");
  div.innerHTML = `
      <form id="login-form">
          <h2>Nice to see you back!</h2>
          <label for="login-email">Email:
          <input type="email" id="login-email" placeholder="example@site.com" required>
          </label>
          <label for="login-password">Password:
          <input type="password" id="login-password" placeholder="At least 8 characters" required>
          </label>
          ${MainBtn("submit", "login-button", "main-btn", "Go in!")}
          <p class="no-registered">Still no account? Register!</p>
          <p class="forgot-password">Forgot your password? Click here!</p>
          <p id="login-error" style="color: red;"></p>
      </form>
  `;

  const inputEmail = div.querySelector("#login-email");
  const inputPass = div.querySelector("#login-password");
  const errorMessage = div.querySelector("#login-error");
  const passwordEye = PasswordEye(inputPass, "login");
  inputPass.insertAdjacentElement("afterend", passwordEye);
  div.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const email = inputEmail.value.trim();
      const password = inputPass.value.trim();
      const response = await loginUser(email, password);
      if (response?.data) {
        handleAuthSuccess(response);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error in login process:", error);
      errorMessage.textContent = "Error in login, check your credentials.";
    }
  });

  div.querySelector(".no-registered").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("changeForm", { detail: "register" }));
  });

  div.querySelector(".forgot-password").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("changeForm", { detail: "recover" }));
  });

  return div;
};
