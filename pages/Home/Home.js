import "./Home.css";
import { changePage } from "../../utils/changePage";
import { Todo } from "../../pages/ToDo/Todo";
import { Videos } from "../../pages/VideoPage/Videos";
import { Books } from "../../pages/Books/Books";
import { MainAside } from "../../components/MainAside/MainAside";

export const Home = () => {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="home-container">
      <article class="article-home">
      <h1>Bienvenido a la App de Listas</h1>
      <div class="button-container">
        <button id="todo-btn" class="menu-btn">Lista de Tareas</button>
        <button id="video-btn" class="menu-btn">Lista de Videos</button>
        <button id="book-btn" class="menu-btn">Lista de Libros</button>
      </div>
      </article>
    </section>
  `;
  main.querySelector("#todo-btn").addEventListener("click", () => changePage(Todo));
  main.querySelector("#video-btn").addEventListener("click", () => changePage(Videos));
  main.querySelector("#book-btn").addEventListener("click", () => changePage(Books));
  const section = main.querySelector(".home-container");
  section.appendChild(MainAside());
  return main;
};
