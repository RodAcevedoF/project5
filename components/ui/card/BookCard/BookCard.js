import "./BookCard.css";
import { createBook } from "../../../../api/bookApi.js";
import { animationBookCard, CardBtn } from "../../../../components";
import {
  updateCategorySelect,
  showError,
  showSuccess
} from "../../../../utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const BookCard = (book) => {
  const card = document.createElement("div");
  card.classList.add("book-card");

  card.innerHTML = `
    <div class="bookcard-header">
      <p>${
        book.categories[0] === undefined
          ? "Not categorized"
          : book.categories[0]
      }</p>
      <img src="" alt="">
    </div>
    <div class="card-summary">
      <img src="${book.cover_image || "/images/defaultCover.png"}" alt="${
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
              value = "Unknown";
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
  const getValidPublishDate = (date) => {
    if (!date || typeof date !== "string") return null;

    const parsed = Date.parse(date);
    if (isNaN(parsed)) return null;

    const isoString = new Date(parsed).toISOString();
    return isoString === date ? date : null;
  };

  saveButton.addEventListener("click", async () => {
    const result = await createBook({
      title: book.title,
      author: book.author,
      cover_image: book.cover_image,
      notes: notesInput.value,
      apiId: book.apiId,
      publisher: book.publisher,
      publish_date: getValidPublishDate(book.publish_date),
      description: book.description,
      isbn: book.isbn,
      pages: book.pages,
      categories: book.categories || []
    });
    console.log(book.publish_date);
    if (result.error) {
      console.log(result);
      await showError(result.error || "Error while saving book");
      toggleCard();
      return;
    }

    await showSuccess("Your book was saved successfully!");

    await updateCategorySelect();
    document.dispatchEvent(new CustomEvent("bookSaved", { detail: result }));
    toggleCard();
  });

  requestAnimationFrame(() => {
    //    animationBookCard("book-card");
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.4,
      ease: "power2.out",
      yPercent: 0,
      scrollTrigger: {
        trigger: card,
        start: "top 95%",
        toggleActions: "play none none reverse"
      }
    });
  });

  return card;
};
