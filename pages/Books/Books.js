import "./Books.css";
import { BookGrid, HeroBanner, InnerFooter } from "../../components";

export const Books = () => {
  const main = document.querySelector("main");
  main.innerHTML = `<section class="book-main"></section>`;

  const hero = HeroBanner({
    header: "Books",
    messages: ["Search books", "Save Books", "Read books"]
  });
  const bookGrid = BookGrid();

  const section = main.querySelector(".book-main");
  section.appendChild(hero);

  section.appendChild(bookGrid.container);

  section.appendChild(InnerFooter());

  return main;
};
