import "./Navbar.css";
import { MenuUl, menuBtn } from "../MenuUl/MenuUl.js";
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

  const currentPage = getState("currentPage");
  console.log(currentPage);
  const menuContainer = MenuUl();
  if (currentPage == "landing" || currentPage == "signlogin") {
    nav.appendChild(menuContainer);
  } else {
    nav.appendChild(menuContainer).classList.add("floating");
  }

  const navLinks = document.createElement("div");
  navLinks.classList.add("nav-links");

  if (getState("isLoggedIn")) {
    navLinks.appendChild(LogOutBtn());
    navLinks.appendChild(menuBtn());
  } else {
    navLinks.appendChild(SignBtn("sign-up-btn", "Sign Up", "register"));
    navLinks.appendChild(SignBtn("login-btn", "Login", "login"));
  }

  nav.appendChild(navLinks);
  header.appendChild(nav);
};
