import "./Signlogin.css";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import BackBtn from "../../components/BackBtn/BackBtn";
import { Landing } from "../Landing/Landing";
import { getState, setState } from "../../utils/state";

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

  let formType = getState("currentForm") || "register";
  renderForms(formType);

  window.addEventListener("changeForm", (event) => {
    renderForms(event.detail);
  });
};

const renderForms = (type) => {
  const container = document.querySelector(".sign-container");
  container.innerHTML = ""; // Limpia el contenido anterior

  if (type === "register") {
    container.appendChild(RegisterForm());
  } else {
    container.appendChild(LoginForm());
  }
};
