import "./VideoGrid.css";
import { VideoCard } from "../VideoCard/VideoCard.js";
import { SearchBarVids } from "../SearchBarVids/SearchBarVids.js";
import { searchVideo } from "../../api/searchVideos.js";
import { getVideos } from "../../api/videoApi";
import ToggleBtn from "../ToggleBtn/ToggleBtn.js";
import LoadComp from "../LoadComp/LoadComp.js";
import { randomVidQueries } from "../../data/options.js";

export const VideoGrid = () => {
  const container = document.createElement("article");
  container.classList.add("video-article");

  const grid = document.createElement("div");
  grid.classList.add("video-grid");

  const toggleButton = ToggleBtn("Saved books", "Search books");

  const loadMoreButton = document.createElement("button");
  loadMoreButton.innerText = "Load more";
  loadMoreButton.classList.add("load-more-vids-button");
  loadMoreButton.style.display = "none";

  let showingSavedVideos = false;
  let query = "";
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
      grid.innerHTML = "<p>No Results</p>";
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

  const searchVideos = async (isNewSearch = false) => {
    if (!query || typeof query !== "string") {
      console.error("Error: invalid query", query);
      return;
    }
    if (isNewSearch) showLoading();
    const result = await searchVideo(query, nextPageToken);
    updateResults(result, isNewSearch);
  };

  const loadSavedVideos = async () => {
    grid.innerHTML = showLoading();
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
    } catch (error) {
      console.error("Error loading books:", error);
      updateResults({ videos: [], nextPageToken: "", totalResults: 0 }, true);
    }
  };

  toggleButton.addEventListener("click", () => {
    showingSavedVideos = !showingSavedVideos;
    if (showingSavedVideos) {
      searchBarElement.style.display = "none";
      loadMoreButton.style.display = "none";
      loadSavedVideos();
    } else {
      searchBarElement.style.display = "flex";
      grid.innerHTML = "";
      loadMoreButton.style.display = "none";
    }
  });

  loadMoreButton.addEventListener("click", () => {
    searchVideos(false);
  });

  const searchBarElement = SearchBarVids((searchQuery) => {
    if (!searchQuery || typeof searchQuery !== "string") {
      console.error(
        "Error: searchQuery inválida en SearchBarVids callback:",
        searchQuery
      );
      return;
    }
    query = searchQuery;
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
  container.appendChild(menuSect);

  container.appendChild(grid);
  container.appendChild(loadMoreButton);

  const showLoading = () => {
    grid.innerHTML = LoadComp();
  };

  // ✅ Iniciar con una búsqueda aleatoria
  /* query = getRandomQuery();
  searchVideos(true); */

  return { container, updateResults, showLoading };
};
