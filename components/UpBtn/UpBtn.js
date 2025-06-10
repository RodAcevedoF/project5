import "./UpBtn.css";
import { ThemeSwitch } from "..";

export const UpBtn = (icon, txt) => {
  const btn = document.createElement("button");
  btn.setAttribute("id", "up-btn");
  btn.innerHTML = `<img src="${icon}" alt="${txt} icon" class="logo-btn">
                   <span>${ThemeSwitch}</span>`;

  const checkbox = btn.querySelector("#input");

  // Al cargar el botón, revisar sessionStorage para setear el estado
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
    checkbox.checked = true;
  } else {
    document.body.classList.remove("dark");
    checkbox.checked = false;
  }

  // Ahora manejamos el cambio
  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  return btn;
};
