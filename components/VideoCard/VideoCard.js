import { createVideo, updateVideo, deleteVideo } from "../../api/videoApi.js";
import { getState, setState } from "../../utils/state.js";
import "./VideoCard.css";
import CardBtn from "../CardBtn/CardBtn.js";

export const VideoCard = (video) => {
  const card = document.createElement("div");
  card.classList.add("video-card");

  const isSaved = Boolean(video.id);
  if (isSaved) {
    card.dataset.videoId = video.id;
    const videoCards = getState("videoCards") || {};
    videoCards[video.id] = card;
    setState("videoCards", videoCards);
  }

  const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
  const channelUrl = `https://www.youtube.com/channel/${video.channelId}`;

  card.innerHTML = `
    <div class="vidcard-summary">
      <img src="${video.thumbnail || "default-thumbnail.png"}" alt="${
    video.title
  }">
      <div class="">
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
    </div>
    <div class="vidcard-details" style="display: none;">
      ${["Descripción", "Fecha de publicación"]
        .map((label, i) => {
          const key = ["description", "publishedAt"][i];
          return video[key]
            ? `<p><strong>${label}:</strong> ${video[key]}</p>`
            : "";
        })
        .join("")}
      <textarea class="notes-input" placeholder="Agrega tus notas...">${
        video.notes || ""
      }</textarea>
      <div class="vid-details-buttons"></div>
    </div>
  `;

  const detailsDiv = card.querySelector(".vidcard-details");
  const notesInput = card.querySelector(".notes-input");
  const buttonsContainer = card.querySelector(".vid-details-buttons");

  const saveButtonB = CardBtn("Guardar", "save", "../../public/icon/save.png");
  const updateButtonB = CardBtn(
    "Actualizar",
    "update",
    "../../public/icon/speed.png"
  );
  const deleteButtonB = CardBtn(
    "Eliminar",
    "delete",
    "../../public/icon/bolt.png"
  );
  const collapseButtonB = CardBtn("Cerrar", "collapse", "/icon/close.png");

  if (!isSaved) {
    buttonsContainer.appendChild(saveButtonB);
  } else {
    buttonsContainer.appendChild(updateButtonB);
    buttonsContainer.appendChild(deleteButtonB);
  }
  buttonsContainer.appendChild(collapseButtonB);

  const toggleCard = () => {
    const expanded = card.classList.toggle("expanded");
    detailsDiv.style.display = expanded ? "block" : "none";
  };

  card.addEventListener("click", (e) => {
    if (
      ![
        collapseButtonB,
        saveButtonB,
        updateButtonB,
        deleteButtonB,
        notesInput
      ].includes(e.target)
    ) {
      toggleCard();
    }
  });
  collapseButtonB.addEventListener("click", (e) => {
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
    const apiCall = {
      save: createVideo,
      update: updateVideo,
      delete: deleteVideo
    }[action];
    const result = await apiCall(video.id || data, data);
    if (result.error) {
      alert(`Error: ${result.error}`);
      return;
    }

    alert(
      `¡Video ${
        action === "save"
          ? "guardado"
          : action === "update"
          ? "actualizado"
          : "eliminado"
      } correctamente!`
    );
    document.dispatchEvent(new CustomEvent("videoSaved"));
    toggleCard();
  };

  if (!isSaved) {
    saveButtonB.addEventListener("click", () =>
      handleVideoAction("save", {
        title: video.title,
        channelTitle: video.channelTitle,
        thumbnail: video.thumbnail,
        notes: notesInput.value,
        videoId: video.videoId,
        description: video.description,
        publishedAt: video.publishedAt,
        channelId: video.channelId
      })
    );
  }
  if (isSaved) {
    updateButtonB.addEventListener("click", () =>
      handleVideoAction("update", { notes: notesInput.value })
    );
    deleteButtonB.addEventListener("click", () => handleVideoAction("delete"));
  }

  return card;
};
