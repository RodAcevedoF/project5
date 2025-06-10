import "./LandingHeader.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LandingHeader = () => {
  const div = document.createElement("div");
  div.classList.add("general-test-container");

  div.innerHTML = `
    <div class="anime-card" id="anime-card">
      <h1 class="main-txt text-uppercase">Organization is the key to unlock productivity</h1>
      <img class="big-cloud" src="/images/bigcloud.png" alt="big cloud image">
      <img class="small-cloud" src="/images/smallcloud.png" alt="small cloud image"> 
      <div class="icons-landing">
        <img class="landing-header-icons" src="/images/calculatoricon.png" alt="calculator image">
        <img class="landing-header-icons" src="/images/calendaricon.png" alt="calendar image">
        <img class="landing-header-icons" src="/images/erasericon.png" alt="calculator image">
        <img class="landing-header-icons" src="/images/pencilicon.png" alt="calculator image">
        <img class="landing-header-icons" src="/images/notebookicon.png" alt="calculator image">
        <img class="landing-header-icons" src="/images/clockicon.png" alt="calculator image">
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    // 1. Estado inicial y animación de entrada (sin scroll)
    gsap.set("#anime-card", { opacity: 0, yPercent: 50, scale: 1 });
    gsap.to("#anime-card", {
      opacity: 1,
      yPercent: 0,
      duration: 0.5,
      ease: "power2.out"
    });

    // 2. ScrollTrigger reversible para disipar
    const cardScrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#anime-card",
        start: "top 25%",
        end: "top 0%",
        scrub: true
      }
    });
    cardScrollTimeline.fromTo(
      "#anime-card",
      { opacity: 1, y: 0, scale: 1 },
      { opacity: 0, y: -50, scale: 2.5, ease: "power2.out" }
    );
    gsap.to("#anime-card", {
      y: -15,
      duration: 1.25,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });
    gsap.to(".big-cloud", {
      xPercent: 25, // mueve 100px a la derecha
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    gsap.to(".small-cloud", {
      xPercent: -20, // mueve 80px a la izquierda
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    gsap.from(".landing-header-icons", {
      opacity: 0,
      y: 50,
      scale: 0.5,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: {
        amount: 0.6,
        from: "center"
      }
    });
  });

  return div;
};

export default LandingHeader;
