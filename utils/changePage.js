import { setState, getState } from "../utils/state.js";
import { NavBar } from "../components/NavBar/NavBar.js";

export const changePage = (PageComponent, pageName) => {
  const main = document.querySelector("main");
  if (!main) return;

  setState("currentPage", pageName);

  if (
    getState("currentPage") === "home" &&
    document.body.classList.contains("dark")
  ) {
    main.style.background = "black";
  } else {
    main.style.background = "inherit";
  }

  NavBar();

  main.style.transition = "width 0.4s ease, opacity 0.4s ease";
  main.style.width = "0";
  main.style.opacity = "0";

  setTimeout(() => {
    main.innerHTML = "";
    PageComponent();

    main.style.transition = "none";
    main.style.width = "100%";
    main.style.opacity = "0";

    setTimeout(() => {
      main.style.transition = "width 0.4s ease, opacity 0.4s ease";
      main.style.opacity = "1";
    }, 10);
  }, 400);
};
