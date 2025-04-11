import { createVideo, updateVideo, deleteVideo } from "../../api/videoApi.js";
import { getState, setState } from "../../utils/state.js";
import "./VideoCard.css";
import CardBtn from "../CardBtn/CardBtn.js";

export const VideoCard = (video) => {
  // Se crea la tarjeta contenedora
  const card = document.createElement("div");
  card.classList.add("video-card");

  // Determinar si el video ya está guardado (tiene un id interno)
  const isSaved = !!video.id; /* || video.video_id; */
  //  const normVideoId = video.videoId || video.video_id;

  if (isSaved) {
    card.dataset.videoId = video.id;
  }
  // Normalizar el identificador del video y del canal (ya que en búsquedas viene con otro nombre)
  const normVideoId = video.videoId || video.video_id;
  const normChannelId = video.channelId || video.channelid;
  const videoUrl = `https://www.youtube.com/watch?v=${normVideoId}`;
  const channelUrl = `https://www.youtube.com/channel/${normChannelId}`;

  // Formatear la fecha de creación
  const date = new Date(video.created_at);
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  // Estructura HTML de la tarjeta
  card.innerHTML = `
    <div class="vidcard-header">
      <img src="../../public/icon/youtube.png" alt="youtube icon" class="yt-channel">    
      <p>
        <a href="${channelUrl}" target="_blank" rel="noopener noreferrer">
          ${video.channel}
        </a>
      </p>
      <p>${formattedDate}</p>
    </div>
    <div class="vidcard-summary">
      <img src="${video.thumbnail || "/images/defaultCover.png"}" alt="${
    video.title
  }">
      <p class="vid-description">${video.description}</p>
    </div>
    <div class="vidcard-title">
      <h3>
        <a href="${videoUrl}" target="_blank" rel="noopener noreferrer">
          ${video.title}
        </a>
      </h3>
    </div>
    <div class="vid-input-div">
      <textarea class="notes-input" placeholder="Agrega tus notas...">${
        video.notes || ""
      }</textarea>
      <div class="vid-details-buttons"></div>
    </div>
  `;

  // Referencias a elementos internos
  const summaryDiv = card.querySelector(".vidcard-summary");
  const detailsBtnDiv = card.querySelector(".vid-details-buttons");
  const notesInput = card.querySelector(".notes-input");
  const buttonsContainer = card.querySelector(".vid-details-buttons");
  const vidDescription = card.querySelector(".vid-description");
  const vidInput = card.querySelector(".vid-input-div");

  // Botones de acción
  const saveButtonB = CardBtn("Guardar", "save", "/icon/add.png");
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

  // Función para expandir / contraer la tarjeta
  const toggleCard = () => {
    card.classList.toggle("expanded");
    summaryDiv.classList.toggle("expanded");
    detailsBtnDiv.classList.toggle("expanded");
    vidDescription.classList.toggle("expanded");
    vidInput.classList.toggle("expanded");
  };

  card.addEventListener("click", (e) => {
    // Si el click sucede sobre un enlace (<a>) o dentro de uno, no se hace toggle.
    if (e.target.closest("a")) return;
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

    if (action === "delete") {
      card.remove();
      const videoCards = getState("videoCards") || {};
      delete videoCards[video.id];
      setState("videoCards", videoCards);
    }

    document.dispatchEvent(new CustomEvent("videoSaved"));
  };

  if (!isSaved) {
    saveButtonB.addEventListener("click", () => {
      handleVideoAction("save", {
        title: video.title,
        channel: video.channel,
        thumbnail: video.thumbnail,
        notes: notesInput.value,
        videoId: normVideoId,
        description: video.description,
        created_at: video.created_at,
        channelId: normChannelId
      });
    });
  }
  if (isSaved) {
    updateButtonB.addEventListener("click", () =>
      handleVideoAction("update", { notes: notesInput.value })
    );
    deleteButtonB.addEventListener("click", () => handleVideoAction("delete"));
  }

  return card;
};
