// VideoCard.js
import { createVideo, updateVideo, deleteVideo } from "../../api/videoApi.js";
import { getState, setState } from "../../utils/state.js";

export const VideoCard = (video) => {
  const card = document.createElement("div");
  card.classList.add("video-card");

  const isSaved = !!video.id;
  if (isSaved) {
    card.dataset.videoId = video.id;
    const videoCards = getState("videoCards") || {};
    videoCards[video.id] = card;
    setState("videoCards", videoCards);
  }

  // 📌 Generamos las URLs para el video y el canal
  const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
  const channelUrl = `https://www.youtube.com/channel/${video.channelId}`;

  card.innerHTML = `
    <div class="card-summary">
      <img src="${video.thumbnail || 'default-thumbnail.png'}" alt="${video.title}">
      <h3>
        <a href="${videoUrl}" target="_blank" rel="noopener noreferrer">
          ${video.title}
        </a>
      </h3>
      <p>
        <strong>Canal:</strong> 
        <a href="${channelUrl}" target="_blank" rel="noopener noreferrer">
          ${video.channelTitle}
        </a>
      </p>
      <button class="expand-button">Ver detalles</button>
    </div>
    <div class="card-details" style="display: none;">
      ${["Descripción", "Fecha de publicación"]
        .map((key, i) => video[["description", "publishedAt"][i]]
          ? `<p><strong>${key}:</strong> ${video[["description", "publishedAt"][i]]}</p>`
          : "")
        .join("")}
      <textarea class="notes-input" placeholder="Agrega tus notas...">${video.notes || ""}</textarea>
      <div class="details-buttons">
        ${isSaved ? `<button class="update-button">Actualizar</button>
                     <button class="delete-button">Eliminar</button>`
                  : `<button class="save-button">Guardar</button>`}
        <button class="collapse-button">✖</button>
      </div>
    </div>
  `;

  // 📌 Agregamos comportamiento a los botones
  const detailsDiv = card.querySelector(".card-details");
  const notesInput = card.querySelector(".notes-input");
  const expandButton = card.querySelector(".expand-button");
  const collapseButton = card.querySelector(".collapse-button");
  let saveButton = card.querySelector(".save-button");
  let updateButton = card.querySelector(".update-button");
  let deleteButton = card.querySelector(".delete-button");

  const toggleCard = () => {
    const expanded = card.classList.toggle("expanded");
    detailsDiv.style.display = expanded ? "block" : "none";
  };

  card.addEventListener("click", (e) => {
    if (![collapseButton, saveButton, updateButton, deleteButton, notesInput].includes(e.target)) {
      toggleCard();
    }
  });

  collapseButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCard();
  });

  document.addEventListener("click", (e) => {
    if (card.classList.contains("expanded") && !card.contains(e.target)) {
      toggleCard();
    }
  });

  const handleVideoAction = async (action, data = {}) => {
    if (action === "delete" && !confirm("¿Eliminar este video?")) return;
    const apiCall = { save: createVideo, update: updateVideo, delete: deleteVideo }[action];
    const result = await apiCall(video.id || data, data);

    if (result.error) return alert(`Error: ${result.error}`);

    alert(`¡Video ${action === "save" ? "guardado" : action === "update" ? "actualizado" : "eliminado"} correctamente!`);
    document.dispatchEvent(new CustomEvent("videoSaved"));
    toggleCard();

    if (action === "save" && result.id) {
      video.id = result.id;
      video.notes = notesInput.value; // Guardar las notas en el objeto video
      card.dataset.videoId = result.id;
      saveButton.remove();
      card.querySelector(".details-buttons").insertAdjacentHTML("afterbegin", `
        <button class="update-button">Actualizar</button>
        <button class="delete-button">Eliminar</button>
      `);
      updateButton = card.querySelector(".update-button");
      deleteButton = card.querySelector(".delete-button");
      updateButton.addEventListener("click", () => handleVideoAction("update", { notes: notesInput.value }));
      deleteButton.addEventListener("click", () => handleVideoAction("delete"));
      setState("videoCards", { ...getState("videoCards"), [video.id]: card });
    }
  };

  if (!isSaved && saveButton) saveButton.addEventListener("click", () => handleVideoAction("save", {
    title: video.title, channelTitle: video.channelTitle, thumbnail: video.thumbnail, notes: notesInput.value,
    videoId: video.videoId, description: video.description, publishedAt: video.publishedAt, channelId: video.channelId
  }));

  if (isSaved && updateButton) updateButton.addEventListener("click", () => handleVideoAction("update", { notes: notesInput.value }));
  if (isSaved && deleteButton) deleteButton.addEventListener("click", () => handleVideoAction("delete"));

  return card;
};
