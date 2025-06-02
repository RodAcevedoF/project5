import "./HeroHome.css";

const HeroHome = () => {
  const sect = document.createElement("section");
  sect.classList.add("section-bg");

  sect.innerHTML = `
    <div class='air air1'></div>
    <div class='air air2'></div>
    <div class='air air3'></div>
    <div class='air air4'></div>
    <h1>Welcome to GetDone!</h1>
    <div class="loop-hero">
      <h3 class="subtitle active-sub">Organize your tasks!</h3>
      <h3 class="subtitle">Check for Books!</h3>
      <h3 class="subtitle">Boost your productivity!</h3>
      <h3 class="subtitle">Check for Videos!</h3>
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

  return sect;
};

export default HeroHome;
