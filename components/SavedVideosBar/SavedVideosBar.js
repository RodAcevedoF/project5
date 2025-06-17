import "./SavedVideosBar.css";
import {
  filterVideos,
  updateVideoCount,
  getChannels,
  updateChannelSelect
} from "../../utils";
import { MainBtn, SearchElement } from "..";

// RangeSlider para la duración
const RangeSlider = () => {
  return `
      <label for="duration-range" class="length-label">
        <input type="range" id="duration-range" min="0" max="60" value="0">
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

      if (duration === 0 || duration === 60) {
        duration = Infinity;
      }

      filterVideos(query, channel, duration);
      updateVideoCount();
    };

    durationRange.addEventListener("input", () => {
      const numericValue = parseInt(durationRange.value, 10);
      durationValue.textContent =
        numericValue === 0 || numericValue === 60 ? "∞" : numericValue;
      updateResults();
    });

    searchInput.addEventListener("input", updateResults);
    channelSelect.addEventListener("change", updateResults);

    clearButton.addEventListener("click", (event) => {
      event.preventDefault();
      searchInput.value = "";
      channelSelect.value = "";
      durationRange.value = "0";
      durationValue.textContent = "∞";
      updateResults();
    });

    updateChannelSelect(getChannels);
  };

  setTimeout(attachEvents, 0);

  return containerBar;
};

export default SavedVideosBar;
