import "./BookSuggestions.css";
import { arrayOptions } from "../../data/options";
import { SuggestionBtn } from "..";
import { getState } from "../../utils";

const BookSuggestions = (searchBooks, toggleButton) => {
  document.querySelector(".book-grid").classList.add("height");
  const div = document.createElement("div");
  div.classList.add("book-suggestions");
  div.innerHTML = `<p>Something went wrong</p>
                   <h3>Try searching for...</h3>
                   <div class="opt-btns-div"></div>`;

  const btnsDiv = div.querySelector(".opt-btns-div");
  for (let i = 0; i < 3; i++) {
    let btn = SuggestionBtn((query) => {
      searchBooks(true, query);
      const currentToggle = getState("currentToggle");
      if (currentToggle === "saved") {
        toggleButton.click();
      }
    }, arrayOptions);
    btnsDiv.appendChild(btn);
  }

  return div;
};

export default BookSuggestions;
