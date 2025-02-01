import "./Landing.css";
import { LoginForm } from "../../components/LoginForm/LoginForm.js";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm.js";

export const Landing = () => {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="Landing">
        <div class="Landing-container">
            <h1>Bienvenido a To-Do App</h1>
            <p>Organiza tus tareas y libros fácilmente.</p>
            <div class="Landing-buttons">
                <button id="login-btn">Iniciar sesión</button>
                <button id="register-btn">Registrarse</button>
            </div>
            <div id="auth-form-container"></div>
        </div>
    </section>
  `;

  // Seleccionar botones
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const authContainer = document.getElementById("auth-form-container");

  // Mostrar formulario según el botón
  loginBtn.addEventListener("click", () => {
    authContainer.innerHTML = "";
    authContainer.appendChild(LoginForm());
  });

  registerBtn.addEventListener("click", () => {
    authContainer.innerHTML = "";
    authContainer.appendChild(RegisterForm());
  });
};
