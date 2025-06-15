import "./HeroBanner.css";
import gsap from "gsap";
import { splitChars } from "../../utils/splitChars";

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

  const title = article.querySelector(".hero-banner-title");
  splitChars(title);
  const subtitles = article.querySelectorAll(".subtitle-li");
  let current = 0;
  subtitles[current].classList.add("active-sub-li");

  const intervalId = setInterval(() => {
    subtitles[current].classList.remove("active-sub-li");
    current = (current + 1) % subtitles.length;
    subtitles[current].classList.add("active-sub-li");
  }, 2500);

  article.cleanup = () => clearInterval(intervalId);

  const chars = title.querySelectorAll(".char");
  requestAnimationFrame(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(chars, {
      y: () => gsap.utils.random(-150, 150),
      x: () => gsap.utils.random(-150, 150),
      rotate: gsap.utils.random(-360, 360),
      scale: gsap.utils.random(0, 2),
      opacity: 0,
      duration: 0.2,
      stagger: 0.2,
      delay: 0.2
    });
    chars.forEach((char, index) => {
      const charsHover = () => {
        gsap.timeline();
        gsap.to(char, {
          y: () => gsap.utils.random(-100, 100),
          x: () => gsap.utils.random(-100, 100),
          rotate: gsap.utils.random(-180, 180),
          scale: gsap.utils.random(0, 2),
          color: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(
            0,
            255
          )}, ${gsap.utils.random(0, 255)})`,
          onComplete: () => {
            char.removeEventListener("mouseenter", charsHover);
          }
        });

        gsap.to(char, {
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1,
          delay: 0.5,
          color: "inherit",
          onComplete: () => {
            char.addEventListener("mouseenter", charsHover);
          }
        });
      };
      char.addEventListener("mouseenter", charsHover);
    });
  });
  return article;
};

export default HeroBanner;
