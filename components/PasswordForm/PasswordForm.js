import "./PasswordForm.css";
import MainBtn from "../MainBtn/MainBtn";
import { requestPasswordReset, resetPassword } from "../../api/securityApi";
import { sendUserEmail } from "../../utils/sendUserEmail";
import Swal from "sweetalert2";
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
        <p id="password-error" style="color: red;"></p>
    </form>
  `;

  const form = div.querySelector("#password-form");
  const errorMessage = div.querySelector("#password-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMessage.textContent = "";

    if (recoverMode) {
      const emailInput = div.querySelector("#email-password").value.trim();

      try {
        const response = await requestPasswordReset(emailInput);
        console.log(response);
        const token = response?.data?.token;
        if (!token) throw new Error("No token received");

        await sendUserEmail({
          email: emailInput,
          name: "", // o null
          token,
          mode: "reset"
        });

        Swal.fire(
          "Email Sent",
          "Check your inbox for the password reset link.",
          "success"
        );

        window.dispatchEvent(
          new CustomEvent("changeForm", { detail: "login" })
        );
      } catch (err) {
        console.error("Error sending reset email:", err);
        errorMessage.textContent = "Failed to send recovery email.";
      }
    } else {
      const newPassword = div.querySelector("#new-password").value.trim();
      const repeatPassword = div
        .querySelector("#repeat-new-password")
        .value.trim();

      if (newPassword !== repeatPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return;
      }

      try {
        const response = await resetPassword(token, newPassword);

        if (response?.success) {
          Swal.fire("Password Changed", "You can now login.", "success");
          window.dispatchEvent(
            new CustomEvent("changeForm", { detail: "login" })
          );
        } else {
          throw new Error(response?.error || "Reset failed");
        }
      } catch (err) {
        console.error("Error resetting password:", err);
        errorMessage.textContent = err?.message || "Failed to reset password.";
      }
    }
  });

  div.querySelector(".already-registered").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("changeForm", { detail: "login" }));
  });

  return div;
};
