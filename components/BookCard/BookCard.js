import "./BookCard.css";
import { createBook } from "../../api/bookApi.js";
import CardBtn from "../CardBtn/index.js";
import { updateCategorySelect } from "../../utils/updateBookCount.js";
import { observeNewCards } from "../../utils/cardOberserver.js";

export const BookCard = (book) => {
  const card = document.createElement("div");
  card.classList.add("book-card", "appear");

  card.innerHTML = `
    <div class="card-summary">
      <img src="${book.cover_image || "default-cover.png"}" alt="${
    book.title
  } Cover Image">
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
            let value = book[key];
            if (
              key === "pages" &&
              (value === null || value === undefined || value === 0)
            ) {
              value = "Unknown"; // Mostrar 'Unknown' si no hay páginas
            }
            return value ? `<p><strong>${label}:</strong> ${value}</p>` : "";
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

  // Botones: solo Save y Close
  const saveButton = CardBtn("Save", "save", "/icon/add.png");
  const collapseButton = CardBtn("Close", "collapse", "/icon/close.png");

  detailsBtnDiv.appendChild(saveButton);
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

  saveButton.addEventListener("click", async () => {
    const result = await createBook({
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
    });

    if (result.error) {
      alert(`Error: ${result.error}`);
      return;
    }

    alert("Book saved successfully!");
    await updateCategorySelect();

    document.dispatchEvent(new CustomEvent("bookSaved", { detail: result }));
  });
  observeNewCards("book");
  return card;
};
