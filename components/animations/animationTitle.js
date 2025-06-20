import gsap from "gsap";
import { splitChars, splitCharsWords } from "../../utils";

export const animationTitle = (titleElement, container, words = false) => {
  let flipped = false;
  const card = document.querySelector(".profile-header-body");
  if (card) {
    card.addEventListener("mouseenter", () => {
      if (flipped) return;
      flipped = true;
      gsap.to(card, {
        rotateY: 180,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      if (!flipped) return;
      flipped = false;
      gsap.to(card, {
        rotateY: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
    });
  }
  if (words) splitCharsWords(titleElement);
  splitChars(titleElement);
  const chars =
    titleElement.closest(`.${container}`)?.querySelectorAll(".char") || [];
  if (!chars.length) return;
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
};
