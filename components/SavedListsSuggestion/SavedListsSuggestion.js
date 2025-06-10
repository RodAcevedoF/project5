import "./SavedListsSuggestion.css";
import { CardBtn } from "..";
import { getState } from "../../utils/state";

const SavedListsSuggestions = (keyword, toggleButton) => {
  //document.querySelector(`${keyword}-grid`).classList.add("height");
  const div = document.createElement("div");
  div.classList.add("saved-lists-suggestions");
  div.innerHTML = `<p>No elements found</p>
                   <p>You haven't saved any ${keyword}s yet</p>
                   <h3>Try searching some ${keyword}s:</h3>`;
  const searchGoTo = CardBtn(
    `Search ${keyword}s`,
    `search-${keyword}`,
    "/icon/btn_arrow.png"
  );
  div.appendChild(searchGoTo);

  div
    .querySelector(`.search-${keyword}-button`)
    .addEventListener("click", () => {
      if (getState("currentToggle") === "saved") toggleButton.click();
    });
  return div;
};

export default SavedListsSuggestions;
