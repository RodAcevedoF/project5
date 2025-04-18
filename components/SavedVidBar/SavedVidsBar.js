import "./SavedVidsBar.css";
import {
  filterVideos,
  updateVideoCount
} from "../../utils/updateVideoCount.js";
import {
  getChannels,
  updateChannelSelect
} from "../../utils/updateVideoCount.js";
import { SearchElement } from "../SeachElement/SearchElement.js";
import MainBtn from "../MainBtn/MainBtn.js";
import { getState } from "../../utils/state.js";

// RangeSlider para la duración
const RangeSlider = () => {
  return `
      <label for="duration-range" class="length-label">
        <input type="range" id="duration-range" min="0" max="360" value="360">
        <span id="span-nest">Length<span id="duration-value">∞</span>min</span>
      </label>`;
};

const SavedVideosBar = () => {
  const containerBar = document.createElement("div");
  containerBar.classList.add("saved-vids-bar");
  containerBar.innerHTML = `
    <div class="matches-info">
      <p class="head-info">Matches</p>
      <p class="video-count">0</p>
    </div>
    ${SearchElement()}
    <select id="channel-select">
      <option value="">Select channel</option>
    </select>
    ${RangeSlider()}
    ${MainBtn("submit", "clear-button", "main-btn", "Clear")}
  `;

  const attachEvents = () => {
    const searchInput = containerBar.querySelector("#search-input");
    const channelSelect = containerBar.querySelector("#channel-select");
    const durationRange = containerBar.querySelector("#duration-range");
    const durationValue = containerBar.querySelector("#duration-value");
    const clearButton = containerBar.querySelector("#clear-button");

    const updateResults = () => {
      const query = searchInput.value.trim();
      const channel = channelSelect.value;
      let duration = parseInt(durationRange.value, 10);

      // Si es 0 o 360, no aplicar filtro (representar como Infinity)
      if (duration === 0 || duration === 360) {
        duration = Infinity;
      }

      filterVideos(query, channel, duration);
      updateVideoCount();
    };

    // Mostrar duración en el span, o ∞ si es 0 o 360
    durationRange.addEventListener("input", () => {
      const numericValue = parseInt(durationRange.value, 10);
      durationValue.textContent =
        numericValue === 0 || numericValue === 360 ? "∞" : numericValue;
      updateResults();
    });

    searchInput.addEventListener("input", updateResults);
    channelSelect.addEventListener("change", updateResults);

    clearButton.addEventListener("click", (event) => {
      event.preventDefault();
      searchInput.value = "";
      channelSelect.value = "";
      durationRange.value = "360";
      durationValue.textContent = "∞";
      updateResults();
    });

    updateChannelSelect(getChannels);
  };

  setTimeout(attachEvents, 0);

  return containerBar;
};

export default SavedVideosBar;
