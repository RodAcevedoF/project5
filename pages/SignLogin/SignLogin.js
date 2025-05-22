import "./Signlogin.css";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { PasswordForm } from "../../components/PasswordForm/PasswordForm";
import BackBtn from "../../components/BackBtn/BackBtn";
import { Landing } from "../Landing/Landing";
import { getState, setState } from "../../utils/state";
import { setTokens } from "../../utils/authUtils";
import { changePage } from "../../utils/changePage";
import { Home } from "../Home/Home";
import { VerifyPending } from "../VerifyPending/VerifyPending";
import { requestEmailVerification } from "../../api/securityApi";
import { sendUserEmail } from "../../utils/sendUserEmail";

export const SignLogin = () => {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="sign-page">
      <div class="sign-container"></div>
      <div class="back-design"></div>
    </section>
  `;

  const section = main.querySelector(".sign-page");
  section.appendChild(BackBtn(Landing, "landing"));

  const params = new URLSearchParams(window.location.search);
  let formType = "register";

  if (params.get("token") && params.get("email")) {
    formType = "reset";
  } else {
    formType = getState("currentForm") || "register";
  }

  renderForms(formType);

  if (formType === "reset") {
    window.history.replaceState({}, document.title, "/");
  }

  window.addEventListener("changeForm", (event) => {
    renderForms(event.detail);
  });
};

const renderForms = (type) => {
  const container = document.querySelector(".sign-container");
  container.innerHTML = "";

  switch (type) {
    case "register":
      container.appendChild(RegisterForm());
      break;
    case "login":
      container.appendChild(LoginForm());
      break;
    case "recover":
      container.appendChild(PasswordForm({ recoverMode: true }));
      break;
    case "reset":
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const email = params.get("email");
      if (token && email) {
        container.appendChild(
          PasswordForm({ recoverMode: false, email, token })
        );
      } else {
        container.innerHTML = "<p>Error: Missing token or email</p>";
      }
      break;
  }
};

export const handleAuthSuccess = async (response) => {
  const { accessToken, refreshToken, user } = response.data;

  setTokens(accessToken, refreshToken);
  setState("currentUser", user);
  localStorage.setItem("email", user.email);
  localStorage.setItem("name", user.name);

  if (!user.is_verified) {
    try {
      const token = await requestEmailVerification(); // ⚠️ debería devolver el token directo

      if (token) {
        await sendUserEmail({
          email: user.email,
          name: user.name,
          token,
          mode: "verify"
        });
        // 👈 le pasás el token
      } else {
        console.warn("No se pudo obtener token de verificación.");
      }
    } catch (err) {
      console.error("Fallo al enviar email de verificación:", err);
    }

    changePage(VerifyPending, "verify-pending");
    return;
  }

  setState("isLoggedIn", true);
  changePage(Home, "home");
};
