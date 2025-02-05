// NavBar.js

import "./Navbar.css";
import MenuUl from "../MenuUl/MenuUl.js";
import { UpBtn } from "../UpBtn/UpBtn.js";
import { LogOutBtn } from "../LogOutBtn/LogOutBtn.js";
import { SignBtn } from "../SignBtn/SignBtn.js";
import { getState } from "../../utils/state.js";

export const NavBar = () => {
  const header = document.querySelector("header");
  header.innerHTML = "";
  const nav = document.createElement("nav");
  nav.classList.add("navbar");
  nav.appendChild(UpBtn("/icon/list.png", "Design for U"));
  nav.appendChild(MenuUl());
  const navLinks = document.createElement("div");
  navLinks.classList.add("nav-links");

  if (getState("isLoggedIn")) {
    navLinks.innerHTML = "";
    navLinks.appendChild(LogOutBtn());
  } else {
    navLinks.innerHTML = "";
    navLinks.appendChild(SignBtn("sign-up-btn", "Sign Up", "register"));
    navLinks.appendChild(SignBtn("login-btn", "Login", "login"));
  }

  nav.appendChild(navLinks);
  header.appendChild(nav);
};
