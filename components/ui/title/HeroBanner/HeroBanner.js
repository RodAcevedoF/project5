import "./HeroBanner.css";
import { animationTitle } from "../../../animations";

const HeroBanner = (txtObj) => {
  const sect = document.createElement("section");
  sect.classList.add("hero-section");

  const messageList = txtObj.messages
    .map((m) => `<li class="subtitle-li">${m}</li>`)
    .join("");

  sect.innerHTML = `
    <h3 class="hero-banner-title">${txtObj.header}</h3>
    <div class="divider"></div>
    <ul class="loop-hero-ul">${messageList}</ul>
  `;

  const subtitles = sect.querySelectorAll(".subtitle-li");
  let current = 0;
  subtitles[current].classList.add("active-sub-li");

  const intervalId = setInterval(() => {
    subtitles[current].classList.remove("active-sub-li");
    current = (current + 1) % subtitles.length;
    subtitles[current].classList.add("active-sub-li");
  }, 2500);

  sect.cleanup = () => clearInterval(intervalId);

  const title = sect.querySelector(".hero-banner-title");

  requestAnimationFrame(() => {
    animationTitle(title, "hero-section");
  });

  return sect;
};

export default HeroBanner;
