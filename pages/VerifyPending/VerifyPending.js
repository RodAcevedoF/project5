import "./VerifyPending.css";
import { CardBtn, ResendVerificationBtn } from "../../components";
import { initAuthFlow } from "../../utils/authFlow.js";
import Swal from "sweetalert2";
import gsap from "gsap";
import { navigate } from "../../utils/router.js";

export const VerifyPending = async () => {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="verify-pending">
      <div class="verify-box" id="verify-content"></div>
      <div class="back-design"></div>
    </section>
  `;

  const contentBox = main.querySelector("#verify-content");
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");
  const cardButton = CardBtn(
    "Back to login",
    "back-to-login",
    "/icon/emailprofile.svg"
  );

  if (status === "success") {
    Swal.fire("Verified!", "Your account is now active.", "success");
    renderMessage("Email Verified!", "Your account is now active.");
  } else if (status === "invalid") {
    Swal.fire("Invalid Token", "This link is no longer valid.", "error");
    contentBox.innerHTML = `
      <h2><img class="verify-page-icon" src="/icon/fail.png" alt="error icon"> Verification Failed</h2>
      <p>This token is invalid or expired. You can request a new one below.</p>
      <div id="resend-btn-container"></div>
    `;
    contentBox
      .querySelector("#resend-btn-container")
      .appendChild(ResendVerificationBtn());
    contentBox.appendChild(cardButton);
  } else {
    contentBox.innerHTML = `
      <h2>Just one step left!</h2>
      <p>We’ve sent a verification email to your inbox. Please confirm your email to access all features.</p>
      <p>Didn't receive it? Click below to resend it <img class="verify-page-icon" src="/icon/arrowverify.png" alt="arrow icon"></p>
      <div id="resend-btn-container"></div>
      <p class="small-hint"><img class="verify-page-icon" src="/icon/warningverify.png" alt="warning icon">Check your spam folder just in case.</p>
    `;
    contentBox
      .querySelector("#resend-btn-container")
      .appendChild(ResendVerificationBtn());
    contentBox.appendChild(cardButton);
  }
  setupListeners();

  if (status) {
    window.history.replaceState({}, document.title, "/");
  }

  const img = contentBox.querySelectorAll(".verify-page-icon");
  img.forEach((i) => {
    gsap.to(i, {
      y: -10,
      duration: 1,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });
  });
};

const renderMessage = (title, message) => {
  const goHomeButton = CardBtn("Go Home", "go-home", "/icon/home.png");
  const contentBox = document.querySelector("#verify-content");
  contentBox.innerHTML = `
    <h2><img class="verify-page-icon" src="/icon/check.png" alt="check icon" icon">${title}</h2>
    <p>${message}</p>
  `;
  contentBox.appendChild(goHomeButton);
};

const setupListeners = () => {
  const goHomeBtn = document.querySelector(".go-home-button");
  const backLoginBtn = document.querySelector(".back-to-login-button");

  if (goHomeBtn) {
    goHomeBtn.addEventListener("click", async () => {
      const { authenticated } = await initAuthFlow();

      if (authenticated) {
        navigate("home");
      } else {
        navigate("signlogin");
      }
    });
  }

  if (backLoginBtn) {
    backLoginBtn.addEventListener("click", () => navigate("signlogin"));
  }
};
