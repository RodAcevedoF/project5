import "./Signlogin.css";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { LoginForm } from "../../components/LoginForm/LoginForm";

export const SignLogin = () => {
  const main = document.querySelector("main");
  main.innerHTML = `
      <section class="sign-page">
          <div class="sign-container"></div>
          <div class="back-design"></div>
      </section>
    `;

  const container = main.querySelector(".sign-container");

  let formType = sessionStorage.getItem("currentForm") || "register";

  const renderForm = (type) => {
    sessionStorage.setItem("currentForm", type); 
    container.innerHTML = ""; 
    container.appendChild(type === "register" ? RegisterForm() : LoginForm());
  };

  renderForm(formType);

  window.addEventListener("changeForm", (event) => {
    renderForm(event.detail);
  });
};
