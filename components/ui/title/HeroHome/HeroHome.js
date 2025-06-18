import "./HeroHome.css";
import { animationHeroHome } from "../../../animations";

const HeroHome = () => {
  const sect = document.createElement("section");
  sect.classList.add("section-bg");

  sect.innerHTML = `
    <div class='air air1'></div>
    <div class='air air2'></div>
    <div class='air air3'></div>
    <div class='air air4'></div>
    <div class='up-air up-air1'></div>
    <div class='up-air up-air2'></div>
    <div class='up-air up-air3'></div>
    <div class='up-air up-air4'></div>
    <h1>Welcome to GetDone!</h1>
    <div class="loop-hero">
      <h3 class="subtitle active-sub">
        <img src="/images/todolanding.png" alt"checklist-icon" class="hero-home-icons">
        Organize your tasks!
        <img src="/images/pencilicon.png" alt"" class="hero-home-icons">
      </h3>
      <h3 class="subtitle">
        <img src="/images/notebookicon.png" alt"notebook icon" class="hero-home-icons">
        Check for Books!
        <img src="/images/booklanding.png" alt"book icon" class="hero-home-icons">
      </h3>
      <h3 class="subtitle">
      <img src="/images/videoicon.png" alt"youtube icon" class="hero-home-icons">
      Check for Videos!
      <img src="/images/videolanding.png" alt"video icon" class="hero-home-icons">
      </h3>
      <h3 class="subtitle">
      <img src="/images/boosthome.png" alt"boost icon" class="hero-home-icons">
      Boost productivity!
      <img src="/images/clockicon.png" alt"clock icon" class="hero-home-icons">
      </h3>
    </div>
  `;

  const subtitles = sect.querySelectorAll(".subtitle");
  let current = 0;
  const intervalId = setInterval(() => {
    subtitles[current].classList.remove("active-sub");
    current = (current + 1) % subtitles.length;
    subtitles[current].classList.add("active-sub");
  }, 2500);

  sect.cleanup = () => clearInterval(intervalId);

  requestAnimationFrame(() => {
    animationHeroHome();
  });
  return sect;
};

export default HeroHome;
