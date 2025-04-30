import { updateVideo, deleteVideo, getVideos } from "../../api/videoApi.js";
import { setState } from "../../utils/state.js";
import {
  updateVideoCount,
  updateChannelSelect
} from "../../utils/updateVideoCount.js";
import {
  formatDate,
  formatDurationSecs,
  formatViews
} from "../../utils/videoUtils.js";
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
  const formattedDate = formatDate(video.created_at);
  const formattedViews = formatViews(video.views);
  const formattedDuration = formatDurationSecs(video.duration_seconds);

  li.innerHTML = `
  <div class="savedvid-header">
    <div class="savedvid-title">
      <div class="savedvid-label-div">
        <p class="saved-label">Title</p>
        <div class="checked-video-div">
          <p class="checked-info">Seen</p>
          <img src="/icon/checked.png" alt="check icon" class="checked-icon"/>
        </div> 
      </div> 
      <h3>${video.title || "No Title"}</h3>
    </div>
  </div>
  <div class="vid-li-summary vid-collapsibles">
    <a href="${videoUrl}" target="_blank" rel="noopener noreferrer">
      <img src="${video.thumbnail || "/images/defaultCover.png"}" alt="${
    video.title || "Sin título"
  }"  class="video-img">
    </a>
    <div class="savedvideo-main-info">
      <div class="inner-vid-info">
        <div>
          <p class="saved-vid-label">Channel</p>
          <div class="saved-channel">
            <a href="${channelUrl}" target="_blank" rel="noopener noreferrer">
              <img class="channel-icon" src="/icon/youtube.png" alt="youtube icon"/>
              ${video.channel || "Canal desconocido"}
            </a>
          </div>
        </div>
        <div class="video-date">
          <p class="saved-vid-label">Published</p>
          <p class="saved-publish-date">${
            formattedDate || "Fecha desconocida"
          }</p>
        </div>
      </div>
      <div class="views-duration">
        <p><strong>Length: </strong>${formattedDuration || "Not Available"}</p>
        <p><strong>Views: </strong> ${formattedViews || "Not Available"}</p>
      </div>
      <div class="saved-vidcard-details">
        <p><strong>Description:</strong> ${
          video.description || "Not Available"
        }</p>
      </div>
    </div>
  </div>
  <div class="video-input-div vid-collapsibles">
    <p class="savedvid-notes"><strong>Notes:</strong> ${
      video.notes || "Not Available"
    }</p>
    <textarea class="saved-notes-input">${video.notes || ""}</textarea>
  <div class="li-button-group"></div>
  `;

  const buttonGroup = li.querySelector(".li-button-group");
  const headerVidClick = li.querySelector(".savedvid-header");
  const checkedInfo = li.querySelector(".checked-video-div");
  if (video.checked) checkedInfo.classList.add("visible");

  // Botones de acción
  const listButtons = SavedListBtn(
    "seen",
    "seen-vid-btn",
    "Delete",
    "delete-vid-btn"
  );
  const updateButton = CardBtn("Update", "update", "/icon/speed.png");
  const closeButton = CardBtn("Close", "close", "/icon/close.png");

  headerVidClick.appendChild(listButtons);
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

  closeButton.addEventListener("click", () => {
    document
      .querySelectorAll(".vid-collapsibles")
      .forEach((elem) => elem.classList.remove("visible"));
    notesTextarea.style.display = "none";
    notesDisplay.style.display = "block";
  });

  const deleteButton = li.querySelector("#delete-vid-btn");
  deleteButton.addEventListener("click", async () => {
    if (!confirm("Delete this video?")) return;
    const result = await deleteVideo(video.id);
    if (result.error) {
      alert("Error deleting video.");
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

  const notesDisplay = li.querySelector(".savedvid-notes");
  const notesTextarea = li.querySelector(".saved-notes-input");

  // Estado inicial: mostrar solo las notas
  notesTextarea.style.display = "none";

  notesDisplay.addEventListener("click", (e) => {
    e.stopPropagation(); // evitamos que dispare el document.click
    notesDisplay.style.display = "none";
    notesTextarea.style.display = "block";
    notesTextarea.focus();
  });

  document.addEventListener("click", (e) => {
    if (
      !notesTextarea.contains(e.target) &&
      notesTextarea.style.display === "block"
    ) {
      notesTextarea.style.display = "none";
      notesDisplay.style.display = "block";
    }
  });

  updateButton.addEventListener("click", async () => {
    const result = await updateVideo(video.id, { notes: notesTextarea.value });
    if (result.error) {
      alert("Error al actualizar el video.");
      return;
    }
    alert("¡Notas actualizadas!");
    notesDisplay.innerHTML = `<strong>Notes:</strong> ${notesTextarea.value}`;
    notesTextarea.style.display = "none";
    notesDisplay.style.display = "block";
  });

  const seenButton = li.querySelector("#seen-vid-btn");
  seenButton.addEventListener("click", async (ev) => {
    ev.stopPropagation(); // evitamos que dispare el document.click
    const result = await updateVideo(video.id, { checked: !video.checked });
    if (result.error) {
      alert("Error updating video.");
      return;
    }
    checkedInfo.classList.toggle("visible");
  });

  return li;
};

export default VidListElement;
