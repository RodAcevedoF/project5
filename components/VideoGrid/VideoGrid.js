// VideoGrid.js
import { VideoCard } from "../VideoCard/VideoCard.js";
//import "./VideoGrid.css";
import { SearchBarVids } from "../SearchBarVids/SearchBarVids.js";
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
  let showingSavedVideos = false;

  const updateResults = (results) => {
    grid.innerHTML = "";

    if (!Array.isArray(results)) {
      console.error("Los resultados no son un array:", results);
      grid.innerHTML = "<p>Error: Datos inválidos</p>";
      return;
    }

    if (results.length === 0) {
      grid.innerHTML = "<p>No se encontraron resultados.</p>";
      return;
    }

    results.forEach((video) => {
      const card = VideoCard(video);
      grid.appendChild(card);
    });
  };

  const searchBarElement = SearchBarVids(updateResults);
  searchBarElement.style.display = "block";

  const loadSavedVideos = async () => {
    grid.innerHTML = "<p>Cargando videos guardados...</p>";
    try {
      const result = await getVideos();
      let videos = [];
      if (Array.isArray(result)) {
        videos = result;
      } else if (result.videos && Array.isArray(result.videos)) {
        videos = result.videos;
      } else if (result.data && Array.isArray(result.data)) {
        videos = result.data;
      }

      updateResults(videos);
    } catch (error) {
      console.error("Error cargando videos guardados:", error);
      updateResults([]);
    }
  };

  toggleButton.addEventListener("click", () => {
    showingSavedVideos = !showingSavedVideos;

    if (showingSavedVideos) {
      toggleButton.innerText = "Ver búsqueda de videos";
      searchBarElement.style.display = "none";
      loadSavedVideos();
    } else {
      toggleButton.innerText = "Ver videos guardados";
      searchBarElement.style.display = "block";
      grid.innerHTML = "";
    }
  });

  container.appendChild(toggleButton);
  container.appendChild(searchBarElement);
  container.appendChild(grid);
  container.appendChild(BackBtn(Home, "home"));

  const showLoading = () => {
    grid.innerHTML = "<p>Buscando...</p>";
  };

  return {
    container,
    updateResults,
    showLoading
  };
};
