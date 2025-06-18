import "./RegisterForm.css";
import { registerUser } from "../../../../api/userApi";
import {
  MainBtn,
  showGlobalLoader,
  hideGlobalLoader,
  CheckBox,
  PasswordEye
} from "../../../../components";
import { handleAuthSuccess } from "../../../../pages/SignLogin/SignLogin";
import { validatePasswordsColor } from "../../../../utils";

export const RegisterForm = () => {
  const checkTerms = CheckBox("terms");
  const checkPromotions = CheckBox("promotions");

  const div = document.createElement("div");
  div.innerHTML = `
  <form id="register-form">
    <h2>Register in seconds!</h2>
    <label for="register-name">Name:</label>
    <input type="text" id="register-name" placeholder="John Smith" required>
    <label for="register-email">Email:</label>
    <input type="email" id="register-email" placeholder="example@site.com" required>
    <label for="register-password" class="password-label">Password:
    <input type="password" id="register-password" placeholder="At least 8 characters" required>
    </label>
    <label for="register-password-repeat" class="password-label">Repeat Password:
    <input type="password" id="register-password-repeat" placeholder="Repeat your password" required>
    </label>
    ${MainBtn("submit", "register-button", "main-btn", "Register")}
    <div class="checks">
      <p>I agree to receive promotions and marketing emails</p>
    </div>
    <div class="checks">
      <p>I agree to the <a href="#null">Terms of Service</a> and <a href="#null">Privacy Policy</a></p>
    </div>
    <p class="registered">You have an account? Login!</p>
    <p id="register-error" class="error-message"></p>
  </form>
`;

  const passwordInput = div.querySelector("#register-password");
  const repeatInput = div.querySelector("#register-password-repeat");
  const form = div.querySelector("#register-form");
  const errorMessage = div.querySelector("#register-error");
  const checks = div.querySelectorAll(".checks");
  checks[0].insertAdjacentElement("afterbegin", checkPromotions);
  checks[1].insertAdjacentElement("afterbegin", checkTerms);

  const eyePass = PasswordEye(passwordInput, "password");
  passwordInput.insertAdjacentElement("afterend", eyePass);

  const repeatEyePass = PasswordEye(repeatInput, "repeat-password");
  repeatInput.insertAdjacentElement("afterend", repeatEyePass);

  passwordInput.addEventListener("input", () =>
    validatePasswordsColor(passwordInput, repeatInput)
  );
  repeatInput.addEventListener("input", () =>
    validatePasswordsColor(passwordInput, repeatInput)
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMessage.textContent = "";

    const name = div.querySelector("#register-name").value.trim();
    const email = div.querySelector("#register-email").value.trim();
    const password = passwordInput.value.trim();
    const repeat = repeatInput.value.trim();

    if (!name || !email || !password || !repeat) {
      errorMessage.textContent = "Please fill in all required fields.";
      return;
    }

    if (password !== repeat) {
      errorMessage.textContent = "Passwords do not match.";
      repeatInput.focus();
      return;
    }

    try {
      showGlobalLoader();
      const response = await registerUser(name, email, password);

      if (response?.data) {
        await handleAuthSuccess(response);
      } else {
        throw new Error(response?.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      errorMessage.textContent =
        error?.response?.data?.error ||
        error.message ||
        "Unexpected error during registration.";
    } finally {
      hideGlobalLoader();
    }
  });

  div.querySelector(".registered").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("changeForm", { detail: "login" }));
  });

  return div;
};
