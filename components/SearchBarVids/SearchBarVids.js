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
      <option value="">Cualquiera</option>
      <option value="short">Corto (menos de 4 min)</option>
      <option value="medium">Mediano (4-20 min)</option>
      <option value="long">Largo (más de 20 min)</option>
    </select>
    <select id="order-select" class="search-select">
      <option value="viewCount">Más vistos</option>
      <option value="date">Fecha</option>
      <option value="relevance">Relevancia</option>
      <!-- Puedes agregar otras opciones según la documentación -->
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

    // Puedes definir valores fijos para región e idioma o incluso agregar más controles al form.
    const regionCode = "ES";
    const relevanceLanguage = "es";

    // Se pasa un objeto con todos los parámetros a onSearchQuery, el cual podrá utilizar estos filtros
    onSearchQuery({
      query,
      videoDuration,
      order,
      regionCode,
      relevanceLanguage
    });
  });

  return form;
};
