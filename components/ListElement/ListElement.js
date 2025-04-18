import { updateBook, deleteBook, getBooks } from "../../api/bookApi";
import { setState } from "../../utils/state";
import {
  updateBookCount,
  updateCategorySelect
} from "../../utils/updateBookCount";
import CardBtn from "../CardBtn/CardBtn";
import SavedListBtn from "../SavedListBtn/SavedListBtn";
import "./ListElement.css";

let currentOpenCard = null;

const ListElement = (book) => {
  const li = document.createElement("li");
  li.classList.add("book-li");
  const isSaved = !!book.id;
  if (isSaved) {
    li.dataset.bookId = book.id;
  }
  const formatValue = (key, value) => {
    if (key === "pages" && (value === null || value === undefined)) {
      return "Unknown";
    }
    return value || "Unknown";
  };

  li.innerHTML = `
  <div class="savedbook-header">
    <div class="savedbook-title">
      <p class="saved-label">Title</p>
      <h3>${book.title}</h3>
    </div>
  </div>
  <div class="book-li-summary collapsibles">
      <img src="${book.cover_image || "/images/defaultCover.png"}" alt="${
    book.title
  } over">
   <div class="inner-summary">
      <div class="savedbook-info">
        <p class="saved-inner-label">Author</p> 
        <p class="saved-author">${book.author}</p>
        <p class="saved-inner-label">ISBN</p>
        <p class="saved-isbn">${book.isbn}</p>
      </div>
      <div class="savedcard-details">
    ${["Publisher", "Release", "Pages"]
      .map((label, i) => {
        const key = ["publisher", "publish_date", "pages"][i];
        const value = formatValue(key, book[key]);
        return `<p><strong>${label}:</strong> ${value}</p>`;
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
    </div>
  </div>
    <div class="input-saved-div collapsibles">
      <textarea class="saved-notes-input">${book.notes || ""}</textarea>
      <div class="li-button-group"></div>
    </div>
  `;

  const notesInput = li.querySelector(".notes-input");
  const buttonGroup = li.querySelector(".li-button-group");
  const headerClick = li.querySelector(".savedbook-header");
  const updateButton = CardBtn("Update", "update", "/icon/speed.png");
  const closeButton = CardBtn("Close", "close", "/icon/close.png");

  buttonGroup.appendChild(updateButton);
  buttonGroup.appendChild(closeButton); // fuera de la función ListElement

  headerClick.addEventListener("click", (e) => {
    e.stopPropagation(); // evitamos que dispare el document.click
    if (currentOpenCard && currentOpenCard !== li) {
      currentOpenCard
        .querySelectorAll(".collapsibles")
        .forEach((elem) => elem.classList.remove("visible"));
    }
    const isAlreadyOpen = li.classList.contains("open");

    li.classList.toggle("open");
    li.querySelectorAll(".collapsibles").forEach((elem) =>
      elem.classList.toggle("visible", !isAlreadyOpen)
    );
    currentOpenCard = !isAlreadyOpen ? li : null;
  });

  document.addEventListener("click", (e) => {
    if (currentOpenCard && !currentOpenCard.contains(e.target)) {
      currentOpenCard
        .querySelectorAll(".collapsibles")
        .forEach((elem) => elem.classList.remove("visible"));
      currentOpenCard.classList.remove("open");
      currentOpenCard = null;
    }
  });

  const listButtons = SavedListBtn(
    "read",
    "read-book-btn",
    "Delete",
    "delete-book-btn"
  );
  headerClick.appendChild(listButtons);

  updateButton.addEventListener("click", async () => {
    const result = await updateBook(book.id, { notes: notesInput.value });
    if (result.error) {
      alert("Error al actualizar el libro.");
      return;
    }
    alert("¡Notas actualizadas!");
  });
  closeButton.addEventListener("click", () => {
    document
      .querySelectorAll(".collapsibles")
      .forEach((elem) => elem.classList.remove("visible"));
  });
  const deleteButton = li.querySelector("#delete-book-btn");
  deleteButton.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (!confirm("¿Eliminar este libro?")) return;
    const result = await deleteBook(book.id);
    if (result.error) {
      alert("Error al eliminar el libro.");
      return;
    }
    li.remove();
    document.dispatchEvent(
      new CustomEvent("bookDeleted", { detail: { bookId: book.id } })
    );
    const updatedBooks = await getBooks();
    setState("bookCards", updatedBooks);
    updateBookCount();
    updateCategorySelect();
  });

  return li;
};

export default ListElement;
