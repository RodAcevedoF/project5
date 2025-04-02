import "./BookSuggestions.css";
import { arrayOptions } from "../../data/options";
import SuggestionBtn from "../SuggestionBtn/SuggestionBtn";

const BookSuggestions = (searchBooks) => {
  const div = document.createElement("div");
  div.classList.add("book-suggestions");
  div.innerHTML = `<p>Something went wrong</p>
                   <h3>Try searching for...</h3>`;

  for (let i = 0; i < 3; i++) {
    let btn = SuggestionBtn((query) => {
      console.log(`Sugerencia seleccionada: ${query}`);
      searchBooks(true, query);
    }, arrayOptions);
    div.appendChild(btn);
  }

  return div;
};

export default BookSuggestions;
