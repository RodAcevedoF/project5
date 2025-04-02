// Books.js
import "./Books.css";
import { BookGrid } from "../../components/BookGrid/BookGrid.js";
import HeroBanner from "../../components/HeroBanner/HeroBanner.js";
import InnerFooter from "../../components/InnerFooter/InnerFooter.js";
import { loadCategories } from "../../utils/getPopularCategories.js"
await loadCategories();

export const Books = () => {
  const main = document.querySelector("main");
  main.innerHTML = `<section class="book-main"></section>`;

  const section = main.querySelector(".book-main");
  section.appendChild(HeroBanner("Searching books?"));

  const bookGrid = BookGrid();
  section.appendChild(bookGrid.container);
  
  section.appendChild(InnerFooter());

  return main;
};
