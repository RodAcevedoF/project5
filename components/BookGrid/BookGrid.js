import { BookCard } from "../BookCard/BookCard.js";
import "./BookGrid.css";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { searchBook } from "../../api/searchBook.js";
import { getBooks } from "../../api/bookApi.js";
import BackBtn from "../BackBtn/BackBtn.js";
import { Home } from "../../pages/Home/Home.js";

export const BookGrid = () => {
  const container = document.createElement("article");
  container.classList.add("book-article");

  const grid = document.createElement("div");
  grid.classList.add("book-grid");

  const toggleButton = document.createElement("button");
  toggleButton.innerText = "Ver libros guardados";
  toggleButton.classList.add("toggle-button");

  const loadMoreButton = document.createElement("button");
  loadMoreButton.innerText = "Cargar más";
  loadMoreButton.classList.add("load-more-button");
  loadMoreButton.style.display = "none";

  let showingSavedBooks = false;
  let query = "";
  let startIndex = 0;
  const maxResults = 10;
  let totalItems = 0;

  // Actualiza la cuadrícula con los libros obtenidos
  const updateResults = (result, isNewSearch = false) => {
    if (isNewSearch) {
      grid.innerHTML = "";
      startIndex = 0;
    }
    if (!result || !Array.isArray(result.books)) {
      grid.innerHTML = "<p>Error: Datos inválidos</p>";
      return;
    }
    if (result.books.length === 0 && isNewSearch) {
      grid.innerHTML = "<p>No se encontraron resultados.</p>";
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
      console.error("❌ Error: searchQuery inválida en SearchBar callback:", searchQuery);
      return;
    }
    if (isNewSearch) showLoading();
    const result = await searchBook(query, startIndex, maxResults);
    updateResults(result, isNewSearch);
  };

  const loadSavedBooks = async () => {
    grid.innerHTML = "<p>Cargando libros guardados...</p>";
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
      console.error("Error cargando libros guardados:", error);
      updateResults({ books: [], totalItems: 0 }, true);
    }
  };

  toggleButton.addEventListener("click", () => {
    showingSavedBooks = !showingSavedBooks;
    if (showingSavedBooks) {
      toggleButton.innerText = "Ver búsqueda de libros";
      searchBarElement.style.display = "none";
      loadMoreButton.style.display = "none";
      loadSavedBooks();
    } else {
      toggleButton.innerText = "Ver libros guardados";
      searchBarElement.style.display = "block";
      grid.innerHTML = "";
      loadMoreButton.style.display = "none";
    }
  });

  // Cargar más resultados sin limpiar la cuadrícula
  loadMoreButton.addEventListener("click", () => {
    searchBooks(false);
  });

  // Barra de búsqueda: recibe la consulta y la asigna para realizar la búsqueda
  const searchBarElement = SearchBar((searchQuery) => {
    if (!searchQuery || typeof searchQuery !== "string") {
      console.error("❌ Error: searchQuery inválida en SearchBar callback:", searchQuery);
      return;
    }
    query = searchQuery;
    searchBooks(true);
  });
  searchBarElement.style.display = "block";

  // Agregar elementos al contenedor
  container.appendChild(toggleButton);
  container.appendChild(searchBarElement);
  container.appendChild(grid);
  container.appendChild(loadMoreButton);
  container.appendChild(BackBtn(Home, "home"));

  const showLoading = () => {
    grid.innerHTML = "<p>Buscando...</p>";
  };

  return { container, updateResults, showLoading };
};
