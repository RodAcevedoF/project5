import { BookCard } from "../BookCard/BookCard.js";
import "./BookGrid.css";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { searchBook } from "../../api/searchBook.js";
import { getBooks } from "../../api/bookApi.js";
import ToggleBtn from "../ToggleBtn/ToggleBtn.js";

export const BookGrid = () => {
  const container = document.createElement("article");
  container.classList.add("book-article");
  const grid = document.createElement("section");
  grid.classList.add("book-grid");
  const toggleButton = ToggleBtn("Saved books", "Search books");

  const loadMoreButton = document.createElement("button");
  loadMoreButton.innerText = "Load more";
  loadMoreButton.classList.add("load-more-button");
  loadMoreButton.style.display = "none";

  let showingSavedBooks = false;
  let query = "";
  let startIndex = 0;
  const maxResults = 10;
  let totalItems = 0;

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

  // Realiza la búsqueda de libros usando la consulta actual
  const searchBooks = async (isNewSearch = false) => {
    if (!query || typeof query !== "string") {
      console.error("Error: invalid search:", searchQuery);
      return;
    }
    if (isNewSearch) showLoading();
    const result = await searchBook(query, startIndex, maxResults);
    updateResults(result, isNewSearch);
  };

  const loadSavedBooks = async () => {
    grid.innerHTML = "<p>Loading saved books...</p>";
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
      searchBarElement.style.display = "none";
      loadMoreButton.style.display = "none";
      loadSavedBooks();
    } else {
      searchBarElement.style.display = "block";
      grid.innerHTML = "";
      loadMoreButton.style.display = "none";
      query = getRandomQuery();
      searchBooks(true);
    }
  });

  // Cargar más resultados sin limpiar la cuadrícula
  loadMoreButton.addEventListener("click", () => {
    searchBooks(false);
  });

  // Barra de búsqueda: recibe la consulta y la asigna para realizar la búsqueda
  const searchBarElement = SearchBar((searchQuery) => {
    if (!searchQuery || typeof searchQuery !== "string") {
      console.error("Error: invalid search:", searchQuery);
      return;
    }
    query = searchQuery;
    searchBooks(true);
  });
  searchBarElement.style.display = "block";

  // Agregar elementos al contenedor
  const toggleDiv = document.createElement("section");
  toggleDiv.classList.add("toggle-div");
  toggleDiv.appendChild(toggleButton);
  container.appendChild(toggleDiv);
  container.appendChild(searchBarElement);
  container.appendChild(grid);
  container.appendChild(loadMoreButton);

  const showLoading = () => {
    grid.innerHTML = "<p>Loading...</p>";
  };

  query = getRandomQuery();
  searchBooks(true);

  return { container, updateResults, showLoading };
};
