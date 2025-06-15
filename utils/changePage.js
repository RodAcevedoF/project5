import { setState, getState } from "../utils/state.js";
import { Footer, NavBar } from "../components";

export const changePage = (PageComponent, pageName) => {
  const main = document.querySelector("main");
  if (!main) {
    console.warn("Main not found in DOM.");
    return;
  }

  if (!PageComponent || typeof PageComponent !== "function") {
    console.error("PageComponent not valid", PageComponent);
    return;
  }

  console.log(`Changing to: ${pageName}`);

  const wasNotFound = getState("currentPage") === "notfound";
  setState("currentPage", pageName);
  const currentPage = pageName;

  window.scrollTo({ top: 0, behavior: "smooth" });

  main.style.marginTop = currentPage === "landing" ? "0" : "6rem";

  NavBar(currentPage);
  Footer();

  main.style.transition = "opacity 0.4s ease";
  main.style.opacity = "0";

  if (wasNotFound) {
    setTimeout(() => {
      document.querySelector("footer").style.display = "block";
      document.querySelector("header").style.display = "block";
    }, 500);
  }

  setTimeout(() => {
    main.innerHTML = "";

    try {
      PageComponent();
    } catch (error) {
      console.error(`Error rendering ${currentPage}`, error);
      main.innerHTML = `<section class="error-fallback">
        <h2>Error rendering this page</h2>
        <p>Try refreshing or go back to <a href="/">home</a>.</p>
      </section>`;
    }

    main.style.transition = "none";
    main.style.opacity = "0";

    setTimeout(() => {
      main.style.transition = "opacity 0.4s ease";
      main.style.opacity = "1";
    }, 10);
  }, 300);
};
