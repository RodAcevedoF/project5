import "./UpBtn.css";
import { ThemeSwitch } from "..";

export const UpBtn = (icon, txt) => {
  const btn = document.createElement("button");
  btn.setAttribute("id", "up-btn");
  btn.innerHTML = `<img src="${icon}" alt="${txt} icon" class="logo-btn">
                   <img src="/icon/moonicon.png" alt="moon icon" class="moon-icon">
                   <img src="/icon/sunicon.png" alt="sun icon" class="sun-icon">
                   <span>${ThemeSwitch}</span>`;

  const checkbox = btn.querySelector("#input");
  const sun = btn.querySelector(".sun-icon");
  const moon = btn.querySelector(".moon-icon");

  const dawn = () => {
    sun.classList.remove("hidden");
    moon.classList.add("hidden");
  };

  const sunset = () => {
    sun.classList.add("hidden");
    moon.classList.remove("hidden");
  };

  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
    checkbox.checked = true;
    sunset();
  } else {
    document.body.classList.remove("dark");
    checkbox.checked = false;
    dawn();
  }

  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      sunset();
    } else {
      localStorage.setItem("theme", "light");
      dawn();
    }
  });

  return btn;
};
