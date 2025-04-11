import "./VideoGrid.css";
import { VideoCard } from "../VideoCard/VideoCard.js";
import { SearchBarVids } from "../SearchBarVids/SearchBarVids.js";
import SavedVideosBar from "../SavedVidBar/SavedVidsBar.js";
import { searchVideo } from "../../api/searchVideos.js";
import { getVideos } from "../../api/videoApi";
import ToggleBtn from "../ToggleBtn/ToggleBtn.js";
import LoadComp from "../LoadComp/LoadComp.js";
import { randomVidQueries } from "../../data/options.js";
import VideoSuggestions from "../VideoSuggestions/VideoSuggestions.js";
import { setState } from "../../utils/state.js";
import { updateVideoCount } from "../../utils/updateVideoCount.js";
import {
  getChannels,
  updateChannelSelect
} from "../../utils/updateVideoCount.js";

export const VideoGrid = () => {
  const container = document.createElement("article");
  container.classList.add("video-article");

  const grid = document.createElement("div");
  grid.classList.add("video-grid");

  const toggleButton = ToggleBtn("Saved videos", "Search videos");

  const loadMoreButton = document.createElement("button");
  loadMoreButton.innerText = "Load more";
  loadMoreButton.classList.add("load-more-vids-button");
  loadMoreButton.style.display = "none";

  const savedVidsBar = SavedVideosBar();
  let showingSavedVideos = false;
  let searchParams = {
    query: "",
    videoDuration: "",
    order: ""
  };
  let nextPageToken = "";
  const maxResults = 10;
  let totalResults = 0;

  const getRandomQuery = () =>
    randomVidQueries[Math.floor(Math.random() * randomVidQueries.length)];

  const updateResults = (result, isNewSearch = false) => {
    if (isNewSearch) {
      grid.innerHTML = "";
      nextPageToken = result.nextPageToken || "";
    }
    if (!result || !Array.isArray(result.videos)) {
      grid.innerHTML = "<p>Error: Invalid Data</p>";
      return;
    }
    if (result.videos.length === 0 && isNewSearch) {
      grid.innerHTML = "";
      const suggestions = VideoSuggestions(searchVideos, toggleButton);
      grid.appendChild(suggestions);
      return;
    }
    result.videos.forEach((video) => {
      const card = VideoCard(video);
      grid.appendChild(card);
    });
    totalResults = result.totalResults;
    nextPageToken = result.nextPageToken || "";
    loadMoreButton.style.display = nextPageToken ? "block" : "none";
  };

  const searchVideos = async (isNewSearch = false, suggestedQuery = "") => {
    // Usar el término sugerido si existe
    if (suggestedQuery) {
      searchParams.query = suggestedQuery;
    }

    if (!searchParams.query || typeof searchParams.query !== "string") {
      console.error("Error: invalid query", searchParams.query);
      return;
    }

    if (isNewSearch) showLoading();
    const result = await searchVideo(
      searchParams.query,
      nextPageToken,
      searchParams.videoDuration || "medium",
      searchParams.order || "relevance"
    );
    updateResults(result, isNewSearch);
  };

  const loadSavedVideos = async () => {
    grid.innerHTML = LoadComp();
    try {
      const result = await getVideos();
      let videos = Array.isArray(result)
        ? result
        : result.videos && Array.isArray(result.videos)
        ? result.videos
        : result.data && Array.isArray(result.data)
        ? result.data
        : [];
      updateResults(
        { videos, nextPageToken: "", totalResults: videos.length },
        true
      );
      setState("videoCards", videos);
      updateVideoCount();
      updateChannelSelect(getChannels);
    } catch (error) {
      console.error("Error loading saved videos:", error);
      updateResults({ videos: [], nextPageToken: "", totalResults: 0 }, true);
    }
  };

  toggleButton.addEventListener("click", async () => {
    showingSavedVideos = !showingSavedVideos;
    if (showingSavedVideos) {
      await loadSavedVideos();
      searchBarElement.style.display = "none";
      loadMoreButton.style.display = "none";
      savedVidsBar.style.display = "flex";
      setState("currentToggle", "saved");
    } else {
      searchBarElement.style.display = "flex";
      grid.innerHTML = "";
      loadMoreButton.style.display = "none";
      savedVidsBar.style.display = "none";
      setState("currentToggle", "search");
    }
  });

  loadMoreButton.addEventListener("click", () => {
    searchVideos(false);
  });

  const searchBarElement = SearchBarVids((params) => {
    if (
      !params ||
      typeof params !== "object" ||
      !params.query ||
      params.query.trim() === ""
    ) {
      console.error("Error: invalid search parameters", params);
      return;
    }
    searchParams = { ...params };
    nextPageToken = "";
    searchVideos(true);
  });
  searchBarElement.style.display = "flex";
  const toggleSect = document.createElement("section");
  toggleSect.classList.add("toggle-sect");
  toggleSect.appendChild(toggleButton);
  container.appendChild(toggleSect);

  const menuSect = document.createElement("section");
  menuSect.classList.add("menu-sect");
  menuSect.appendChild(searchBarElement);
  menuSect.appendChild(savedVidsBar);
  container.appendChild(menuSect);

  container.appendChild(grid);
  container.appendChild(loadMoreButton);

  const showLoading = () => {
    grid.innerHTML = LoadComp();
  };

  return { container, updateResults, showLoading };
};
