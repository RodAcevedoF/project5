// components/BookAside/BookAside.js
import { getBooks } from "../../api/bookAPI.js";
import { getState, setState } from "../../utils/state.js"; // Ajusta la ruta según corresponda
import { BookCard } from "../../components/BookCard/BookCard.js";

function expandSavedBook(book) {
  // Obtenemos el mapa global de tarjetas
  const bookCards = getState("bookCards") || {};
  let card = bookCards[book.id];

  // Revisamos si ya existe una tarjeta de libro guardado actualmente mostrada
  const currentSavedCard = getState("currentSavedCard");
  if (currentSavedCard && currentSavedCard !== card) {
    // Si existe y es diferente a la que queremos mostrar, la eliminamos del DOM
    currentSavedCard.remove();
    setState("currentSavedCard", null);
  }

  if (!card) {
    // Si la tarjeta no existe (por ejemplo, no se realizó búsqueda), la creamos
    card = BookCard(book);
    const grid = document.querySelector(".book-grid");
    if (grid) {
      grid.appendChild(card);
    } else {
      alert("No se encontró el contenedor de BookGrid.");
      return;
    }
    // Almacenamos la tarjeta en el mapa global
    bookCards[book.id] = card;
    setState("bookCards", bookCards);
  }

  // Guardamos la tarjeta actual como la mostrada
  setState("currentSavedCard", card);

  // Simulamos un clic en la tarjeta para expandirla (mostrando las opciones de actualización/eliminación)
  card.click();
}

export const BookAside = () => {
  const container = document.createElement("aside");
  container.classList.add("book-aside");

  container.innerHTML = `<h2>Libros guardados</h2>`;
  const listContainer = document.createElement("div");
  listContainer.classList.add("saved-books-list");
  container.appendChild(listContainer);

  const refresh = async () => {
    listContainer.innerHTML = "";
    const result = await getBooks();
    console.log("Resultado de getBooks:", result);

    if (result.error) {
      listContainer.innerHTML = `<p>Error: ${result.error}</p>`;
      return;
    }

    let savedBooks;
    if (Array.isArray(result)) {
      savedBooks = result;
    } else if (result.books && Array.isArray(result.books)) {
      savedBooks = result.books;
    } else if (result.data && Array.isArray(result.data)) {
      savedBooks = result.data;
    } else {
      savedBooks = [];
    }

    if (savedBooks.length === 0) {
      listContainer.innerHTML = `<p>No hay libros guardados.</p>`;
      return;
    }

    savedBooks.forEach((book) => {
      const item = document.createElement("div");
      item.classList.add("saved-book-item");
      item.textContent = book.title;
      // Al hacer clic, se "selecciona" (se expande) la tarjeta correspondiente
      item.addEventListener("click", () => expandSavedBook(book));
      listContainer.appendChild(item);
    });
  };

  // Se refresca la lista al crear el componente.
  refresh();

  return { container, refresh };
};
