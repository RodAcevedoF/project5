import { createVideo } from "../../api/videoApi.js";
import "./VideoCard.css";
import CardBtn from "../CardBtn/CardBtn.js";
import { updateChannelSelect } from "../../utils/updateVideoCount.js";

export const VideoCard = (video) => {
  const card = document.createElement("div");
  card.classList.add("video-card");
  console.log(video);
  card.innerHTML = `
    <div class="card-summary">
      <img src="${video.thumbnail || "default-thumbnail.png"}" alt="${
    video.title
  } Thumbnail">
      <div class="videocard-title">
        <p class="label">Title</p>
        <h3>${video.title}</h3>
        <p class="label">Channel</p> 
        <p class="channel">${video.channel}</p>
        <p class="label">Published</p>
        <p class="publish-date">${video.created_at}</p>
      </div>
    </div>
    <div class="card-details">
      <div class="extra-details">
        ${["Duration", "Rating"]
          .map((label, i) => {
            const key = ["duration", "rating"][i];
            let value = video[key];
            if (value === null || value === undefined || value === 0) {
              value = "Unknown";
            }
            return value ? `<p><strong>${label}:</strong> ${value}</p>` : "";
          })
          .join("")}
      </div>  
      <p class="card-description">${
        video.description || "No description available."
      }</p>
      <div class="card-actions">
         <textarea class="notes-input" placeholder="Add some notes...">${
           video.notes || ""
         }</textarea>
         <div class="details-button"></div>
      </div>
    </div>
  `;

  const summaryDiv = card.querySelector(".card-summary");
  const detailsDiv = card.querySelector(".card-details");
  const notesInput = card.querySelector(".notes-input");
  const detailsBtnDiv = card.querySelector(".details-button");

  const saveButton = CardBtn("Save", "save", "/icon/add.png");
  const collapseButton = CardBtn("Close", "collapse", "/icon/close.png");

  detailsBtnDiv.appendChild(saveButton);
  detailsBtnDiv.appendChild(collapseButton);

  const toggleCard = () => {
    card.classList.toggle("expanded");
    detailsDiv.classList.toggle("expanded");
    summaryDiv.classList.toggle("expanded");
  };

  card.addEventListener("click", (e) => {
    if (
      !e.target.closest(".details-button") &&
      !e.target.closest(".notes-input")
    ) {
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
  saveButton.addEventListener("click", async () => {
    const result = await createVideo({
      video_id: video.video_id,
      title: video.title,
      channel: video.channel,
      thumbnail: video.thumbnail,
      notes: notesInput.value,
      description: video.description,
      created_at: video.created_at
    });
    console.log("Datos que se envían a createVideo:", {
      video_id: video.video_id,
      title: video.title,
      channel: video.channel,
      thumbnail: video.thumbnail,
      notes: notesInput.value,
      description: video.description,
      created_at: video.created_at
    });
    if (result.error) {
      alert(`Error: ${result.error}`);
      return;
    }

    alert("¡Video guardado correctamente!");
    updateChannelSelect();

    document.dispatchEvent(new CustomEvent("videoSaved", { detail: result }));
  });

  return card;
};
