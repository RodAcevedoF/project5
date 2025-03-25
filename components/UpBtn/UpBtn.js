import "./UpBtn.css";

export const UpBtn = (icon, txt) => {
  const btn = document.createElement("button");
  btn.setAttribute("id", "up-btn")
  btn.innerHTML = `<img src="${icon}" alt="${txt} icon">
                   <span>🌓</span>`;

  const span = btn.querySelector("span");
  btn.addEventListener("click", () => {
   document.body.classList.toggle("dark");
   if (document.body.classList.contains("dark")) {
    sessionStorage.setItem("theme", "dark");
  } else {
    sessionStorage.setItem("theme", "light");
  }
});
  return btn;                                    
}