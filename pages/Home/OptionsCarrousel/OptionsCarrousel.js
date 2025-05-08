import "./OptionsCarrousel.css";
const OptionsCarrousel = () => {
  const div = document.createElement("div");
  div.classList.add("carousel");

  div.innerHTML = `
    <div class="slides">
      <img src="/images/todomenu.png" alt="todo menu image" />
      <img src="https://i.loli.net/2020/01/20/YWA6RhCcESgN3Ty.png" alt="book menu image" />
      <img src="https://i.loli.net/2020/01/19/4HaLyI7NQRf3teO.png" alt="video menu image" />
    </div>
    <div class="overlays">
      <div class="bar bar-blue"></div>
      <div class="bar bar-green"></div>
      <div class="bar bar-pink"></div>
    </div>
    <ul class="home-nav-links">
      <li><button class="home-nav-link">To-do List</button></li>
      <li><button class="home-nav-link">Book's List</button></li>
      <li><button class="home-nav-link">Video's List</button></li>
    </ul>
  `;

  const navLinks = div.querySelectorAll(".home-nav-link");
  const slides = div.querySelectorAll(".slides img");
  const overlays = div.querySelectorAll(".bar");

  slides[0].classList.add("active");
  navLinks[0].classList.add("active");
  overlays[0].classList.add("active");

  let currentFadeOut = null;
  let currentFadeIn = null;

  navLinks.forEach((navLink, activeIndex) => {
    navLink.addEventListener("mouseover", () => {
      // Cancelar animaciones en curso
      if (currentFadeOut) currentFadeOut.cancel();
      if (currentFadeIn) currentFadeIn.cancel();

      // nav-link
      navLinks.forEach((nl) => nl.classList.remove("active"));
      navLink.classList.add("active");

      // slide
      const currentSlide = div.querySelector(".slides img.active");
      if (currentSlide) currentSlide.classList.remove("active");

      slides.forEach((slide) => slide.classList.remove("active"));
      const activeSlide = slides[activeIndex];
      activeSlide.classList.add("active");

      currentFadeOut = currentSlide?.animate?.(
        [
          { transform: "translateX(0)", opacity: 1 },
          { transform: "translateX(5%)", opacity: 0 }
        ],
        {
          duration: 300,
          easing: "ease-in",
          fill: "forwards"
        }
      );

      currentFadeIn = activeSlide.animate(
        [
          { transform: "translateX(-5%)", opacity: 0 },
          { transform: "translateX(0)", opacity: 1 }
        ],
        {
          duration: 300,
          easing: "ease-out",
          fill: "forwards"
        }
      );

      // overlay
      overlays.forEach((bar) => bar.classList.remove("active"));
      const activeOverlay = overlays[activeIndex];
      activeOverlay.classList.add("active");
      activeOverlay.animate(
        [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
        {
          duration: 600,
          fill: "forwards",
          easing: getComputedStyle(document.documentElement)
            .getPropertyValue("--easeInOutQuart")
            .trim()
        }
      );
    });
  });

  return div;
};

export default OptionsCarrousel;
