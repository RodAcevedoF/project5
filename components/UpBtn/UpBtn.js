import "./UpBtn.css";

export const UpBtn = (icon, txt) => {
  const btn = document.createElement("button");
  btn.setAttribute("id", "up-btn")
  btn.innerHTML = `<img src="${icon}" alt="${txt} icon">
                   <span>🌓</span>`;
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const span = btn.querySelector("span");
  span.addEventListener("click", () => {
   document.body.classList.toggle("dark");
  })
  return btn;                                    
}