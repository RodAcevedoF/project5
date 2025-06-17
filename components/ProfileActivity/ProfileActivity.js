import "./ProfileActivity.css";
import { formatZuluToLocal } from "../../utils";

const clock = ` 
<div class="clock-timer">
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
        <p>Last connection: ${lastLoginFormatted}</p>
        <div class="activity-clock-div">
          ${clock}
          <p><span id="session-duration">Calculating...</span></p>
        </div>
      </div>
      <div class="activity-counter style-activity">
        <h4>Counter</h4>
        <div>
          <p><img src="/images/todolist.png" alt="to-do icon" class="dash-icons"> To-do's: ${
            userData.counts.todos
          }</p>
          <p><img src="/images/videoicon.png" alt="videos icon" class="dash-icons"> Video's: ${
            userData.counts.videos
          }</p>
          <p><img src="/images/booklanding.png" alt="books icon" class="dash-icons"> Book's: ${
            userData.counts.books
          }</p>
        </div>
      </div>   
      <div class="activity-todo style-activity">
        <h3>Last To-do</h3>
        <div class="inner-activity">
          <p><span class="inner-span"><img src="/icon/check.png" alt="ok icon">Title:</span> ${
            userData.todo.lastTodoTitle || "No data yet"
          }</p>              
          <p><span class="inner-span"><img src="/icon/lasttime.png
          " alt="date icon">Date:</span> ${formatZuluToLocal(
            userData.todo.lastTodoActivity
          )}</p>
        </div>
      </div>
      <div class="activity-books style-activity">
        <h3>Last Book</h3>
        <div class="inner-activity">
          <p><span class="inner-span"><img src="/icon/check.png" alt="ok icon">Title:</span> ${
            userData.book.lastBookTitle || "No data yet"
          }</p>              
          <p><span class="inner-span"><img 
          src="/icon/lasttime.png
          " alt="date icon">Date:</span> ${formatZuluToLocal(
            userData.book.lastBookActivity
          )}</p>
        </div>
      </div>
      <div class="activity-videos style-activity">
        <h3>Last Video</h3>
        <div class="inner-activity">
          <p><span class="inner-span"><img src="/icon/check.png" alt="ok icon">Title:</span> ${
            userData.video.lastVideoTitle || "No data yet"
          }</p>              
          <p><span class="inner-span"><img src="/icon/lasttime.png
          " alt="date icon">Date:</span> ${formatZuluToLocal(
            userData.video.lastVideoActivity
          )}</p>
        </div>
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

  sect.cleanup = () => clearInterval(intervalId);

  return sect;
};

export default ProfileActivity;
