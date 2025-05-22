import { ResendVerificationBtn } from "../../components/ResendVerificationBtn/ResendVerificationBtn.js";
import { changePage } from "../../utils/changePage.js";
import { SignLogin } from "../SignLogin/SignLogin.js";
import { Home } from "../Home/Home.js";
import { initAuthFlow } from "../../utils/authFlow.js";
import Swal from "sweetalert2";

export const VerifyPending = async () => {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="verify-pending">
      <div class="verify-box" id="verify-content"></div>
    </section>
  `;

  const contentBox = main.querySelector("#verify-content");
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");

  if (status === "success") {
    Swal.fire("Verified!", "Your account is now active.", "success");
    renderMessage("✅ Email Verified!", "Your account is now active.");
  } else if (status === "invalid") {
    Swal.fire("Invalid Token", "This link is no longer valid.", "error");
    contentBox.innerHTML = `
      <h2>❌ Verification Failed</h2>
      <p>This token is invalid or expired. You can request a new one below.</p>
      <div id="resend-btn-container"></div>
      <button id="back-to-login" class="main-btn">Back to login</button>
    `;
    contentBox
      .querySelector("#resend-btn-container")
      .appendChild(ResendVerificationBtn());
  } else {
    // Vista cuando recién se registró y está esperando verificación
    contentBox.innerHTML = `
      <h2>Just one step left!</h2>
      <p>We’ve sent a verification email to your inbox. Please confirm your email to access all features.</p>
      <p><strong>Didn't receive it?</strong> Click below to resend it 👇</p>
      <div id="resend-btn-container"></div>
      <p class="small-hint">⚠️ Check your spam folder just in case.</p>
      <button id="back-to-login" class="main-btn">Back to login</button>
    `;
    contentBox
      .querySelector("#resend-btn-container")
      .appendChild(ResendVerificationBtn());
  }
  setupListeners();

  if (status) {
    window.history.replaceState({}, document.title, "/");
  }
};

const renderMessage = (title, message) => {
  const contentBox = document.querySelector("#verify-content");
  contentBox.innerHTML = `
    <h2>${title}</h2>
    <p>${message}</p>
    <button id="go-home" class="main-btn">Go to Home</button>
  `;
};

const setupListeners = () => {
  const goHomeBtn = document.querySelector("#go-home");
  const backLoginBtn = document.querySelector("#back-to-login");

  if (goHomeBtn) {
    goHomeBtn.addEventListener("click", async () => {
      const { authenticated } = await initAuthFlow(); // ← esto te setea isLoggedIn y currentUser

      if (authenticated) {
        changePage(Home, "home");
      } else {
        changePage(SignLogin, "signlogin");
      }
    });
  }

  if (backLoginBtn) {
    backLoginBtn.addEventListener("click", () =>
      changePage(SignLogin, "signlogin")
    );
  }
};
