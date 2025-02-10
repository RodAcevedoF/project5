// Books.js
import "./Books.css";
import { createBook, getBooks, updateBook, deleteBook } from "../../api/bookAPI.js";
import { SearchBar } from "../../components/SearchBar/SearchBar.js";
import { BookAside } from "../../components/BookAside/BookAside.js";
import { BookGrid } from "../../components/BookGrid/BookGrid.js";
import HeroBanner from "../../components/HeroBanner/HeroBanner.js";

export const Books = () => {
  const main = document.querySelector("main");
  main.innerHTML = `<section class="book-search"></section>`;

  const section = main.querySelector(".book-search");
  section.appendChild(HeroBanner());

  const bookGrid = BookGrid();
  const bookAside = BookAside();

  document.addEventListener("bookSaved", () => {
    bookAside.refresh();
  });

  const handleSearchResults = (results) => {
    bookGrid.updateResults(results);
  };

  const searchBar = SearchBar(handleSearchResults);

  section.appendChild(searchBar);
  section.appendChild(bookGrid.container);
  section.appendChild(bookAside.container);

  return main;
};
