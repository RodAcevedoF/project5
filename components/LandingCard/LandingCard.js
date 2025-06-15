import "./LandingCard.css";
import { SignBtn } from "..";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const LandingCard = () => {
  const art = document.createElement("article");
  art.classList.add("landing-card");

  art.innerHTML = `<p>GetDone tasks</p>
                   <p>Welcome to</p>
                   <h1><em>GetDone</em> App</h1>
                   <p>Plan and organize your tasks and study goals.</p>
                   <div class="alt-login">
                     <div>
                       <p>Free forever.</p>
                       <p>No credit card.</p>
                     </div>
                   </div>
                   <div class="reviews">
                     <img src="/images/stars.png" alt="4.5 stars" class="stars">
                     <p>5000+ reviews from</p>
                     <img src="/images/reviewApps.png" alt="review apps" class="rev-apps">
                   </div>`;

  const divAltLogin = art.querySelector(".alt-login");
  divAltLogin.insertAdjacentElement(
    "afterbegin",
    SignBtn("sign-in-alt", "Get Started ►", "register")
  );
  requestAnimationFrame(() => {
    gsap.from(".landing-card h1", {
      opacity: 0,
      x: -150,
      scale: 1.5,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".landing-card h1",
        start: "top 10%",
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(".landing-card p:not(.reviews p)", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".landing-card",
        start: "top 30%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from("#sign-in-alt", {
      opacity: 0,
      scale: 0.5,
      y: 30,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 0.4,
      scrollTrigger: {
        trigger: "#sign-in-alt",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(".reviews", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".reviews",
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });
  return art;
};

export default LandingCard;
