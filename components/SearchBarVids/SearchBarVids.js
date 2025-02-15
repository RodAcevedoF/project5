// SearchBar.js
import { searchVideo } from "../../api/searchVideos";

export const SearchBarVids = (onSearchResults) => {
  const container = document.createElement("div");
  container.classList.add("search-bar");

  container.innerHTML = `
    <form id="search-form">
      <input type="text" id="search-input" placeholder="Buscar videos..." required />
      <button type="submit">Buscar</button>
    </form>
  `;

  const form = container.querySelector("#search-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = container.querySelector("#search-input").value.trim();
    if (!query) return;
    console.log("Consulta enviada:", query); // Log de la consulta
    const results = await searchVideo(query);
    console.log("Resultados de la búsqueda:", results); // Log de los resultados
    onSearchResults(results);
  });

  return container;
};
