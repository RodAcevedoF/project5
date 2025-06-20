import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animationBrand = () => {
  gsap.to(".brand-ul li", {
    y: -5,
    duration: 1,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: {
      amount: 1.5,
      from: "start"
    }
  });
  gsap.to(".without li img", {
    scale: 1.2,
    duration: 0.25,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: {
      amount: 0.5,
      from: "start"
    }
  });
  gsap.to(".with li img", {
    scale: 1.3,
    duration: 0.25,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: {
      amount: 0.5,
      from: "start"
    }
  });
};
