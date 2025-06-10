import "./VideoSuggestions.css";
import { youtubeOptions } from "../../data/options";
import { SuggestionBtn } from "..";
import { getState } from "../../utils/state";

const VideoSuggestions = (searchVideos, toggleButton) => {
  document.querySelector(".video-grid").classList.add("height");
  const div = document.createElement("div");
  div.classList.add("video-suggestions");
  div.innerHTML = `<p>No results found</p>
                   <h3>Try searching for:</h3>
                   <div class="opt-videos-div"></div>`;
  const optsVideos = div.querySelector(".opt-videos-div");
  for (let i = 0; i < 3; i++) {
    const btn = SuggestionBtn((query) => {
      if (!query || typeof query !== "string" || query.trim() === "") {
        console.error("Invalid query:", query);
        return;
      }
      console.log(`Suggestion selected: ${query}`);
      searchVideos(true, query); // Pasamos el término seleccionado al callback
      const currentToggle = getState("currentToggle");
      // Disparar toggleButton si la vista es "search"
      if (currentToggle === "saved") {
        toggleButton.click(); // Dispara el clic de toggleButton para cambiar entre vistas
      }
    }, youtubeOptions);
    optsVideos.appendChild(btn);
  }

  return div;
};

export default VideoSuggestions;
