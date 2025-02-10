import { BookCard } from "../BookCard/BookCard.js";

export const BookGrid = () => {
  const container = document.createElement("div");
  container.classList.add("book-grid");

  const showLoading = () => {
    container.innerHTML = `<p>Buscando...</p>`;
  };

  const updateResults = (results) => {
    container.innerHTML = ""; 
    if (results.error) {
      container.innerHTML = `<p>Error: ${results.error}</p>`;
      return;
    }
    if (results.length === 0) {
      container.innerHTML = `<p>No se encontraron resultados.</p>`;
      return;
    }
    results.forEach((book) => {
      const card = BookCard(book);
      container.appendChild(card);
    });
  };

  return { container, updateResults, showLoading };
};
