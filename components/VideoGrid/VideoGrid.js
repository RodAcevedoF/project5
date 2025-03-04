import { VideoCard } from "../VideoCard/VideoCard.js";
import { SearchBarVids } from "../SearchBarVids/SearchBarVids.js";
import { searchVideo } from "../../api/searchVideos.js";
import { getVideos } from "../../api/videoApi";
import BackBtn from "../BackBtn/BackBtn.js";
import { Home } from "../../pages/Home/Home.js";

export const VideoGrid = () => {
  const container = document.createElement("article");
  container.classList.add("video-article");

  const grid = document.createElement("div");
  grid.classList.add("video-grid");

  const toggleButton = document.createElement("button");
  toggleButton.innerText = "Ver videos guardados";
  toggleButton.classList.add("toggle-button");

  const loadMoreButton = document.createElement("button");
  loadMoreButton.innerText = "Cargar más";
  loadMoreButton.classList.add("load-more-button");
  loadMoreButton.style.display = "none";

  let showingSavedVideos = false;
  let query = "";
  let nextPageToken = "";
  const maxResults = 10;
  let totalResults = 0;

  const updateResults = (result, isNewSearch = false) => {
    if (isNewSearch) {
      grid.innerHTML = "";
      nextPageToken = result.nextPageToken || "";
    }
    if (!result || !Array.isArray(result.videos)) {
      grid.innerHTML = "<p>Error: Datos inválidos</p>";
      return;
    }
    if (result.videos.length === 0 && isNewSearch) {
      grid.innerHTML = "<p>No se encontraron resultados.</p>";
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
      console.error("❌ Error: query inválida en searchVideos()", query);
      return;
    }
    if (isNewSearch) showLoading();
    const result = await searchVideo(query, nextPageToken);
    updateResults(result, isNewSearch);
  };

  const loadSavedVideos = async () => {
    grid.innerHTML = "<p>Cargando videos guardados...</p>";
    try {
      const result = await getVideos();
      let videos = Array.isArray(result)
        ? result
        : result.videos && Array.isArray(result.videos)
        ? result.videos
        : result.data && Array.isArray(result.data)
        ? result.data
        : [];
      updateResults({ videos, nextPageToken: "", totalResults: videos.length }, true);
    } catch (error) {
      console.error("Error cargando videos guardados:", error);
      updateResults({ videos: [], nextPageToken: "", totalResults: 0 }, true);
    }
  };

  toggleButton.addEventListener("click", () => {
    showingSavedVideos = !showingSavedVideos;
    if (showingSavedVideos) {
      toggleButton.innerText = "Ver búsqueda de videos";
      searchBarElement.style.display = "none";
      loadMoreButton.style.display = "none";
      loadSavedVideos();
    } else {
      toggleButton.innerText = "Ver videos guardados";
      searchBarElement.style.display = "block";
      grid.innerHTML = "";
      loadMoreButton.style.display = "none";
    }
  });

  loadMoreButton.addEventListener("click", () => {
    searchVideos(false);
  });

  const searchBarElement = SearchBarVids((searchQuery) => {
    if (!searchQuery || typeof searchQuery !== "string") {
      console.error("❌ Error: searchQuery inválida en SearchBarVids callback:", searchQuery);
      return;
    }
    query = searchQuery;
    nextPageToken = ""; // Reiniciar paginación en una nueva búsqueda
    searchVideos(true);
  });
  searchBarElement.style.display = "block";

  container.appendChild(toggleButton);
  container.appendChild(searchBarElement);
  container.appendChild(grid);
  container.appendChild(loadMoreButton);
  container.appendChild(BackBtn(Home, "home"));

  const showLoading = () => {
    grid.innerHTML = "<p>Buscando...</p>";
  };

  return { container, updateResults, showLoading };
};
