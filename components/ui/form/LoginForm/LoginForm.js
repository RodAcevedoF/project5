import "./LoginForm.css";
import { loginUser } from "../../../../api/authApi";
import { MainBtn } from "../../../../components";
import { handleAuthSuccess } from "../../../../pages/SignLogin/SignLogin";
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
          <p class="forgot-password">Forgot your password? Click here!</p>
          <p id="login-error" style="color: red;"></p>
      </form>
  `;

  div.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = div.querySelector("#login-email").value.trim();
    const password = div.querySelector("#login-password").value.trim();
    const errorMessage = div.querySelector("#login-error");

    try {
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
