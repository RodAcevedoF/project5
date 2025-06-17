import { requestEmailVerification } from "../../api/securityApi";
import { showError, showSuccess, sendUserEmail, getState } from "../../utils";
import "./ResendVerificationBtn.css";

export const ResendVerificationBtn = () => {
  const container = document.createElement("div");
  container.innerHTML = `
    <button id="resend-verification-btn" class="resend-btn">Resend Verification Email</button>
  `;

  const button = container.querySelector("#resend-verification-btn");

  button.addEventListener("click", async () => {
    const user = getState("currentUser");

    if (!user || !user.email) {
      await showError("No email found for current user.");
      return;
    }

    try {
      const token = await requestEmailVerification();

      if (!token) {
        await showError("No verification token received.");
        return;
      }

      await sendUserEmail({
        email: user.email,
        name: user.name,
        token,
        mode: "verify"
      });

      await showSuccess("Verification email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error al reenviar email:", error);
      await showError("Could not resend verification email.");
    }
  });

  return container;
};
