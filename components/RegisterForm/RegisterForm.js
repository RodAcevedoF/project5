import "./RegisterForm.css";
import { registerUser } from "../../api/userApi";
import MainBtn from "../MainBtn/MainBtn";
import { handleAuthSuccess } from "../../pages/SignLogin/SignLogin";

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

    <p id="register-error" class="error-message"></p>
  `;

  const form = div.querySelector("#register-form");
  const errorMessage = div.querySelector("#register-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMessage.textContent = "";

    const name = div.querySelector("#register-name").value.trim();
    const email = div.querySelector("#register-email").value.trim();
    const password = div.querySelector("#register-password").value.trim();

    if (!name || !email || !password) {
      errorMessage.textContent = "Please fill in all required fields.";
      return;
    }

    try {
      const response = await registerUser(name, email, password);

      if (response?.data) {
        await handleAuthSuccess(response);
      } else {
        throw new Error(response?.error || "Registration failed");
      }
    } catch (error) {
      console.error("❌ Error during registration:", error);
      errorMessage.textContent =
        error?.response?.data?.error ||
        error.message ||
        "Unexpected error during registration.";
    }
  });

  // Cambio a login
  div.querySelector(".registered").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("changeForm", { detail: "login" }));
  });

  return div;
};
