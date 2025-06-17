import "./Navbar.css";
import { MenuUl, menuBtn, LogOutBtn, ProfileBtn, SignBtn, UpBtn } from "..";
import { getState } from "../../utils";

export const NavBar = (currentPage = getState("currentPage")) => {
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

  const alwaysFloating =
    currentPage !== "landing" && currentPage !== "signlogin";

  if (alwaysFloating || window.innerWidth <= 810) {
    menuContainer.classList.add("floating");
    menuButton.style.display = "flex";
  } else {
    menuButton.style.display = "none";
  }

  nav.appendChild(menuContainer);

  if (getState("isLoggedIn")) {
    navLinks.insertAdjacentElement("afterbegin", LogOutBtn());
    navLinks.appendChild(ProfileBtn());
    menuButton.style.display = "flex";
  } else if (currentPage === "verify-pending") {
    navLinks.insertAdjacentElement("afterbegin", LogOutBtn());
    menuButton.style.display = "flex";
  } else {
    navLinks.appendChild(SignBtn("sign-up-btn", "Sign Up", "register"));
    navLinks.appendChild(SignBtn("login-btn", "Login", "login"));
  }

  nav.appendChild(navLinks);
  header.appendChild(nav);
};

window.addEventListener("resize", () => {
  const currentPage = getState("currentPage");
  const width = window.innerWidth;

  const header = document.querySelector("header");
  const nav = header.querySelector("nav");
  const hasFloatingMenu = nav?.querySelector(".floating") !== null;

  const alwaysFloating =
    currentPage !== "landing" && currentPage !== "signlogin";
  const shouldHaveFloating = alwaysFloating || width <= 810;
  const shouldHaveInline = !alwaysFloating && width > 810;

  const needsRedraw =
    (shouldHaveFloating && !hasFloatingMenu) ||
    (shouldHaveInline && hasFloatingMenu);

  if (needsRedraw) {
    NavBar(currentPage);
  }
});

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  if (window.scrollY === 0) {
    nav.classList.add("top-bg");
  } else {
    nav.classList.remove("top-bg");
  }
});
