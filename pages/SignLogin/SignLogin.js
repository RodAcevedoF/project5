import "./Signlogin.css";
import {
  BackBtn,
  LoginForm,
  PasswordForm,
  RegisterForm
} from "../../components";
import {
  getState,
  setState,
  setTokens,
  sendUserEmail,
  showToast,
  navigate
} from "../../utils";
import { requestEmailVerification } from "../../api";

export const SignLogin = () => {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="sign-page">
      <div class="sign-container"></div>
      <div class="back-design"></div>
    </section>
  `;

  const section = main.querySelector(".sign-page");
  section.appendChild(BackBtn("/"));

  const params = new URLSearchParams(window.location.search);
  let formType = params.get("form") || "register";

  if (params.get("token") && params.get("email")) {
    formType = "reset";
  } else {
    formType = getState("currentForm") || formType;
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
  setState("currentForm", type);
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/register"
  ) {
    const params = new URLSearchParams(window.location.search);
    params.set("form", type);
    history.replaceState({}, "", `/login?${params.toString()}`);
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
      const token = await requestEmailVerification();
      if (token) {
        await sendUserEmail({
          email: user.email,
          name: user.name,
          token,
          mode: "verify"
        });
      }
    } catch (err) {
      console.error("Failed to send verification email", err);
    }

    return navigate("/verify");
  }

  setState("isLoggedIn", true);
  await showToast("Signed in successfully");
  navigate("/home");
};
