import "./SearchBar.css";
import { getState } from "../../utils/state";
import { SearchElement } from "../SeachElement/SearchElement";
import { RangeSlider } from "../RangeSlider/RangeSlider";
import MainBtn from "../MainBtn/MainBtn";

export const SearchBar = (onSearchQuery) => {
  const form = document.createElement("form");
  form.classList.add("search-bar");

  const categories = getState("categories") || ["science", "history", "art", "biography", "computers", "medical", "music]"];
  form.innerHTML = `
      ${SearchElement()}
      <select id="category-select">
        <option value="">Select category</option>
        ${categories.map((category) => `<option value="${category}">${category}</option>`).join("")}
      </select>
      ${RangeSlider()}
      ${MainBtn("submit", "searchbar-btn", "main-btn", "Search")}
  `;

  const maxPagesRange = form.querySelector("#max-pages-range");
  const maxPagesValue = form.querySelector("#max-pages-value");

  maxPagesRange.addEventListener("input", () => {
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

    let maxPages = parseInt(maxPagesRange.value, 10);
    if (maxPages === 0 || maxPages === 700) {
      maxPages = Infinity;
    }

    onSearchQuery(query, category, maxPages);
  });

  return form;
};
 