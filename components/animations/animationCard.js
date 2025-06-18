import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animationBookCard = (cardSelector) => {
  const cards = document.querySelectorAll(`.${cardSelector}`);
  cards.forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.4,
      ease: "power2.out",
      yPercent: 0,
      scrollTrigger: {
        trigger: card,
        start: "top 95%",
        toggleActions: "play none none reverse"
      }
    });
  });
};

export const animationVideoCard = (cardSelector) => {
  const cards = document.querySelectorAll(`.${cardSelector}`);
  gsap.from(cards, {
    opacity: 0,
    y: 25,
    duration: 0.4,
    ease: "power2.out",
    yPercent: 0,
    scrollTrigger: {
      trigger: cards,
      start: "top 95%",
      toggleActions: "play none none reverse"
    }
  });
};
