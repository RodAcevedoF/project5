import "./Home.css";
import { changePage } from "../../utils/changePage";
import { Todo } from "../../pages/ToDo/Todo";
import { Videos } from "../../pages/VideoPage/Videos";
import { Books } from "../../pages/Books/Books";
import HeroHome from "../../components/HeroHome/HeroHome";
import { HomeOptions } from "../../components";

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

  const opts = HomeOptions();
  optDiv.appendChild(opts);

  const navLinks = main.querySelectorAll(".links-pages-link");

  navLinks[0].addEventListener("click", () => changePage(Todo, "todo"));
  navLinks[1].addEventListener("click", () => changePage(Books, "books"));
  navLinks[2].addEventListener("click", () => changePage(Videos, "videos"));

  window.addEventListener("scroll", () => {
    const parallax = document.querySelector(".section-bg");
    const scrollY = window.scrollY;
    if (parallax) {
      parallax.style.transform = `translateY(${scrollY * 0.4}px)`;
    }
  });

  return main;
};
