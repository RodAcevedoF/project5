import { updateVideo, deleteVideo, getVideos } from "../../api/videoApi.js";
import { setState } from "../../utils/state.js";
import {
  updateVideoCount,
  updateChannelSelect
} from "../../utils/updateVideoCount.js";
import CardBtn from "../CardBtn/CardBtn.js";
import SavedListBtn from "../SavedListBtn/SavedListBtn";
import "./VidListElement.css";

let currentOpenCard = null;

const VidListElement = (video) => {
  const li = document.createElement("li");
  li.classList.add("video-li");
  const isSaved = !!video.id;
  if (isSaved) {
    li.dataset.videoId = video.id;
  }

  const videoUrl = `https://www.youtube.com/watch?v=${video.video_id}`;
  const channelUrl = `https://www.youtube.com/channel/${video.channelid}`;
  const formattedDate = new Date(video.created_at).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  const formatValue = (key, value) => {
    if (
      (key === "description" || key === "notes") &&
      (!value || value.trim() === "")
    ) {
      return "No disponible"; // Si el valor está vacío o nulo
    }
    return value || "Unknown";
  };

  li.innerHTML = `
  <div class="savedvid-header">
    <div class="savedvid-title">
      <p class="saved-label">Title</p>
      <a href="${videoUrl}" target="_blank" rel="noopener noreferrer">  
         <h3>${video.title || "No Title"}</h3>
      </a>
    </div>
  </div>
  <div class="vid-li-summary vid-collapsibles">
    <a href="${videoUrl}" target="_blank" rel="noopener noreferrer">
      <img src="${video.thumbnail || "/images/defaultCover.png"}" alt="${
    video.title || "Sin título"
  }"  class="video-img">
    </a>
    <div class="savedvideo-title">
      <div class="inner-vid-info">
        <p class="saved-vid-label">Channel</p>
        <div class="saved-channel">
          <a href="${channelUrl}" target="_blank" rel="noopener noreferrer">
          <img class="channel-icon" src="/icon/youtube.png" alt="youtube icon"/>
          ${video.channel || "Canal desconocido"}
          </a>
        </div>
        <p class="saved-vid-label">Published</p>
        <p class="saved-publish-date">${
          formattedDate || "Fecha desconocida"
        }</p>
      </div>
      <div class="saved-vidcard-details">
        <p><strong>Description:</strong> ${formatValue(
          "description",
          video.description
        )}</p>
      </div>
    </div>
  </div>
  <div class="video-input-div vid-collapsibles">
    <p><strong>Notes:</strong> ${formatValue("notes", video.notes)}</p>
    <textarea class="saved-notes-input">${video.notes || ""}</textarea>
  <div class="li-button-group"></div>
  `;

  const notesInput = li.querySelector(".saved-notes-input");
  const buttonGroup = li.querySelector(".li-button-group");
  const headerVidClick = li.querySelector(".savedvid-header");

  // Botones de acción
  const updateButton = CardBtn("Update", "update", "/icon/speed.png");
  const closeButton = CardBtn("Close", "close", "/icon/close.png");

  buttonGroup.appendChild(updateButton);
  buttonGroup.appendChild(closeButton);

  headerVidClick.addEventListener("click", (e) => {
    e.stopPropagation(); // evitamos que dispare el document.click
    if (currentOpenCard && currentOpenCard !== li) {
      currentOpenCard
        .querySelectorAll(".vid-collapsibles")
        .forEach((elem) => elem.classList.remove("visible"));
    }
    const isAlreadyOpen = li.classList.contains("open");

    li.classList.toggle("open");
    li.querySelectorAll(".vid-collapsibles").forEach((elem) =>
      elem.classList.toggle("visible", !isAlreadyOpen)
    );
    currentOpenCard = !isAlreadyOpen ? li : null;
  });

  document.addEventListener("click", (e) => {
    if (currentOpenCard && !currentOpenCard.contains(e.target)) {
      currentOpenCard
        .querySelectorAll(".vid-collapsibles")
        .forEach((elem) => elem.classList.remove("visible"));
      currentOpenCard.classList.remove("open");
      currentOpenCard = null;
    }
  });

  const listButtons = SavedListBtn(
    "seen",
    "seen-vid-btn",
    "Delete",
    "delete-vid-btn"
  );
  headerVidClick.appendChild(listButtons);

  // Eventos para actualizar y eliminar
  updateButton.addEventListener("click", async () => {
    const result = await updateVideo(video.id, { notes: notesInput.value });
    if (result.error) {
      alert("Error al actualizar el video.");
      return;
    }
    alert("¡Notas actualizadas!");
  });

  closeButton.addEventListener("click", () => {
    document
      .querySelectorAll(".vid-collapsibles")
      .forEach((elem) => elem.classList.remove("visible"));
  });
  const deleteButton = li.querySelector("#delete-vid-btn");
  deleteButton.addEventListener("click", async () => {
    if (!confirm("¿Eliminar este video?")) return;
    const result = await deleteVideo(video.id);
    if (result.error) {
      alert("Error al eliminar el video.");
      return;
    }
    li.remove();
    document.dispatchEvent(
      new CustomEvent("videoDeleted", { detail: { videoId: video.id } })
    );
    const updatedVids = await getVideos();
    setState("videoCards", updatedVids);
    updateVideoCount();
    updateChannelSelect();
  });

  return li;
};

export default VidListElement;
