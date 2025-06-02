import { setState, getState } from "../utils/state.js";
import { NavBar } from "../components/NavBar/NavBar.js";

export const changePage = (PageComponent, pageName) => {
  const main = document.querySelector("main");
  if (!main) return;

  setState("currentPage", pageName);
  console.log(getState("currentPage"));
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  NavBar();

  main.style.transition = "opacity 0.4s ease";
  main.style.opacity = "0";

  setTimeout(() => {
    main.innerHTML = "";
    PageComponent();

    main.style.transition = "none";
    main.style.opacity = "0";

    setTimeout(() => {
      main.style.transition = "opacity 0.4s ease";
      main.style.opacity = "1";
    }, 10);
  }, 300);
};
