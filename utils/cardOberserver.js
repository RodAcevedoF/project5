const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // para el fade out, opcional
      }
    });
  },
  {
    threshold: 0.1 // aparece cuando al menos 10% es visible
  }
);

// Observar dinámicamente cuando se agregan nuevas cards
const observeNewCards = (elem) => {
  document.querySelectorAll(`.${elem}-card:not(.observed)`).forEach((card) => {
    observer.observe(card);
    card.classList.add("observed");
  });
};
