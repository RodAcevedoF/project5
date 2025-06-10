import "./SavedBookBar.css";
import { filterBooks, updateBookCount } from "../../utils/updateBookCount.js";
import { MainBtn, RangeSlider, SearchElement } from "../index.js";

const SavedBooksBar = (categories) => {
  const containerBar = document.createElement("div");
  containerBar.classList.add("saved-books-bar");

  containerBar.innerHTML = `
    <div class="matches-info">
      <p class="head-info">Matches</p>
      <p class="book-count">0</p>
    </div>
    ${SearchElement()}
    <select id="saved-category-select">
      <option value="">Select category</option>
      ${categories
        .map((category) => `<option value="${category}">${category}</option>`)
        .join("")}
    </select>
    ${RangeSlider()}
    ${MainBtn("submit", "clear-button", "main-btn", "Clear")}`;

  const attachEvents = () => {
    const searchInput = containerBar.querySelector("#search-input");
    const categorySelect = containerBar.querySelector("#saved-category-select");
    const maxPagesRange = containerBar.querySelector("#max-pages-range");
    const maxPagesValue = containerBar.querySelector("#max-pages-value");
    const clearButton = containerBar.querySelector("#clear-button");

    const updateResults = () => {
      const query = searchInput.value.trim();
      let maxPages = parseInt(maxPagesRange.value, 10) || Infinity;
      if (maxPages === 0 || maxPages === 700) {
        maxPages = Infinity;
      }
      const category = categorySelect.value;
      filterBooks(query, maxPages, category);
      updateBookCount();
    };

    searchInput.addEventListener("input", updateResults);
    categorySelect.addEventListener("change", updateResults);

    maxPagesRange.addEventListener("input", () => {
      const numericValue = parseInt(maxPagesRange.value, 10);
      if (numericValue === 0 || numericValue === 700) {
        maxPagesValue.textContent = "∞";
      } else {
        maxPagesValue.textContent = numericValue;
      }
      updateResults();
    });

    clearButton.addEventListener("click", (event) => {
      event.preventDefault();
      searchInput.value = "";
      categorySelect.value = "";
      maxPagesRange.value = "0";
      maxPagesValue.textContent = "∞";
      updateResults();
    });
  };

  setTimeout(attachEvents, 0);

  return containerBar;
};

export default SavedBooksBar;
