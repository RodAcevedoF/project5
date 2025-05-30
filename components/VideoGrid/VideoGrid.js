import "./VideoGrid.css";
import { VideoCard } from "../VideoCard/VideoCard.js";
import { SearchBarVids } from "../SearchBarVids/SearchBarVids.js";
import SavedVidsBar from "../SavedVidBar/SavedVidsBar.js";
import { searchVideo } from "../../api/searchVideos.js";
import { getVideos } from "../../api/videoApi.js";
import ToggleBtn from "../ToggleBtn/ToggleBtn.js";
import LoadComp from "../LoadComp/LoadComp.js";
import { randomVidQueries } from "../../data/options.js";
import VideoSuggestions from "../VideoSuggestions/VideoSuggestions.js";
import { setState, getState } from "../../utils/state.js";
import { updateVideoCount } from "../../utils/updateVideoCount.js";
import VidListElement from "../VidListElement/VidListElement.js";
import SavedVideoList from "../SavedVideoList/SavedVideoList.js";
import {
  getChannels,
  updateChannelSelect
} from "../../utils/updateVideoCount.js";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.js";

export const VideoGrid = () => {
  const container = document.createElement("article");
  container.classList.add("video-article");

  const menuSect = document.createElement("section");
  menuSect.classList.add("menu-section");

  const grid = document.createElement("section");
  grid.classList.add("video-grid");

  const toggleSect = document.createElement("section");
  toggleSect.classList.add("toggle-section");

  const savedSect = document.createElement("section");
  savedSect.classList.add("saved-section");

  const savedVideosBar = SavedVidsBar(getChannels());
  menuSect.appendChild(savedVideosBar);

  const List = SavedVideoList();
  const toggleButton = ToggleBtn("TO SAVED VIDEOS", "TO SEARCH VIDEOS");
  const loadMoreButton = LoadMoreBtn("loadMore");

  let showingSavedVideos = false;
  let searchParams = {
    query: "",
    videoDuration: "",
    order: ""
  };
  let nextPageToken = "";
  const maxResults = 10;
  let totalResults = 0;

  const showLoading = (comp) => {
    comp.innerHTML = LoadComp();
  };

  const updateResults = (comp, result, isNewSearch = false) => {
    if (isNewSearch) {
      comp.innerHTML = "";
    }

    if (!result?.videos?.length) {
      comp.innerHTML = "";
      comp.appendChild(VideoSuggestions(searchVideos, toggleButton));
      return;
    }

    result.videos.forEach((video) => {
      if (comp.querySelector(`[data-video-id="${video.id}"]`)) return;

      const elem = comp === grid ? VideoCard(video) : VidListElement(video);
      comp.appendChild(elem);
    });

    totalResults = result.totalResults;
    nextPageToken = result.nextPageToken || "";
    loadMoreButton.style.display = nextPageToken ? "block" : "none";
  };

  const searchVideos = async (isNewSearch = false, suggestedQuery = "") => {
    if (suggestedQuery) {
      searchParams.query = suggestedQuery;
    }

    if (!searchParams.query || typeof searchParams.query !== "string") {
      grid.innerHTML = "<p>Invalid search query</p>";
      return;
    }

    if (isNewSearch) showLoading(grid);

    const result = await searchVideo(
      searchParams.query,
      nextPageToken,
      searchParams.videoDuration || "medium",
      searchParams.order || "relevance"
    );
    updateResults(grid, result, isNewSearch);
  };

  const loadSavedVideos = async () => {
    showLoading(List);
    try {
      const result = await getVideos();
      const videos = Array.isArray(result)
        ? result
        : result.videos || result.data || [];

      setState("videoCards", videos);
      updateResults(List, { videos, totalResults: videos.length }, true);

      const channels = getChannels();
      updateVideoCount();
      updateChannelSelect(getChannels);
    } catch (error) {
      console.error("Error retrieving videos:", error);
      grid.innerHTML = "<p>Error loading your saved videos</p>";
    }
  };

  const handleToggle = async () => {
    showingSavedVideos = !showingSavedVideos;

    const savedBar = document.querySelector(".saved-vids-bar");
    if (showingSavedVideos) {
      searchBarElement.style.display = "none";
      grid.style.display = "none";
      savedSect.style.display = "flex";
      if (savedBar) savedBar.style.display = "flex";
      setState("currentToggle", "saved");
      await loadSavedVideos();
    } else {
      searchBarElement.style.display = "flex";
      grid.style.display = "grid";
      savedSect.style.display = "none";
      if (savedBar) savedBar.style.display = "none";
      grid.innerHTML = "";
      searchBarElement.reset();
      setState("currentToggle", "search");
      //getRandomQuery();
    }
  };

  const getRandomQuery = () => {
    const randomIndex = Math.floor(Math.random() * randomVidQueries.length);
    searchParams.query = randomVidQueries[randomIndex];
    setState("currentToggle", "search");
    searchVideos(true);
  };

  const handleVideoDeleted = async ({ detail: { videoId } }) => {
    const videoCards = getState("videoCards") || {};
    if (videoCards[videoId]) {
      delete videoCards[videoId];
      setState("videoCards", videoCards);
    }

    updateVideoCount();

    try {
      const newChannels = getChannels();
      const oldBar = document.querySelector(".saved-vids-bar");
      if (oldBar) {
        const newBar = SavedVideosBar(newChannels);
        oldBar.replaceWith(newBar);
      }
    } catch (error) {
      console.error("Error updating filter bar:", error);
    }
  };

  const searchBarElement = SearchBarVids((params) => {
    if (!params || !params.query || params.query.trim() === "") {
      console.error("Invalid search params:", params);
      return;
    }
    searchParams = { ...params };
    nextPageToken = "";
    searchVideos(true);
  });
  searchBarElement.style.display = "flex";

  // Event listeners
  toggleButton.addEventListener("click", handleToggle);
  loadMoreButton.addEventListener("click", () => searchVideos(false));
  window.addEventListener("videoDeleted", handleVideoDeleted);

  // Mount structure
  toggleSect.appendChild(toggleButton);
  menuSect.appendChild(searchBarElement);
  container.appendChild(toggleSect);
  container.appendChild(menuSect);
  container.appendChild(grid);
  savedSect.appendChild(List);
  container.appendChild(savedSect);
  container.appendChild(loadMoreButton);

  // Init state
  savedSect.style.display = "none";
  loadMoreButton.style.display = "none";

  return { container, updateResults, showLoading };
};
