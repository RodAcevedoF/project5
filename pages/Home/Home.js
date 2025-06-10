import "./Home.css";
import { changePage } from "../../utils/changePage";
import { Todo } from "../../pages/ToDo/Todo";
import { Videos } from "../../pages/VideoPage/Videos";
import { Books } from "../../pages/Books/Books";
import { HeroHome } from "../../components";
import { HomeOptions } from "../../components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  requestAnimationFrame(() => {
    gsap.to(".section-bg", {
      y: () => window.innerHeight * 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: ".home-container",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  });
  return main;
};
