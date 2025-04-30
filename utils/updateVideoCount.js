import { getState } from "./state.js";

export const filterVideos = (query = "", channel = "", maxDuration = 120) => {
  const videoCards = getState("videoCards") || {};
  Object.values(videoCards).forEach((video) => {
    const card = document.querySelector(`[data-video-id="${video.id}"]`);
    if (!card) return;

    const matchesTitle = video.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesChannel = channel ? video.channel === channel : true;
    const minutesDuration = video.duration_seconds / 60;
    const matchesDuration =
      maxDuration === Infinity || minutesDuration <= maxDuration;

    card.style.display =
      matchesTitle && matchesChannel && matchesDuration ? "block" : "none";
  });
};

export const updateVideoCount = () => {
  const visibleCards = Array.from(
    document.querySelectorAll(".video-li")
  ).filter((card) => card.style.display !== "none").length;
  const allCards = Object.keys(getState("videoCards")).length || 8;
  const countElement = document.querySelector(".video-count");
  if (countElement) {
    countElement.textContent = `${visibleCards} / ${allCards}`;
  }
};

export const getChannels = () => {
  const videoCards = getState("videoCards") || {};
  const channels = new Set();

  Object.values(videoCards).forEach((video) => {
    if (video.channel) {
      channels.add(video.channel);
    }
  });

  return Array.from(channels);
};

export const updateChannelSelect = (getChannels) => {
  const select = document.querySelector("#channel-select");
  if (!select) return;

  const channels = getChannels();
  select.innerHTML = `
    <option value="">Select channel</option>
    ${channels.map((ch) => `<option value="${ch}">${ch}</option>`).join("")}
  `;
};
