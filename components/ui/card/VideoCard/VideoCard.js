import "./VideoCard.css";
import { createVideo } from "../../../../api/videoApi.js";
import { animationVideoCard, CardBtn } from "../../../../components";
import {
  updateChannelSelect,
  formatDuration,
  formatViews,
  formatDate,
  convertToSeconds
} from "../../../../utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swal from "sweetalert2";

gsap.registerPlugin(ScrollTrigger);

export const VideoCard = (video) => {
  const card = document.createElement("div");
  card.classList.add("video-card");
  const videoUrl = `https://www.youtube.com/watch?v=${video.video_id}`;
  const channelUrl = `https://www.youtube.com/channel/${video.channelId}`;
  const formattedDuration = formatDuration(video.duration);
  const formattedViews = formatViews(video.views);
  const formattedDate = formatDate(video.created_at);

  card.innerHTML = `
    <div class="vidcard-header">
      <a class="channel" href="${channelUrl}" target="_blank" rel="noopener noreferrer">
        <img class="channel-icon" src="/icon/youtube.png" alt="youtube icon"/>
        ${video.channel || "Canal desconocido"}
      </a>
    </div>
    <div class="vidcard-summary">
      <div class="thumbnail-title">
        <img class="vid-thumbnail" src="${
          video.thumbnail || "default-thumbnail.png"
        }" alt="${video.title} Thumbnail">
        <div class="vidcard-title">
          <p class="label">Title</p>
          <a class="title-url" href="${videoUrl}" target="_blank" rel="noopener noreferrer">
            <h3>${video.title}</h3>
          </a>
          <p class="label">Published</p>
          <p class="publish-date">${formattedDate}</p>          
        </div>
      </div>
      <div class="midvid-info">
        <p class="vid-description">
         <strong>Description: </strong>${
           video.description || "No description available."
         }</p>
        <div class="extra-details">
          <p><strong>Duration: </strong>${formattedDuration}</p>
          <p><strong>Views: </strong>${formattedViews}</p>
        </div>
      </div>
    </div>
    <div class="vidcard-details">
         <textarea class="notes-input" placeholder="Add some notes...">${
           video.notes || ""
         }</textarea>
         <div class="vid-details-button"></div>
    </div>
  `;

  const summaryDiv = card.querySelector(".vidcard-summary");
  const detailsDiv = card.querySelector(".vidcard-details");
  const notesInput = card.querySelector(".notes-input");
  const detailsBtnDiv = card.querySelector(".vid-details-button");
  const vidDescription = card.querySelector(".vid-description");
  const videoCardTitle = card.querySelector(".vidcard-title");
  const extraDetails = card.querySelector(".extra-details");

  const saveButton = CardBtn("Save", "save", "/icon/add.png");
  const collapseButton = CardBtn("Close", "collapse", "/icon/close.png");

  detailsBtnDiv.appendChild(saveButton);
  detailsBtnDiv.appendChild(collapseButton);

  const toggleCard = () => {
    card.classList.toggle("expanded");
    detailsDiv.classList.toggle("expanded");
    summaryDiv.classList.toggle("expanded");
    vidDescription.classList.toggle("expanded");
    videoCardTitle.classList.toggle("expanded");
    extraDetails.classList.toggle("expanded");
  };

  card.addEventListener("click", (e) => {
    if (
      !e.target.closest(".vid-details-button") &&
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
    const durationInSecs = convertToSeconds(video.duration);

    const result = await createVideo({
      video_id: video.video_id,
      title: video.title,
      channel: video.channel,
      channelid: video.channelId,
      thumbnail: video.thumbnail,
      notes: notesInput.value,
      description: video.description,
      created_at: video.created_at,
      views: video.views,
      duration_seconds: durationInSecs
    });

    if (result.error) {
      await Swal.fire({
        icon: "error",
        title: "Error while saving video",
        text: result.error,
        confirmButtonColor: "#d33"
      });
      toggleCard();
      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Success",
      text: "Your video was saved successfully!",
      timer: 1000,
      showConfirmButton: false
    });

    updateChannelSelect();
    document.dispatchEvent(new CustomEvent("videoSaved", { detail: result }));
    toggleCard();
  });

  requestAnimationFrame(() => {
    //animationVideoCard("video-card");
    gsap.from(card, {
      opacity: 0,
      y: 25,
      duration: 0.4,
      ease: "power2.out",
      yPercent: 0,
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });
  });
  return card;
};
