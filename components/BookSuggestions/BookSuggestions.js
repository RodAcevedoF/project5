import "./BookSuggestions.css";
import { arrayOptions } from "../../data/options";
import SuggestionBtn from "../SuggestionBtn/SuggestionBtn";
import { getState } from "../../utils/state"; // Asegúrate de importar getState

const BookSuggestions = (searchBooks, toggleButton) => {
  // Asegúrate de pasar toggleButton como argumento
  const div = document.createElement("div");
  div.classList.add("book-suggestions");
  div.innerHTML = `<p>Something went wrong</p>
                   <h3>Try searching for...</h3>`;

  for (let i = 0; i < 3; i++) {
    let btn = SuggestionBtn((query) => {
      console.log(`Sugerencia seleccionada: ${query}`);
      searchBooks(true, query); // Realiza la búsqueda con la sugerencia
      const currentToggle = getState("currentToggle");
      // Disparar toggleButton si la vista es "search"
      if (currentToggle === "saved") {
        toggleButton.click(); // Dispara el clic de toggleButton para cambiar entre vistas
      }
    }, arrayOptions);
    div.appendChild(btn);
  }

  return div;
};

export default BookSuggestions;
