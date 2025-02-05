import "./Navbar.css";
import MenuUl from "../MenuUl/MenuUl.js";
import { UpBtn } from "../UpBtn/UpBtn.js";
import { LogOutBtn } from "../LogOutBtn/LogOutBtn.js";
import { SignBtn } from "../SignBtn/SignBtn.js";

export const NavBar = () => {
  const header = document.querySelector("header");
  header.innerHTML = ""; 
  const nav = document.createElement("nav");
  nav.classList.add("navbar");
  nav.appendChild(UpBtn("/icon/list.png", "Design for U"));
  nav.appendChild(MenuUl());
  const navLinks = document.createElement("div");
  navLinks.classList.add("nav-links");
  //navLinks.appendChild(LogOutBtn());
  navLinks.appendChild(SignBtn("sign-in-btn", "Sign Up"));
  navLinks.appendChild(SignBtn("login-btn", "Login"));
  nav.appendChild(navLinks);
  header.appendChild(nav);
};
