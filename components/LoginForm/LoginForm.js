import { loginUser } from "../../api/userApi";
import { changePage } from "../../utils/changePage";
import { Home } from "../../pages/Home/Home";

export const LoginForm = () => {
  const div = document.createElement("div");
  div.innerHTML = `
      <form id="login-form">
          <h2>Iniciar Sesión</h2>
          <input type="email" id="login-email" placeholder="Email" required>
          <input type="password" id="login-password" placeholder="Contraseña" required>
          <button type="submit">Ingresar</button>
          <p id="login-error" style="color: red;"></p>
      </form>
  `;

  div.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = div.querySelector("#login-email").value;
    const password = div.querySelector("#login-password").value;
    const errorMessage = div.querySelector("#login-error");

    const response = await loginUser(email, password);
    if (response && response.token) {
      changePage(Home);
    } else {
      errorMessage.textContent = "Error al iniciar sesión";
    }
  });

  return div;
};
