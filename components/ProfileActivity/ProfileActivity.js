import "./ProfileActivity.css";
import "./clock.css";
import { formatZuluToLocal } from "../../utils/formatZuluToLocal";

const clock = ` 
<div class="loader">
  <span class="hour"></span>
  <span class="min"></span>
  <span class="circel"></span>
</div>`;

const ProfileActivity = (userData) => {
  const sect = document.createElement("section");
  sect.classList.add("profile-activity-section", "inactive");

  const lastLoginFormatted = formatZuluToLocal(userData.lastLogin);

  sect.innerHTML = `
    <h2>Activity</h2>
    <div class="activity-content">
      <div class="session-timer style-activity">
        <p><strong>Last connection:</strong> ${lastLoginFormatted}</p>
        <div class="activity-clock-div">
          ${clock}
          <p><span id="session-duration">Calculating...</span></p>
        </div>
      </div>
      <div class="activity-counter style-activity">
        <p><strong>To-do's count:</strong> ${userData.counts.todos}</p>
        <p><strong>Video's count:</strong> ${userData.counts.videos}</p>
        <p><strong>Book's count:</strong> ${userData.counts.books}</p>
      </div>   
      <div class="activity-todo style-activity">
        <h3>Last saved to-do</h3>
        <p><strong>Title:</strong> ${
          userData.todo.lastTodoTitle || "No data"
        }</p>              
        <p><strong>Date:</strong> ${formatZuluToLocal(
          userData.todo.lastTodoActivity
        )}</p>
      </div>
      <div class="activity-books style-activity">
        <h3>Last saved books</h3>
        <p><strong>Title:</strong> ${
          userData.book.lastBookTitle || "No data"
        }</p>              
        <p><strong>Date:</strong> ${formatZuluToLocal(
          userData.book.lastBookActivity
        )}</p>
      </div>
      <div class="activity-videos style-activity">
        <h3>Last saved videos</h3>
        <p><strong>Title:</strong> ${
          userData.video.lastVideoTitle || "No data"
        }</p>              
        <p><strong>Date:</strong> ${formatZuluToLocal(
          userData.video.lastVideoActivity
        )}</p>
      </div>
    </div>
  `;

  const durationSpan = sect.querySelector("#session-duration");

  const updateDuration = () => {
    const loginTime = new Date(userData.lastLogin);
    const now = new Date();
    const diffMs = now - loginTime;

    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const durationStr = `<span>${
      hours ? `${hours}h ` : "0h"
    }</span><span>${minutes}m </span><span>${seconds}s </span>`;
    if (durationSpan) durationSpan.innerHTML = `${durationStr}`;
  };

  updateDuration();
  const intervalId = setInterval(updateDuration, 1000);

  // 👉 Simple cleanup por si lo querés desmontar manualmente después
  sect.cleanup = () => clearInterval(intervalId);

  return sect;
};

export default ProfileActivity;
