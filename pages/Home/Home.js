import "./Home.css";
import { changePage } from "../../utils/changePage";
import { Todo } from "../../pages/ToDo/Todo";
import { Videos } from "../../pages/VideoPage/Videos";
import { Books } from "../../pages/Books/Books";
import HeroHome from "./HeroHome/HeroHome";
import OptionsCarrousel from "./OptionsCarrousel/OptionsCarrousel";
import { getState } from "../../utils/state";

export const Home = () => {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="home-container">
      <article class="article-home">
      <div class="button-container"></div>
      </article>
    </section>
  `;
  const optDiv = main.querySelector(".button-container");
  const Hero = HeroHome();
  main.querySelector(".article-home").insertAdjacentElement("afterbegin", Hero);

  const options = OptionsCarrousel();
  optDiv.appendChild(options);

  const navLinks = main.querySelectorAll(".home-nav-link");

  navLinks[0].addEventListener("click", () => changePage(Todo, "todo"));
  navLinks[1].addEventListener("click", () => changePage(Videos, "videos"));
  navLinks[2].addEventListener("click", () => changePage(Books, "books"));

  return main;
};
