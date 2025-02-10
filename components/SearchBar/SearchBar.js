import { searchBook } from "../../api/searchBook.js";

export const SearchBar = (onSearchResults) => {
  const container = document.createElement("div");
  container.classList.add("search-bar");

  container.innerHTML = `
    <form id="search-form">
      <input type="text" id="search-input" placeholder="Buscar libros..." required />
      <button type="submit">Buscar</button>
    </form>
  `;

  const form = container.querySelector("#search-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = container.querySelector("#search-input").value.trim();
    if (!query) return;
    const results = await searchBook(query);
    onSearchResults(results);
  });

  return container;
};
