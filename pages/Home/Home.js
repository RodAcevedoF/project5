export const Home = () => {
    const main = document.querySelector("main");
    main.innerHTML = `
      <section class="Home">
          <div class="home-div">
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
}