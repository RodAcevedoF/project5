import { getState } from "../../utils";
import "./SuggestionBtn.css";

const SuggestionBtn = (callback, arr) => {
  const btn = document.createElement("button");
  btn.classList.add("suggestion-btn");

  const randomIndex = Math.floor(Math.random() * arr.length);
  const query =
    typeof arr[randomIndex] === "string"
      ? arr[randomIndex]
      : arr[randomIndex]?.query;

  if (!query || typeof query !== "string") {
    console.error("Invalid suggestion:", arr[randomIndex]);
    btn.innerHTML = `<span>Invalid</span>`;
    return btn;
  }

  btn.innerHTML = `<span>${query}</span>`;
  btn.addEventListener("click", () => {
    callback(query);
    const page = getState("currentPage");
    if (page === "books") {
      document.querySelector(".book-grid").classList.remove("height");
    } else {
      document.querySelector(".video-grid").classList.remove("height");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return btn;
};

export default SuggestionBtn;
