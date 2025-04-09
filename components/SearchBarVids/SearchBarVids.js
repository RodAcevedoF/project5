/* import "./SearchBarVids.css";
import MainBtn from "../MainBtn/MainBtn";
import { SearchElement } from "../SeachElement/SearchElement";

export const SearchBarVids = (onSearchQuery) => {
  const form = document.createElement("form");
  form.classList.add("search-vids-form");

  form.innerHTML = `
      ${SearchElement()}
      ${MainBtn("submit", "searchvid-btn", "main-btn", "Search")}
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("#search-input");
    const query = input.value.trim();
    if (!query) return;
    onSearchQuery(query);
  });

  return form;
};
 */
import "./SearchBarVids.css";
import MainBtn from "../MainBtn/MainBtn";
import { SearchElement } from "../SeachElement/SearchElement";

export const SearchBarVids = (onSearchQuery) => {
  const form = document.createElement("form");
  form.classList.add("search-vids-form");

  // Agregamos campos adicionales para seleccionar la duración y el orden
  form.innerHTML = `
    ${SearchElement()}
    <select id="duration-select" class="search-select">
      <option value="">Any length</option>
      <option value="short">Short (< 4 min)</option>
      <option value="medium">Medium (4-20 min)</option>
      <option value="long">Long (> 20 min)</option>
    </select>
    <select id="order-select" class="search-select">
    <option value="relevance">Relevance</option>
      <option value="viewCount">Most viewed</option>
      <option value="date">Most recent</option>
    </select>
    ${MainBtn("submit", "searchvid-btn", "main-btn", "Search")}
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("#search-input");
    const query = input.value.trim();
    if (!query) return;

    // Recoger los valores seleccionados
    const videoDuration = form.querySelector("#duration-select").value;
    const order = form.querySelector("#order-select").value;

    // Se pasa un objeto con todos los parámetros a onSearchQuery (sin idioma ni región)
    onSearchQuery({
      query,
      videoDuration,
      order
    });
  });

  return form;
};
