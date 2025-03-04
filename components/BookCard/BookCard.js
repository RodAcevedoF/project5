import { createBook, updateBook, deleteBook } from "../../api/bookApi.js";
import { getState, setState } from "../../utils/state.js";

export const BookCard = (book) => {
  const card = document.createElement("div");
  card.classList.add("book-card");

  const isSaved = !!book.id;
  if (isSaved) {
    card.dataset.bookId = book.id;
    const bookCards = getState("bookCards") || {};
    bookCards[book.id] = card;
    setState("bookCards", bookCards);
  }

  card.innerHTML = `
    <div class="card-summary">
      <img src="${book.cover_image || "default-cover.png"}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p><strong>Autor:</strong> ${book.author}</p>
      <button class="expand-button">Ver detalles</button>
    </div>
    <div class="card-details" style="display: none;">
      ${["Editorial", "Fecha de publicación", "Descripción"]
        .map((label, i) => {
          const key = ["publisher", "publishedDate", "description"][i];
          return book[key] ? `<p><strong>${label}:</strong> ${book[key]}</p>` : "";
        })
        .join("")}
      <textarea class="notes-input" placeholder="Agrega tus notas...">${book.notes || ""}</textarea>
      <div class="details-buttons">
        ${
          isSaved
            ? `<button class="update-button">Actualizar</button>
               <button class="delete-button">Eliminar</button>`
            : `<button class="save-button">Guardar</button>`
        }
        <button class="collapse-button">✖</button>
      </div>
    </div>
  `;

  const detailsDiv = card.querySelector(".card-details");
  const notesInput = card.querySelector(".notes-input");
  const collapseButton = card.querySelector(".collapse-button");
  let saveButton = card.querySelector(".save-button");
  let updateButton = card.querySelector(".update-button");
  let deleteButton = card.querySelector(".delete-button");

  const toggleCard = () => {
    const expanded = card.classList.toggle("expanded");
    detailsDiv.style.display = expanded ? "block" : "none";
  };

  card.addEventListener("click", (e) => {
    if (![collapseButton, saveButton, updateButton, deleteButton, notesInput].includes(e.target)) {
      toggleCard();
    }
  });
  collapseButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCard();
  });
  document.addEventListener("click", (e) => {
    if (card.classList.contains("expanded") && !card.contains(e.target)) {
      toggleCard();
    }
  });

  const handleBookAction = async (action, data = {}) => {
    if (action === "delete" && !confirm("¿Eliminar este libro?")) return;
    const apiCall = { save: createBook, update: updateBook, delete: deleteBook }[action];
    const result = await apiCall(book.id || data, data);
    if (result.error) return alert(`Error: ${result.error}`);

    alert(`¡Libro ${
      action === "save" ? "guardado" : action === "update" ? "actualizado" : "eliminado"
    } correctamente!`);
    document.dispatchEvent(new CustomEvent("bookSaved"));
    toggleCard();

    if (action === "save" && result.id) {
      book.id = result.id;
      book.notes = notesInput.value;
      card.dataset.bookId = result.id;
      saveButton.remove();
      card.querySelector(".details-buttons").insertAdjacentHTML("afterbegin", `
        <button class="update-button">Actualizar</button>
        <button class="delete-button">Eliminar</button>
      `);
      updateButton = card.querySelector(".update-button");
      deleteButton = card.querySelector(".delete-button");
      updateButton.addEventListener("click", () =>
        handleBookAction("update", { notes: notesInput.value })
      );
      deleteButton.addEventListener("click", () => handleBookAction("delete"));
      setState("bookCards", { ...getState("bookCards"), [book.id]: card });
    }
  };

  if (!isSaved && saveButton) {
    saveButton.addEventListener("click", () =>
      handleBookAction("save", {
        title: book.title,
        author: book.author,
        cover_image: book.cover_image,
        notes: notesInput.value,
        apiId: book.apiId,
        publisher: book.publisher,
        publishedDate: book.publishedDate,
        description: book.description
      })
    );
  }
  if (isSaved && updateButton) {
    updateButton.addEventListener("click", () =>
      handleBookAction("update", { notes: notesInput.value })
    );
  }
  if (isSaved && deleteButton) {
    deleteButton.addEventListener("click", () => handleBookAction("delete"));
  }

  return card;
};
