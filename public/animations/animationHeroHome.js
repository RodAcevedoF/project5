import gsap from "gsap";

export const animationHeroHome = () => {
  gsap.to(".hero-home-icons", {
    y: -5,
    duration: 0.75,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });
};
