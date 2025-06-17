import "./PasswordForm.css";
import MainBtn from "../MainBtn/MainBtn";
import { requestPasswordReset, resetPassword } from "../../api/securityApi";
import { showSuccess, showError, sendUserEmail } from "../../utils";

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
              <label for="new-password">New Password:</label>
              <input type="password" id="new-password" placeholder="At least 8 characters" required>
              <label for="repeat-new-password">Repeat Password:</label>
              <input type="password" id="repeat-new-password" placeholder="Repeat password" required>
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

  const form = div.querySelector("#password-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (recoverMode) {
      const emailInput = div.querySelector("#email-password").value.trim();

      try {
        const response = await requestPasswordReset(emailInput);
        const token = response?.data?.token;
        if (!token) throw new Error("No token received");

        await sendUserEmail({
          email: emailInput,
          name: "", // o null
          token,
          mode: "reset"
        });

        await showSuccess("Check your inbox for the password reset link.");
        window.dispatchEvent(
          new CustomEvent("changeForm", { detail: "login" })
        );
      } catch (err) {
        console.error("Error sending reset email:", err);
        await showError("Failed to send recovery email.");
      }
    } else {
      const newPassword = div.querySelector("#new-password").value.trim();
      const repeatPassword = div
        .querySelector("#repeat-new-password")
        .value.trim();

      if (newPassword !== repeatPassword) {
        await showError("Passwords do not match.");
        return;
      }

      try {
        const response = await resetPassword(token, newPassword);

        if (response?.success) {
          await showSuccess("You can now login.");
          window.dispatchEvent(
            new CustomEvent("changeForm", { detail: "login" })
          );
        } else {
          throw new Error(response?.error || "Reset failed");
        }
      } catch (err) {
        console.error("Error resetting password:", err);
        await showError(err?.message || "Failed to reset password.");
      }
    }
  });

  div.querySelector(".already-registered").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("changeForm", { detail: "login" }));
  });

  return div;
};
