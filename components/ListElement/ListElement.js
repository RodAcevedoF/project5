import "./ListElement.css";
import { updateBook, deleteBook, getBooks } from "../../api/bookApi";
import { setState } from "../../utils/state";
import {
  updateBookCount,
  updateCategorySelect
} from "../../utils/updateBookCount";
import { CardBtn, SavedListBtn } from "..";
import {
  showSuccess,
  showError,
  showConfirm
} from "../../utils/swalHandler.js";

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
        <div class="savedbook-label-div">
          <p class="saved-label">Title</p>
          <div class="checked-book-div">
            <p class="checked-info">Read</p>
            <img src="/icon/checked.png" alt="check icon" class="checked-icon"/>
          </div>
        </div>
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
      <p class="savedbook-notes"><strong>Notes:</strong> ${
        book.notes || "No content yet"
      }</p>
      <textarea class="book-notes-input" placeholder="Add some notes!">${
        book.notes || ""
      }</textarea>
      <div class="li-button-group"></div>
    </div>
  `;

  const notesInput = li.querySelector(".notes-input");
  const buttonGroup = li.querySelector(".li-button-group");
  const headerClick = li.querySelector(".savedbook-header");
  const updateButton = CardBtn("Update", "update", "/icon/editicon.png");
  const closeButton = CardBtn("Close", "close", "/icon/close.png");
  const notesDisplay = li.querySelector(".savedbook-notes");
  const notesTextarea = li.querySelector(".book-notes-input");
  const checkedInfo = li.querySelector(".checked-book-div");
  if (book.checked) checkedInfo.classList.add("visible");

  buttonGroup.appendChild(updateButton);
  buttonGroup.appendChild(closeButton);

  headerClick.addEventListener("click", (e) => {
    e.stopPropagation();
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

  notesTextarea.style.display = "none";

  notesDisplay.addEventListener("click", (e) => {
    e.stopPropagation();
    notesDisplay.style.display = "none";
    notesTextarea.style.display = "block";
    notesTextarea.focus();
  });

  document.addEventListener("click", (e) => {
    if (
      !notesTextarea.contains(e.target) &&
      notesTextarea.style.display === "block"
    ) {
      notesTextarea.style.display = "none";
      notesDisplay.style.display = "block";
    }
  });

  updateButton.addEventListener("click", async () => {
    const result = await updateBook(book.id, { notes: notesInput.value });
    if (result.error) {
      await showError("Error updating book");
      return;
    }
    await showSuccess("Updated notes!");
  });

  closeButton.addEventListener("click", () => {
    document
      .querySelectorAll(".collapsibles")
      .forEach((elem) => elem.classList.remove("visible"));
    notesTextarea.style.display = "none";
    notesDisplay.style.display = "block";
  });

  const deleteButton = li.querySelector("#delete-book-btn");
  deleteButton.addEventListener("click", async (e) => {
    e.stopPropagation();

    const confirmation = await showConfirm({
      title: "Delete",
      text: "Are you sure to delete this book?"
    });

    if (!confirmation) return;

    const result = await deleteBook(book.id);
    if (result.error) {
      await showError("Error deleting book");
      return;
    }

    await showSuccess("Deleted book!");
    li.remove();
    document.dispatchEvent(
      new CustomEvent("bookDeleted", { detail: { bookId: book.id } })
    );
    const updatedBooks = await getBooks();
    setState("bookCards", updatedBooks);
    updateBookCount();
    updateCategorySelect();
  });

  const readButton = li.querySelector("#read-book-btn");
  readButton.addEventListener("click", async (ev) => {
    ev.stopPropagation();
    const result = await updateBook(book.id, { checked: !book.checked });
    if (result.error) {
      await showError("Error updating book");
      return;
    }
    checkedInfo.classList.toggle("visible");
  });

  return li;
};

export default ListElement;
