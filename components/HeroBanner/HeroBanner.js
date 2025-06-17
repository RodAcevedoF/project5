import "./HeroBanner.css";
import { animationTitle } from "../../public/animations/animationTitle";

const HeroBanner = (txtObj) => {
  const article = document.createElement("article");
  article.classList.add("hero-article");

  const messageList = txtObj.messages
    .map((m) => `<li class="subtitle-li">${m}</li>`)
    .join("");

  article.innerHTML = `
    <h3 class="hero-banner-title">${txtObj.header}</h3>
    <div class="divider"></div>
    <ul class="loop-hero-ul">${messageList}</ul>
  `;

  const subtitles = article.querySelectorAll(".subtitle-li");
  let current = 0;
  subtitles[current].classList.add("active-sub-li");

  const intervalId = setInterval(() => {
    subtitles[current].classList.remove("active-sub-li");
    current = (current + 1) % subtitles.length;
    subtitles[current].classList.add("active-sub-li");
  }, 2500);

  article.cleanup = () => clearInterval(intervalId);

  const title = article.querySelector(".hero-banner-title");
  requestAnimationFrame(() => {
    animationTitle(title, "hero-article");
  });
  return article;
};

export default HeroBanner;
