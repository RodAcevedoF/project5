import "./ProfileActivity.css";
import { formatZuluToLocal } from "../../utils/formatZuluToLocal";

const ProfileActivity = (userData) => {
  const sect = document.createElement("section");
  sect.classList.add("profile-activity-section", "inactive");

  const lastLoginFormatted = formatZuluToLocal(userData.lastLogin);

  sect.innerHTML = `
    <h2>Activity</h2>
    <div class="activity-content">
      <div class="session-timer">
        <p><strong>Last connection:</strong> ${lastLoginFormatted}</p>
        <p><span id="session-duration">Calculating...</span></p>
      </div>
      <div class="activity-counter">
        <p><strong>To-do's count:</strong> ${userData.counts.todos}</p>
        <p><strong>Video's count:</strong> ${userData.counts.videos}</p>
        <p><strong>Book's count:</strong> ${userData.counts.books}</p>
      </div>   
      <div class="activity-todo">
        <h3>To-dos</h3>
        <p><strong>Title:</strong> ${
          userData.todo.lastTodoTitle || "No data"
        }</p>              
        <p><strong>Date:</strong> ${formatZuluToLocal(
          userData.todo.lastTodoActivity
        )}</p>
      </div>
      <div class="activity-books">
        <h3>Books</h3>
        <p><strong>Title:</strong> ${
          userData.book.lastBookTitle || "No data"
        }</p>              
        <p><strong>Date:</strong> ${formatZuluToLocal(
          userData.book.lastBookActivity
        )}</p>
      </div>
      <div class="activity-videos">
        <h3>Videos</h3>
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
      hours ? `${hours}h ` : ""
    }</span><span>${minutes}m </span><span>${seconds}s </span>`;
    if (durationSpan) durationSpan.innerHTML = durationStr;
  };

  updateDuration();
  const intervalId = setInterval(updateDuration, 1000);

  // 👉 Simple cleanup por si lo querés desmontar manualmente después
  sect.cleanup = () => clearInterval(intervalId);

  return sect;
};

export default ProfileActivity;
