import { registerUser } from "../../api/userApi";
import { Home } from "../../pages/Home/Home";
import { changePage } from "../../utils/changePage";
export const RegisterForm = () => {
  const div = document.createElement("div");
  div.innerHTML = `
      <form id="register-form">
          <h2>Registrarse</h2>
          <input type="text" id="register-name" placeholder="Nombre" required>
          <input type="email" id="register-email" placeholder="Email" required>
          <input type="password" id="register-password" placeholder="Contraseña" required>
          <button type="submit">Registrarse</button>
          <p id="register-error" style="color: red;"></p>
      </form>
  `;

  div.querySelector("#register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = div.querySelector("#register-name").value;
    const email = div.querySelector("#register-email").value;
    const password = div.querySelector("#register-password").value;
    const errorMessage = div.querySelector("#register-error");

    const response = await registerUser(name, email, password);
    if (response && response.token) {
      changePage(Home);
    } else {
      errorMessage.textContent = "Error al registrarse";
    }
  });

  return div;
};
