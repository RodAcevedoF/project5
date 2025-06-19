import "./PasswordForm.css";
import {
  MainBtn,
  showGlobalLoader,
  hideGlobalLoader,
  PasswordEye
} from "../../../../components";
import {
  requestPasswordReset,
  resetPassword
} from "../../../../api/securityApi";
import {
  showSuccess,
  showError,
  sendUserEmail,
  validatePasswordsColor
} from "../../../../utils";

export const PasswordForm = ({
  recoverMode = true,
  email = "",
  token = ""
}) => {
  const div = document.createElement("div");
  div.className = "password-form-container";

  const form = document.createElement("form");
  form.classList.add("password-form");
  form.innerHTML = `
    <h2>${recoverMode ? "Recover your password" : "Set a new password"}</h2>
    ${
      recoverMode
        ? `
      <label for="email-password">Email:</label>
      <input type="email" id="email-password" placeholder="Enter your email" required>
    `
        : `
      <input type="hidden" id="email-password" value="${email}">
      <div class="password-change-div">
        <label class="change-password-label first-label">
          New Password:
          <input type="password" id="new-password" placeholder="At least 8 characters" required>
        </label>
        <label class="change-password-label second-label">
          Repeat Password:
          <input type="password" id="repeat-new-password" placeholder="Repeat password" required>
        </label>
      </div>
    `
    }
    ${MainBtn(
      "submit",
      "password-button",
      "main-btn",
      recoverMode ? "Send reset email" : "Reset password"
    )}
    <p class="already-registered">Back to login</p>
  `;

  div.appendChild(form);

  // Add password visibility toggle and validation if not in recoverMode
  if (!recoverMode) {
    const newPasswordInput = form.querySelector("#new-password");
    const repeatPasswordInput = form.querySelector("#repeat-new-password");

    newPasswordInput.addEventListener("input", () =>
      validatePasswordsColor(newPasswordInput, repeatPasswordInput)
    );
    repeatPasswordInput.addEventListener("input", () =>
      validatePasswordsColor(newPasswordInput, repeatPasswordInput)
    );

    const eye1 = PasswordEye(newPasswordInput, "password");
    form.querySelector(".first-label").appendChild(eye1);

    const eye2 = PasswordEye(repeatPasswordInput, "repeat-password");
    form.querySelector(".second-label").appendChild(eye2);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showGlobalLoader();

    try {
      if (recoverMode) {
        const emailInput = form.querySelector("#email-password").value.trim();
        const response = await requestPasswordReset(emailInput);
        const token = response?.data?.token;
        if (!token) throw new Error("No token received");

        await sendUserEmail({
          email: emailInput,
          name: "",
          token,
          mode: "reset"
        });
        await showSuccess("Check your inbox for the password reset link.");
      } else {
        const newPass = form.querySelector("#new-password").value.trim();
        const repeatPass = form
          .querySelector("#repeat-new-password")
          .value.trim();
        if (newPass !== repeatPass) {
          throw new Error("Passwords do not match.");
        }

        const response = await resetPassword(token, newPass);
        if (!response?.success)
          throw new Error(response?.error || "Reset failed");

        await showSuccess("You can now login.");
      }

      window.dispatchEvent(new CustomEvent("changeForm", { detail: "login" }));
    } catch (err) {
      console.error("Password form error:", err);
      await showError(err?.message || "Something went wrong.");
    } finally {
      hideGlobalLoader();
    }
  });

  form.querySelector(".already-registered").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("changeForm", { detail: "login" }));
  });

  return div;
};
