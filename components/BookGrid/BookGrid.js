import { BookCard } from "../BookCard/BookCard.js";
import "./BookGrid.css";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { searchBook } from "../../api/searchBook.js";
import { getBooks } from "../../api/bookApi.js";
import ToggleBtn from "../ToggleBtn/ToggleBtn.js";
import LoadComp from "../LoadComp/LoadComp.js";
import { setState, getState } from "../../utils/state.js";
import updateBookCount from "../../utils/updateBookCount.js";

export const BookGrid = () => {
  const container = document.createElement("article");
  container.classList.add("book-article");
  const grid = document.createElement("section");
  grid.classList.add("book-grid");
  const toggleButton = ToggleBtn("Saved books", "Search books");

  const bookCountElement = document.createElement("p");
  bookCountElement.classList.add("book-count");
  bookCountElement.textContent = "Saved books: 0";

  const loadMoreButton = document.createElement("button");
  loadMoreButton.innerText = "Load more";
  loadMoreButton.classList.add("load-more-button");
  loadMoreButton.style.display = "none";

  let showingSavedBooks = false;
  let query = "";
  let startIndex = 0;
  const maxResults = 10;
  let totalItems = 0;
  let category = "";
  let minPages = 0;
  let maxPages = Infinity;


  const updateResults = (result, isNewSearch = false) => {
    if (isNewSearch) {
      grid.innerHTML = "";
      startIndex = 0;
    }
    if (!result || !Array.isArray(result.books)) {
      grid.innerHTML = "<p>Oopss...not valid!</p>";
      return;
    }
    if (result.books.length === 0 && isNewSearch) {
      grid.innerHTML = "<p>No results</p>";
      return;
    }
    result.books.forEach((book) => {
      const card = BookCard(book);
      grid.appendChild(card);
    });
    totalItems = result.totalItems;
    startIndex += maxResults;
    loadMoreButton.style.display = startIndex < totalItems ? "block" : "none";
  };

  const searchBooks = async (isNewSearch = false, category = "", maxPages = Infinity) => {
    if (!query && !category) {
      console.error("Error: Se necesita al menos un término de búsqueda o una categoría.");
      grid.innerHTML = "<p>Por favor, ingrese un término de búsqueda o seleccione una categoría.</p>";
      return;
    }
  
    if (isNewSearch) showLoading();
    const result = await searchBook(query, startIndex, maxResults, category, maxPages);
    updateResults(result, isNewSearch);
  };
  
  

  const loadSavedBooks = async () => {
    grid.innerHTML = LoadComp();
    try {
      const result = await getBooks();
      let books = Array.isArray(result)
        ? result
        : result.books && Array.isArray(result.books)
        ? result.books
        : result.data && Array.isArray(result.data)
        ? result.data
        : [];
      updateResults({ books, totalItems: books.length }, true);
      updateBookCount();
    } catch (error) {
      console.error("Error loading books:", error);
      updateResults({ books: [], totalItems: 0 }, true);
    }
  };

  const randomQueries = [
    "science",
    "history",
    "fiction",
    "fantasy",
    "mystery",
    "art",
    "music"
  ];
  const getRandomQuery = () => {
    const randomIndex = Math.floor(Math.random() * randomQueries.length);
    return randomQueries[randomIndex];
  };

  toggleButton.addEventListener("click", () => {
    showingSavedBooks = !showingSavedBooks;
    if (showingSavedBooks) {
      // Modo: Libros Guardados
      searchBarElement.style.display = "none";
      loadMoreButton.style.display = "none";
      bookCountElement.style.display = "block";
      loadSavedBooks();
    } else {
      // Modo: Búsqueda de Libros
      searchBarElement.style.display = "flex";
      grid.innerHTML = "";
      loadMoreButton.style.display = "none";
      bookCountElement.style.display = "none"; 
      query = getRandomQuery();
      searchBooks(true, category, maxPages);
    }
  }); 
  

  loadMoreButton.addEventListener("click", () => {
    searchBooks(false);
  });

  const searchBarElement = SearchBar((searchQuery, selectedCategory, maxPages) => {
    // Permite que la búsqueda funcione con categoría aunque el query esté vacío
    query = searchQuery || ""; 
    category = selectedCategory || "";
    maxPages = maxPages || Infinity;
  
    // Realiza la búsqueda
    searchBooks(true, category, maxPages);
  });
  
  
  searchBarElement.style.display = "flex";

  const toggleSect = document.createElement("section");
  toggleSect.classList.add("toggle-section");
  const menuSect = document.createElement("section");
  menuSect.classList.add("menu-section");
  menuSect.appendChild(bookCountElement);
  menuSect.appendChild(searchBarElement); 
  toggleSect.appendChild(toggleButton);
  container.appendChild(toggleSect);
  container.appendChild(menuSect);
  container.appendChild(grid);
  container.appendChild(loadMoreButton);

  document.addEventListener("bookDeleted", async (event) => {
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

  query = getRandomQuery();
  searchBooks(true);

  return { container, updateResults, showLoading };
};
