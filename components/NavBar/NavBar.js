import "./Navbar.css";

import { UpBtn } from "../UpBtn/UpBtn.js";
import { LogOutBtn } from "../LogOutBtn/LogOutBtn.js";

export const NavBar = () => {
  const header = document.querySelector("header");
  header.innerHTML = ""; 

  const nav = document.createElement("nav");
  nav.classList.add("navbar");

  const logoButton = UpBtn("/icon/list.png", "To-Do");
  nav.appendChild(logoButton);

  const navLinks = document.createElement("div");
  navLinks.classList.add("nav-links");

  const logOutBtn = LogOutBtn();
  navLinks.appendChild(logOutBtn);

  nav.appendChild(navLinks);
  header.appendChild(nav);
};
