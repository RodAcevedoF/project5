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

export const BookGrid = () => {
  const container = document.createElement("article");
  container.classList.add("book-article");

  const grid = document.createElement("section");
  grid.classList.add("book-grid");

  const toggleButton = ToggleBtn("SAVED BOOKS", "SEARCH BOOKS");
  const loadMoreButton = LoadMoreBtn("loadMore");

  let showingSavedBooks = false;
  let query = "";
  let startIndex = 0;
  const maxResults = 10;
  let totalItems = 0;
  let category = "";
  let maxPages = Infinity;

  const updateResults = (result, isNewSearch = false) => {
    if (isNewSearch) {
      grid.innerHTML = "";
      startIndex = 0;
    }

    if (!result || !Array.isArray(result.books) || result.books.length === 0) {
      grid.innerHTML = ""; // Opcional: limpia la cuadrícula
      const bookSuggestions = BookSuggestions(searchBooks, toggleButton);
      grid.appendChild(bookSuggestions);
      return;
    }

    result.books.forEach((book) => {
      const existingCard = grid.querySelector(`[data-book-id="${book.id}"]`);
      if (existingCard) {
        console.warn(`Duplicate card with ID: ${book.id}`);
        return;
      }

      const card = BookCard(book);
      grid.appendChild(card);
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
        "<p>Por favor, ingrese un término de búsqueda o seleccione una categoría.</p>";
      return;
    }

    if (isNewSearch) showLoading();

    const result = await searchBook(
      searchQuery,
      startIndex,
      maxResults,
      searchCategory,
      searchMaxPages
    );
    updateResults(result, isNewSearch);
  };

  const loadSavedBooks = async () => {
    grid.innerHTML = LoadComp();
    try {
      const books = await getBooks();
      setState("bookCards", books);
      updateResults({ books, totalItems: books.length }, true);
      const categories = await getCategories();
      const savedBooksBarElement = SavedBooksBar(categories);
      const menuSection = document.querySelector(".menu-section");
      const savedBooksBar = document.querySelector(".saved-books-bar");
      if (!savedBooksBar) {
        menuSection.appendChild(savedBooksBarElement);
      }
      filterBooks("", Infinity, "");
      updateBookCount();
    } catch (error) {
      console.error("Error retrieveng books:", error);
      grid.innerHTML = "<p>Error loading your saved books</p>";
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

  toggleButton.addEventListener("click", async () => {
    showingSavedBooks = !showingSavedBooks;
    if (showingSavedBooks) {
      searchBarElement.style.display = "none";
      loadMoreButton.style.display = "none";
      grid.innerHTML = "";
      await loadSavedBooks();
      const savedBooksBar = document.querySelector(".saved-books-bar");
      if (savedBooksBar) {
        savedBooksBar.style.display = "flex";
      }
      setState("currentToggle", "saved");
    } else {
      searchBarElement.style.display = "flex";
      loadMoreButton.style.display = "none";
      const savedBooksBar = document.querySelector(".saved-books-bar");
      if (savedBooksBar) {
        savedBooksBar.style.display = "none";
      }
      setState("currentToggle", "search");
      grid.innerHTML = "";
      searchBarElement.reset();
      getRandomQuery();
    }
  });

  loadMoreButton.addEventListener("click", () => {
    searchBooks();
  });

  document.addEventListener("bookDeleted", (event) => {
    const { bookId } = event.detail;
    const bookCards = getState("bookCards") || {};
    if (bookCards[bookId]) {
      delete bookCards[bookId];
      setState("bookCards", bookCards);
    }
    updateBookCount();
  });

  const showLoading = () => {
    grid.innerHTML = LoadComp();
  };

  searchBarElement.style.display = "flex";

  const toggleSect = document.createElement("section");
  toggleSect.classList.add("toggle-section");
  toggleSect.appendChild(toggleButton);

  const menuSect = document.createElement("section");
  menuSect.classList.add("menu-section");
  menuSect.appendChild(searchBarElement);

  container.appendChild(toggleSect);
  container.appendChild(menuSect);
  container.appendChild(grid);
  container.appendChild(loadMoreButton);

  getRandomQuery();

  return { container, updateResults, showLoading, searchBooks };
};
