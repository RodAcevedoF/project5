// Limpieza aplicada: sin persistencia de currentToggle y prevención de duplicados
import { BookCard } from "../BookCard/BookCard.js";
import "./BookGrid.css";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { searchBook } from "../../api/searchBook.js";
import { getBooks } from "../../api/bookApi.js";
import ToggleBtn from "../ToggleBtn/ToggleBtn.js";
import LoadComp from "../LoadComp/LoadComp.js";
import { setState, getState } from "../../utils/state.js";
import { randomQueries } from "../../data/options.js";
import BookSuggestions from "../BookSuggestions/BookSuggestions.js";
import SavedBooksBar from "../SavedBooksBar/SavedBooksBar.js";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.js";
import {
  getCategories,
  filterBooks,
  updateBookCount
} from "../../utils/updateBookCount.js";
import SavedList from "../SavedList/SavedList.js";
import ListElement from "../ListElement/ListElement.js";

export const BookGrid = () => {
  const container = document.createElement("article");
  container.classList.add("book-article");

  const menuSect = document.createElement("section");
  menuSect.classList.add("menu-section");

  const grid = document.createElement("section");
  grid.classList.add("book-grid");

  const toggleSect = document.createElement("section");
  toggleSect.classList.add("toggle-section");

  const savedSect = document.createElement("section");
  savedSect.classList.add("saved-section");

  const List = SavedList();
  let showingSavedBooks = false;
  const toggleButton = ToggleBtn("TO SAVED BOOKS", "TO SEARCH BOOKS", "search");
  const loadMoreButton = LoadMoreBtn("loadMore");

  let query = "";
  let startIndex = 0;
  const maxResults = 10;
  let totalItems = 0;
  let category = "";
  let maxPages = Infinity;

  const showLoading = (comp) => {
    comp.innerHTML = LoadComp();
  };

  const updateResults = (comp, result, isNewSearch = false) => {
    if (isNewSearch) {
      comp.innerHTML = "";
      startIndex = 0;
    }

    if (!result?.books?.length) {
      comp.innerHTML = "";
      comp.appendChild(BookSuggestions(searchBooks, toggleButton));
      return;
    }

    const renderedIds = new Set(
      Array.from(comp.querySelectorAll("[data-book-id]")).map((el) =>
        el.getAttribute("data-book-id")
      )
    );

    result.books.forEach((book) => {
      if (renderedIds.has(book.id)) return;
      const elem = comp === grid ? BookCard(book) : ListElement(book);
      comp.appendChild(elem);
    });

    totalItems = result.totalItems;
    startIndex += maxResults;
    loadMoreButton.style.display = startIndex < totalItems ? "block" : "none";
  };

  const searchBooks = async (
    isNewSearch = false,
    queryOverride = null,
    categoryOverride = null,
    maxPagesOverride = Infinity
  ) => {
    const searchQuery = queryOverride || query;
    const searchCategory = categoryOverride || category;
    const searchMaxPages =
      maxPagesOverride !== Infinity ? maxPagesOverride : maxPages;

    if (!searchQuery && !searchCategory) {
      grid.innerHTML =
        "<p>Please, enter a search term or a valid category.</p>";
      return;
    }

    if (isNewSearch) showLoading(grid);

    const result = await searchBook(
      searchQuery,
      startIndex,
      maxResults,
      searchCategory,
      searchMaxPages
    );
    updateResults(grid, result, isNewSearch);
  };

  const loadSavedBooks = async () => {
    showLoading(List);
    try {
      const books = await getBooks();
      setState("bookCards", books);
      updateResults(List, { books, totalItems: books.length }, true);

      const categories = await getCategories();
      const savedBooksBar =
        document.querySelector(".saved-books-bar") || SavedBooksBar(categories);
      if (!savedBooksBar.parentNode) menuSect.appendChild(savedBooksBar);

      filterBooks("", Infinity, "");
      updateBookCount();
    } catch (error) {
      console.error("Error retrieving books:", error);
      grid.innerHTML = "<p>Error loading your saved books</p>";
    }
  };

  const handleToggle = async () => {
    showingSavedBooks = !showingSavedBooks;

    const savedBar = document.querySelector(".saved-books-bar");
    if (showingSavedBooks) {
      searchBarElement.style.display = "none";
      grid.style.display = "none";
      savedSect.style.display = "flex";
      if (savedBar) savedBar.style.display = "flex";
      await loadSavedBooks();
    } else {
      searchBarElement.style.display = "flex";
      grid.style.display = "grid";
      savedSect.style.display = "none";
      if (savedBar) savedBar.style.display = "none";
      grid.innerHTML = "";
      searchBarElement.reset();
      getRandomQuery();
    }
  };

  const handleBookDeleted = async ({ detail: { bookId } }) => {
    const bookCards = getState("bookCards") || {};
    if (bookCards[bookId]) {
      delete bookCards[bookId];
      setState("bookCards", bookCards);
    }

    updateBookCount();

    try {
      const newCategories = await getCategories();
      const oldBar = document.querySelector(".saved-books-bar");
      if (oldBar) {
        const newBar = SavedBooksBar(newCategories);
        oldBar.replaceWith(newBar);
      }
    } catch (error) {
      console.error("Error al actualizar la barra de filtros:", error);
    }
  };

  const getRandomQuery = () => {
    const randomIndex = Math.floor(Math.random() * randomQueries.length);
    query = randomQueries[randomIndex];
    searchBooks(true);
  };

  const searchBarElement = SearchBar(
    (searchQuery, selectedCategory, selectedMaxPages) => {
      query = searchQuery || "";
      category = selectedCategory || "";
      maxPages = selectedMaxPages || Infinity;
      searchBooks(true);
    }
  );

  toggleButton.addEventListener("click", handleToggle);
  loadMoreButton.addEventListener("click", () => searchBooks());

  let deleteTimeout;
  document.addEventListener("bookDeleted", (e) => {
    clearTimeout(deleteTimeout);
    deleteTimeout = setTimeout(() => handleBookDeleted(e), 100);
  });

  searchBarElement.style.display = "flex";
  toggleSect.appendChild(toggleButton);
  menuSect.appendChild(searchBarElement);
  savedSect.appendChild(List);

  container.append(toggleSect, menuSect, grid, loadMoreButton, savedSect);

  // Estado inicial: search
  savedSect.style.display = "none";
  getRandomQuery();

  return { container, updateResults, showLoading, searchBooks };
};
