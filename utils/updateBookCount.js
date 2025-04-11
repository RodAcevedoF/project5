import { getState } from "./state.js";

export const getCategories = async () => {
  const bookCards = getState("bookCards") || {};
  const categories = new Set();

  Object.values(bookCards).forEach((book) => {
    if (Array.isArray(book.categories) && book.categories.length > 0) {
      book.categories.forEach((category) => categories.add(category));
    }
  });

  return Array.from(categories);
};

export const filterBooks = (query = "", maxPages = Infinity, category = "") => {
  const bookCards = getState("bookCards") || {};

  Object.values(bookCards).forEach((book) => {
    const bookCard = document.querySelector(`[data-book-id="${book.id}"]`);
    if (!bookCard) return;

    const matchesName = book.title.toLowerCase().includes(query.toLowerCase());
    let matchesCategory = true;
    if (category) {
      if (Array.isArray(book.categories)) {
        if (
          book.categories.length > 0 &&
          typeof book.categories[0] === "object"
        ) {
          matchesCategory = book.categories.some(
            (cat) => cat.name.toLowerCase() === category.toLowerCase()
          );
        } else {
          matchesCategory = book.categories.includes(category);
        }
      } else {
        matchesCategory = false;
      }
    }

    const matchesPages = book.pages ? book.pages <= maxPages : true;

    if (matchesName && matchesCategory && matchesPages) {
      bookCard.style.display = "block";
    } else {
      bookCard.style.display = "none";
    }
  });
};

export const updateBookCount = () => {
  const visibleCards = Array.from(
    document.querySelectorAll(".book-card")
  ).filter((card) => card.style.display !== "none").length;
  const allCards = Object.keys(getState("bookCards")).length || 8;
  const countElement = document.querySelector(".book-count");
  if (countElement) {
    countElement.textContent = `${visibleCards} / ${allCards}`;
  }
};

export const updateCategorySelect = async () => {
  const categories = await getCategories();
  const categorySelect = document.querySelector("#category-select");

  if (!categorySelect) return;

  categorySelect.innerHTML = `
    <option value="">Select category</option>
    ${categories
      .map(
        (category) =>
          `<option value="${category.name}">${category.name}</option>`
      )
      .join("")}
  `;
};
