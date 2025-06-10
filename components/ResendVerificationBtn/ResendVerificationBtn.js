import Swal from "sweetalert2";
import { requestEmailVerification } from "../../api/securityApi";
import { getState } from "../../utils/state";
import { sendUserEmail } from "../../utils/sendUserEmail";
import "./ResendVerificationBtn.css";

export const ResendVerificationBtn = () => {
  const container = document.createElement("div");
  container.innerHTML = `
    <button id="resend-verification-btn" class="resend-btn">Resend Verification Email</button>
  `;

  const button = container.querySelector("#resend-verification-btn");

  /*   button.addEventListener("click", async () => {
    const user = getState("currentUser");

    if (!user || !user.email) {
      Swal.fire("Oops!", "No email found for current user.", "error");
      return;
    }

    try {
      // 1) Pedimos un nuevo token
      const { token } = await requestEmailVerification();
      console.log(token);
      // 2) Enviamos email vía EmailJS
      await sendUserEmail({
        email: user.email,
        name: user.name,
        token,
        mode: "verify"
      });

      Swal.fire("Email Sent", "Please check your inbox (and spam)", "success");
    } catch (error) {
      console.error("Error al reenviar email:", error);
      Swal.fire("Error", "Could not resend verification email.", "error");
    }
  }); */

  button.addEventListener("click", async () => {
    const user = getState("currentUser");

    if (!user || !user.email) {
      Swal.fire("Oops!", "No email found for current user.", "error");
      return;
    }

    try {
      const token = await requestEmailVerification();

      if (!token) {
        Swal.fire("Oops!", "No verification token received.", "error");
        return;
      }

      await sendUserEmail({
        email: user.email,
        name: user.name,
        token,
        mode: "verify"
      });

      Swal.fire("Email Sent", "Please check your inbox (and spam)", "success");
    } catch (error) {
      console.error("Error al reenviar email:", error);
      Swal.fire("Error", "Could not resend verification email.", "error");
    }
  });

  return container;
};
