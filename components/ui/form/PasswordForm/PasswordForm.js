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

  div.innerHTML = `
    <form id="password-form">
        <h2>${recoverMode ? "Recover your password" : "Set a new password"}</h2>

        ${
          recoverMode
            ? `<label for="email-password">Email:</label>
               <input type="email" id="email-password" placeholder="Enter your email" required>`
            : `<input type="hidden" id="email-password" value="${email}">`
        }

        ${
          recoverMode
            ? ""
            : `
            <div class="password-change-div">
              <label for="new-password" class="change-password-label">New Password:
              <input type="password" id="new-password" placeholder="At least 8 characters" required>
              </label>
              <label for="repeat-new-password" class="change-password-label">Repeat Password:
              <input type="password" id="repeat-new-password" placeholder="Repeat password" required>
              </label>
            </div>`
        }
        ${MainBtn(
          "submit",
          "password-button",
          "main-btn",
          recoverMode ? "Send reset email" : "Reset password"
        )}

        <p class="already-registered">Back to login</p>
    </form>
  `;
  const newPasswordInput = div.querySelector("#new-password");
  const repeatPasswordInput = div.querySelector("#repeat-new-password");

  const eyePass = PasswordEye(newPasswordInput, "password");
  newPasswordInput.insertAdjacentElement("afterend", eyePass);
  const repeatEyePass = PasswordEye(repeatPasswordInput, "repeat-password");
  repeatPasswordInput.insertAdjacentElement("afterend", repeatEyePass);

  if (!recoverMode) {
    newPasswordInput.addEventListener("input", () =>
      validatePasswordsColor(newPasswordInput, repeatPasswordInput)
    );
    repeatPasswordInput.addEventListener("input", () =>
      validatePasswordsColor(newPasswordInput, repeatPasswordInput)
    );
  }

  const form = div.querySelector("#password-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showGlobalLoader();
    if (recoverMode) {
      const emailInput = div.querySelector("#email-password").value.trim();

      try {
        const response = await requestPasswordReset(emailInput);
        const token = response?.data?.token;
        if (!token) throw new Error("No token received");

        await sendUserEmail({
          email: emailInput,
          name: "",
          token,
          mode: "reset"
        });
        hideGlobalLoader();
        await showSuccess("Check your inbox for the password reset link.");
        window.dispatchEvent(
          new CustomEvent("changeForm", { detail: "login" })
        );
      } catch (err) {
        console.error("Error sending reset email:", err);
        hideGlobalLoader();
        await showError("Failed to send recovery email.");
      }
    } else {
      const newPass = newPasswordInput.value.trim();
      const repeatPass = repeatPasswordInput.value.trim();
      if (newPass !== repeatPass) {
        await showError("Passwords do not match.");
        return;
      }

      try {
        const response = await resetPassword(token, newPass);

        if (response?.success) {
          hideGlobalLoader();
          await showSuccess("You can now login.");
          window.dispatchEvent(
            new CustomEvent("changeForm", { detail: "login" })
          );
        } else {
          hideGlobalLoader();
          throw new Error(response?.error || "Reset failed");
        }
      } catch (err) {
        console.error("Error resetting password:", err);
        hideGlobalLoader();
        await showError(err?.message || "Failed to reset password.");
      }
    }
  });

  div.querySelector(".already-registered").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("changeForm", { detail: "login" }));
  });

  return div;
};
