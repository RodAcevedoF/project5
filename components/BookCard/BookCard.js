// components/BookCard/BookCard.js
import { createBook, updateBook, deleteBook } from "../../api/bookAPI.js";
import { getState, setState } from "../../utils/state.js"; // Ajusta la ruta a donde tengas definido appState

export const BookCard = (book) => {
  const card = document.createElement("div");
  card.classList.add("book-card");

  // Determinamos si el libro ya está guardado (por ejemplo, si tiene una propiedad "id")
  const isSaved = !!book.id;

  // Si el libro está guardado, asignamos un atributo para identificarlo en el DOM
  if (isSaved) {
    card.dataset.bookId = book.id;
    // Almacenamos la tarjeta en el mapa global (appState.bookCards)
    const bookCards = getState("bookCards") || {};
    bookCards[book.id] = card;
    setState("bookCards", bookCards);
  }

  // Renderizamos la tarjeta: la sección "card-summary" muestra siempre la portada, título, autor y un botón para expandir.
  // La sección "card-details" muestra más información y, según si el libro está guardado o no,
  // se renderizan botones de "Guardar libro" o de "Actualizar" y "Eliminar".
  card.innerHTML = `
    <div class="card-summary">
      <img src="${book.cover_image || 'default-cover.png'}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p><strong>Autor:</strong> ${book.author}</p>
      <button class="expand-button">Ver detalles</button>
    </div>
    <div class="card-details" style="display: none;">
      ${book.publisher ? `<p><strong>Editorial:</strong> ${book.publisher}</p>` : ""}
      ${book.publishedDate ? `<p><strong>Fecha de publicación:</strong> ${book.publishedDate}</p>` : ""}
      ${book.description ? `<p><strong>Descripción:</strong> ${book.description}</p>` : ""}
      <textarea class="notes-input" placeholder="Agrega tus notas...">${book.notes || ''}</textarea>
      <div class="details-buttons">
        ${
          isSaved
            ? `<button class="update-button">Actualizar libro</button>
               <button class="delete-button">Eliminar libro</button>`
            : `<button class="save-button">Guardar libro</button>`
        }
        <button class="collapse-button">✖</button>
      </div>
    </div>
  `;

  // Referencias a elementos internos
  const cardSummary = card.querySelector(".card-summary");
  const detailsDiv = card.querySelector(".card-details");
  const expandButton = card.querySelector(".expand-button");
  const notesInput = card.querySelector(".notes-input");
  let saveButton = card.querySelector(".save-button");
  let updateButton = card.querySelector(".update-button");
  let deleteButton = card.querySelector(".delete-button");
  const collapseButton = card.querySelector(".collapse-button");

  // Funciones para expandir y colapsar la tarjeta
  const expandCard = (e) => {
    e.stopPropagation();
    // Cerrar otras tarjetas expandidas
    document.querySelectorAll(".book-card.expanded").forEach(c => {
      if (c !== card) c.classList.remove("expanded");
    });
    card.classList.add("expanded");
    detailsDiv.style.display = "block";
  };

  const collapseCard = () => {
    card.classList.remove("expanded");
    detailsDiv.style.display = "none";
  };

  // Expande la tarjeta al hacer clic en la tarjeta o en el botón "Ver detalles"
  card.addEventListener("click", (e) => {
    // Evitamos que clics en botones internos (guardar, actualizar, eliminar o colapsar) disparen el expand
    if (e.target === collapseButton ||
        (saveButton && e.target === saveButton) ||
        (updateButton && (e.target === updateButton || e.target === deleteButton))) {
      return;
    }
    if (!card.classList.contains("expanded")) {
      expandCard(e);
    }
  });

  expandButton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!card.classList.contains("expanded")) {
      expandCard(e);
    }
  });

  // Evitamos que clics en la sección de detalles propaguen el evento
  detailsDiv.addEventListener("click", (e) => e.stopPropagation());

  // --- Funcionalidad según si el libro está guardado o no ---

  // Si el libro NO está guardado: botón para guardar
  if (!isSaved && saveButton) {
    saveButton.addEventListener("click", async (e) => {
      e.stopPropagation();
      const notes = notesInput.value;
      const bookData = {
        title: book.title,
        author: book.author,
        cover_image: book.cover_image,
        notes,
        apiId: book.apiId,
        publisher: book.publisher,
        publishedDate: book.publishedDate,
        description: book.description
      };
      const result = await createBook(bookData);
      if (result.error) {
        alert("Error guardando libro: " + result.error);
      } else {
        alert("¡Libro guardado correctamente!");
        // Se espera que la respuesta incluya el id del libro guardado
        if (result.id) {
          book.id = result.id;
          card.dataset.bookId = result.id;
          // Al guardar, reemplazamos el botón de guardar por los de actualizar y eliminar
          saveButton.remove();
          const detailsButtons = card.querySelector(".details-buttons");
          detailsButtons.insertAdjacentHTML("afterbegin", `
            <button class="update-button">Actualizar libro</button>
            <button class="delete-button">Eliminar libro</button>
          `);
          updateButton = card.querySelector(".update-button");
          deleteButton = card.querySelector(".delete-button");
          updateButton.addEventListener("click", updateHandler);
          deleteButton.addEventListener("click", deleteHandler);
          // También guardamos la tarjeta en el mapa global
          const bookCards = getState("bookCards") || {};
          bookCards[book.id] = card;
          setState("bookCards", bookCards);
        }
        document.dispatchEvent(new CustomEvent("bookSaved"));
        collapseCard();
      }
    });
  }

  // Handler para actualizar (modo guardado)
  const updateHandler = async (e) => {
    e.stopPropagation();
    const updatedNotes = notesInput.value;
    const updateData = { notes: updatedNotes };
    const result = await updateBook(book.id, updateData);
    if (result.error) {
      alert("Error actualizando libro: " + result.error);
    } else {
      alert("¡Libro actualizado correctamente!");
      document.dispatchEvent(new CustomEvent("bookSaved"));
      collapseCard();
    }
  };

  if (isSaved && updateButton) {
    updateButton.addEventListener("click", updateHandler);
  }

  // Handler para eliminar (modo guardado)
  const deleteHandler = async (e) => {
    e.stopPropagation();
    if (confirm("¿Estás seguro que deseas eliminar este libro?")) {
      const result = await deleteBook(book.id);
      if (result.error) {
        alert("Error eliminando libro: " + result.error);
      } else {
        alert("¡Libro eliminado correctamente!");
        document.dispatchEvent(new CustomEvent("bookSaved"));
        collapseCard();
      }
    }
  };

  if (isSaved && deleteButton) {
    deleteButton.addEventListener("click", deleteHandler);
  }

  // Botón para colapsar la tarjeta
  collapseButton.addEventListener("click", (e) => {
    e.stopPropagation();
    collapseCard();
  });

  // Listener global: si se hace clic fuera de la tarjeta expandida, se colapsa.
  document.addEventListener("click", (e) => {
    if (card.classList.contains("expanded") && !card.contains(e.target)) {
      collapseCard();
    }
  });

  return card;
};
