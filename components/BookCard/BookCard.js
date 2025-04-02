import { createBook, updateBook, deleteBook } from "../../api/bookApi.js";
import "./BookCard.css";
import CardBtn from "../CardBtn/CardBtn.js";

export const BookCard = (book) => {
  const card = document.createElement("div");
  card.classList.add("book-card");
  const isSaved = !!book.id;

  if (isSaved) {
    card.dataset.bookId = book.id;
  }

  card.innerHTML = `
    <div class="card-summary">
      <img src="${book.cover_image || "default-cover.png"}" alt="${book.title}">
      <div class="bookcard-title">
        <p class="label">Title</p>
        <h3>${book.title}</h3>
        <p class="label">Author</p> 
        <p class="author">${book.author}</p>
        <p class="label">ISBN</p>
        <p class="isbn">${book.isbn}</p>
      </div>
    </div>
    <div class="card-details">
      <div class="extra-details">
        ${["Publisher", "Release", "Pages"]
          .map((label, i) => {
            const key = ["publisher", "publish_date", "pages"][i];
            return book[key]
              ? `<p><strong>${label}:</strong> ${book[key]}</p>`
              : "";
          })
          .join("")}
        ${
          book.categories && book.categories.length > 0
            ? `<p><strong>Categories:</strong> ${book.categories
                .map((category) =>
                  typeof category === "object" ? category.name : category
                )
                .join(", ")}</p>`
            : ""
        }
      </div>  
      <p class="card-description">${book.description}</p>
      <div class="card-actions">
         <textarea class="notes-input" placeholder="Add some notes...">${
           book.notes || ""
         }</textarea>
         <div class="details-button"></div>
      </div>
    </div>
  `;

  const summaryDiv = card.querySelector(".card-summary");
  const detailsDiv = card.querySelector(".card-details");
  const notesInput = card.querySelector(".notes-input");
  const detailsBtnDiv = card.querySelector(".details-button");

  // Crear botones dinámicamente
  const saveButton = CardBtn("Save", "save", "/icon/add.png");
  const updateButton = CardBtn("Update", "update", "/icon/speed.png");
  const deleteButton = CardBtn("Delete", "delete", "/icon/bolt.png");
  const collapseButton = CardBtn("Close", "collapse", "/icon/close.png");

  // Añadir botones según el estado del libro
  if (!isSaved) {
    detailsBtnDiv.appendChild(saveButton);
  } else {
    detailsBtnDiv.appendChild(updateButton);
    detailsBtnDiv.appendChild(deleteButton);
  }
  detailsBtnDiv.appendChild(collapseButton);

  const toggleCard = () => {
    card.classList.toggle("expanded");
    detailsDiv.classList.toggle("expanded");
    summaryDiv.classList.toggle("expanded");
  };

  card.addEventListener("click", (e) => {
    if (
      !e.target.closest(".details-button") &&
      !e.target.closest(".notes-input")
    ) {
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
    const apiCall = {
      save: createBook,
      update: updateBook,
      delete: deleteBook
    }[action];
    const result = await apiCall(book.id || data, data);

    if (result.error) {
      alert(`Error: ${result.error}`);
      return;
    }

    alert(
      `¡Libro ${
        action === "save"
          ? "guardado"
          : action === "update"
          ? "actualizado"
          : "eliminado"
      } correctamente!`
    );

    if (action === "delete") {
      card.remove();
      document.dispatchEvent(
        new CustomEvent("bookDeleted", { detail: { bookId: book.id } })
      );
      return;
    }

    if (action === "save" && result.id) {
      book.id = result.id;
      book.notes = notesInput.value;
      card.dataset.bookId = result.id;
      saveButton.remove();
      detailsBtnDiv.appendChild(updateButton);
      detailsBtnDiv.appendChild(deleteButton);
    }
  };

  if (!isSaved) {
    saveButton.addEventListener("click", () =>
      handleBookAction("save", {
        title: book.title,
        author: book.author,
        cover_image: book.cover_image,
        notes: notesInput.value,
        apiId: book.apiId,
        publisher: book.publisher,
        publish_date: book.publish_date,
        description: book.description,
        isbn: book.isbn,
        pages: book.pages,
        categories: book.categories || []
      })
    );
  }

  updateButton.addEventListener("click", () =>
    handleBookAction("update", { notes: notesInput.value })
  );

  deleteButton.addEventListener("click", () => handleBookAction("delete"));

  return card;
};
