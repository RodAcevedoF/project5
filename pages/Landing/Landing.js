import "./Landing.css";
import {
  LandingCard,
  LandingHeader,
  LandingIdeas,
  Brands,
  initLandingAnimations
} from "../../components";

export const Landing = () => {
  const main = document.querySelector("main");

  main.innerHTML = `
    <section class="landing">
      <article class="landing-container">
        <div class="landing-header"></div>
        <div class="landing-header-ideas"></div>
        <div class="landing-box"></div>
      </article>
      <article class="article-exp"></article>
    </section>
  `;

  const headerComp = LandingHeader();
  const headerIdeas = LandingIdeas();
  const landingCard = LandingCard();

  const articleExp = main.querySelector(".article-exp");
  articleExp.appendChild(Brands());

  main.querySelector(".landing-header").appendChild(headerComp);
  main.querySelector(".landing-header-ideas").appendChild(headerIdeas);
  main.querySelector(".landing-box").appendChild(landingCard);

  requestAnimationFrame(() => {
    initLandingAnimations();
  });

  return main;
};
