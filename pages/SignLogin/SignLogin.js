import "./Signlogin.css"
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { LoginForm } from "../../components/LoginForm/LoginForm";
export const SignLogin = () => {
    const main = document.querySelector("main");
    main.innerHTML = `
      <section class="sign-page">
          <div class="sign-container"></div>
      </section>
    `;

    const container = main.querySelector(".sign-container");
    container.appendChild(RegisterForm());
    container.appendChild(LoginForm());
}