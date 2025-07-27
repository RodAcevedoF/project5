import "./VideoGrid.css";
import {
  LoadComp,
  LoadMoreBtn,
  SavedVideoList,
  SavedVideosBar,
  ToggleBtn,
  VideoSuggestions,
  VideoCard,
  SearchBarVids,
  VidListElement,
  SavedListsSuggestions
} from "../../../components";
import { searchVideo, getVideos } from "../../../api";
import {
  setState,
  getState,
  updateVideoCount,
  getChannels,
  updateChannelSelect
} from "../../../utils";

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

  const savedVideosBar = SavedVideosBar(getChannels());
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
  const maxResults = 12;
  let totalResults = 0;

  const showLoading = (comp) => {
    comp.innerHTML = LoadComp();
  };

  const updateResults = (comp, result, isNewSearch = false) => {
    if (isNewSearch) {
      comp.innerHTML = "";
    }

    const toggleState = getState("currentToggle");
    const loadBtn = document.querySelector(".load-more-button");

    if (!Array.isArray(result?.videos) || result.videos.length === 0) {
      comp.innerHTML = "";
      loadBtn.style.display = "none";
      if (toggleState === "search") {
        comp.appendChild(VideoSuggestions(searchVideos, toggleButton));
      } else if (toggleState === "saved") {
        comp.appendChild(SavedListsSuggestions("video", toggleButton));
      }
      return;
    }

    result.videos.forEach((video) => {
      const vidId = video.id || video.video_id;
      if (comp.querySelector(`[data-video-id="${vidId}"]`)) return;
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
      grid.innerHTML = "";
      grid.appendChild(VideoSuggestions(searchVideos, toggleButton));
      return;
    }

    if (isNewSearch) {
      nextPageToken = "";
      showLoading(grid);
    }

    try {
      const result = await searchVideo(
        searchParams.query,
        nextPageToken,
        searchParams.videoDuration || "medium",
        searchParams.order || "relevance"
      );

      nextPageToken = result.nextPageToken || "";

      updateResults(grid, result, isNewSearch);
    } catch (error) {
      console.error("Error during video search:", error);
      grid.innerHTML = "<p>Error fetching videos.</p>";
    }
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

      updateVideoCount();
      updateChannelSelect();
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
      getDefaultQuery();
    }
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

  toggleButton.addEventListener("click", handleToggle);
  loadMoreButton.addEventListener("click", () => searchVideos(false));
  window.addEventListener("videoDeleted", handleVideoDeleted);

  toggleSect.appendChild(toggleButton);
  menuSect.appendChild(searchBarElement);
  container.appendChild(toggleSect);
  container.appendChild(menuSect);
  container.appendChild(grid);
  savedSect.appendChild(List);
  container.appendChild(savedSect);
  container.appendChild(loadMoreButton);

  savedSect.style.display = "none";

  const getDefaultQuery = async () => {
    const cachedState = getState("defaultSearchResults");
    const cachedLocal = localStorage.getItem("defaultVideos");
    const cachedDefault =
      cachedState || (cachedLocal && JSON.parse(cachedLocal));

    if (cachedDefault && Array.isArray(cachedDefault.videos)) {
      updateResults(grid, cachedDefault, true);
      return;
    }

    searchParams.query = "youtube";
    showLoading(grid);
    const result = await searchVideo(
      searchParams.query,
      "",
      searchParams.videoDuration || "medium",
      searchParams.order || "relevance"
    );

    setState("defaultSearchResults", result);
    localStorage.setItem("defaultVideos", JSON.stringify(result));
    updateResults(grid, result, true);
  };

  getDefaultQuery();

  return { container, updateResults, showLoading };
};
