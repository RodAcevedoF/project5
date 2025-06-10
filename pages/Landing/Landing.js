import "./Landing.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  LandingCard,
  LandingHeader,
  LandingIdeas,
  Brands
} from "../../components";
gsap.registerPlugin(ScrollTrigger);

export const Landing = () => {
  const main = document.querySelector("main");

  // 💥 PRIMERO setear el HTML
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

  // 💡 DESPUÉS instanciar los componentes
  const headerComp = LandingHeader();
  const headerIdeas = LandingIdeas();
  const landingCard = LandingCard();

  const articleExp = main.querySelector(".article-exp");
  articleExp.appendChild(Brands());

  main.querySelector(".landing-header").appendChild(headerComp);
  main.querySelector(".landing-header-ideas").appendChild(headerIdeas);
  main.querySelector(".landing-box").appendChild(landingCard);

  // 👇 Animaciones
  requestAnimationFrame(() => {
    gsap.set(".landing-header-ideas", { opacity: 0 });
    gsap.set(".landing-box", { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing",
        start: "top top",
        end: "+=280%",
        scrub: true,
        pin: true,
        onLeave: () => {
          gsap.set(".landing-container", {
            position: "relative",
            height: "auto"
          });
        }
      }
    });

    tl.to(".landing-header-ideas", {
      y: "-60vh",
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    });
    tl.to(".landing-header-ideas", {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".landing-ideas-li:last-of-type",
        start: "top top"
      }
    });
    tl.to(".landing-box", {
      y: "-175vh",
      opacity: 1,
      duration: 1.5,
      ease: "power2.out"
    });
  });

  return main;
};
