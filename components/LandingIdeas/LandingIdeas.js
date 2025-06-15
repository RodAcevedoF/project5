import "./LandingIdeas.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const LandingIdeas = () => {
  const ul = document.createElement("ul");
  ul.classList.add("landing-ideas-ul");

  ul.innerHTML = `
        <li class="landing-ideas-li"><p>Create tasks and reminders!</p><img src="/images/todolanding.png" alt="to-do icon"/></li>
        <li class="landing-ideas-li"><p>Add notes to your videos!</p><img src="/images/videolanding.png" alt="video icon"/></li>
        <li class="landing-ideas-li"><p>Never forget an interesting book!</p><img src="/images/booklanding.png" alt="book icon"/></li>
    `;
  const bigCloud = document.createElement("img");
  bigCloud.src = "/images/bigcloud.png";
  bigCloud.alt = "big cloud image";
  bigCloud.classList.add("big-cloud", "ideas-cloud");

  const smallCloud = document.createElement("img");
  smallCloud.src = "/images/smallcloud.png";
  smallCloud.alt = "small cloud image";
  smallCloud.classList.add("small-cloud", "ideas-cloud");

  ul.insertAdjacentElement("afterbegin", bigCloud);
  ul.insertAdjacentElement("afterbegin", smallCloud);

  const arrLi = ul.querySelectorAll(".landing-ideas-li");
  requestAnimationFrame(() => {
    arrLi.forEach((li, index) => {
      gsap.from(li, {
        opacity: 0,
        x: 150,
        y: 50,
        scale: 1.5,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: li,
          start: "top 30%",
          end: "bottom bottom",
          toggleActions: "play none none reverse"
        }
      });
      const img = li.querySelector("img");
      gsap.to(img, {
        y: -10,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });
    });
    gsap.to(".ideas-cloud", {
      y: -10,
      duration: 1.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });
  });
  return ul;
};

export default LandingIdeas;
