import "./SearchBar.css";
import { getState } from "../../utils/state";

export const SearchBar = (onSearchQuery) => {
  const form = document.createElement("form");
  form.classList.add("search-bar");

  const categories = getState("categories") || [];

  form.innerHTML = `
      <input type="text" id="search-input" placeholder="Search..."/>
      <select id="category-select">
        <option value="">Select category</option>
        ${categories.map((category) => `<option value="${category}">${category}</option>`).join("")}
      </select>
      
      <!-- Barra de rango para páginas máximas -->
      <div class="range-slider">
        <label for="max-pages-range">Max pages</label>
        <input type="range" id="max-pages-range" min="0" max="700" value="0"/>
        <span id="max-pages-value">∞</span>
      </div>

      <button type="submit">Buscar</button>
  `;

  const maxPagesRange = form.querySelector("#max-pages-range");
  const maxPagesValue = form.querySelector("#max-pages-value");

  // Actualiza el texto según el valor del slider.
  maxPagesRange.addEventListener("input", () => {
    // Si el valor es 0 o 700, mostraremos "∞" para indicar que se toma como Infinity.
    if (maxPagesRange.value === "0" || maxPagesRange.value === "700") {
      maxPagesValue.textContent = "∞";
    } else {
      maxPagesValue.textContent = maxPagesRange.value;
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchInput = form.querySelector("#search-input");
    const categorySelect = form.querySelector("#category-select");

    const query = searchInput.value.trim();
    const category = categorySelect.value || "";

    // Convertimos el valor del rango y si es 0 o 700, lo tratamos como Infinity.
    let maxPages = parseInt(maxPagesRange.value, 10);
    if (maxPages === 0 || maxPages === 700) {
      maxPages = Infinity;
    }

    // Llamamos al callback con query, category y maxPages.
    onSearchQuery(query, category, maxPages);
  });

  return form;
};
