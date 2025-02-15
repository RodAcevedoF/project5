// Books.js
import "./Books.css";
import { BookGrid } from "../../components/BookGrid/BookGrid.js";
import HeroBanner from "../../components/HeroBanner/HeroBanner.js";

export const Books = () => {
  const main = document.querySelector("main");
  main.innerHTML = `<section class="book-main"></section>`;

  const section = main.querySelector(".book-main");
  section.appendChild(HeroBanner());

  const bookGrid = BookGrid();

  section.appendChild(bookGrid.container);

  return main;
};
