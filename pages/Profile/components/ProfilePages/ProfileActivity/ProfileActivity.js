import "./ProfileActivity.css";

const ProfileActivity = () => {
  const sect = document.createElement("section");
  sect.classList.add("profile-activity-section");
  sect.classList.add("inactive");

  sect.innerHTML = `
        <h2>Activity</h2>
        <div class="activity-content">
            <div class="activity-todo">
              <h3>To-dos</h3>
              <p>No content available</p>
            </div>
            <div class="activity-books">
              <h3>Books</h3>
              <p>No content available</p>
            </div>
            <div class="activity-videos">
              <h3>Videos</h3>
              <p>No content available</p>
            </div>
            <div class="session-time">
              <h3>Session</h3>
              <p>No content available</p>
            </div>
        </div>
        `;

  return sect;
};
export default ProfileActivity;
