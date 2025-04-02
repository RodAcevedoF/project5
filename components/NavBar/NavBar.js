import "./Navbar.css";
import { MenuUl, menuBtn } from "../MenuUl/MenuUl.js";
import { UpBtn } from "../UpBtn/UpBtn.js";
import { LogOutBtn } from "../LogOutBtn/LogOutBtn.js";
import { SignBtn } from "../SignBtn/SignBtn.js";
import { getState } from "../../utils/state.js";
import ProfileBtn from "../ProfileBtn/ProfileBtn.js";

export const NavBar = () => {
  const header = document.querySelector("header");
  header.innerHTML = "";

  const nav = document.createElement("nav");
  nav.classList.add("navbar");

  nav.appendChild(UpBtn("/icon/list.png", "Design for U"));

  const navLinks = document.createElement("div");
  navLinks.classList.add("nav-links");

  const menuContainer = MenuUl();
  const menuButton = menuBtn(menuContainer);
  
  menuButton.style.display = "none";
  navLinks.appendChild(menuButton);

  const currentPage = getState("currentPage");

  if (
    (currentPage === "landing" && window.innerWidth > 810) ||
    (currentPage === "signlogin" && window.innerWidth > 810)
  ) {
    nav.appendChild(menuContainer);
  } else {
    menuContainer.classList.add("floating")
    nav.appendChild(menuContainer);
    menuButton.style.display = "flex";
  }

  if (getState("isLoggedIn")) {
    navLinks.insertAdjacentElement("afterbegin", LogOutBtn());
    navLinks.appendChild(ProfileBtn());
    menuButton.style.display = "flex";
  } else {
    navLinks.appendChild(SignBtn("sign-up-btn", "Sign Up", "register"));
    navLinks.appendChild(SignBtn("login-btn", "Login", "login"));
  }

  nav.appendChild(navLinks);
  header.appendChild(nav);
};

window.addEventListener("resize", NavBar);
