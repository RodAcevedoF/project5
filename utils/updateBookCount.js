import { getState } from "./state";

const updateBookCount = () => {
  const bookCards = getState("bookCards") || {};
  const count = Object.keys(bookCards).length;
  document.querySelector(".book-count").textContent = `Saved books: ${count}`;
};

export default updateBookCount;
