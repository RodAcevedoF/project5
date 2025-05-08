import "./ProfileSettings.css";

const ProfileSettings = () => {
  const sect = document.createElement("section");
  sect.classList.add("profile-settings-section");
  sect.classList.add("inactive");

  sect.innerHTML = `
        <h2>Settings</h2>
        <div class="settings-content">
            <div class="settings-account">
                <h3>Account Settings</h3>
                <p>No content available</p>
            </div>
            <div class="settings-privacy">
                <h3>Privacy Settings</h3>
                <p>No content available</p>
            </div>
            <div class="settings-notifications">
                <h3>Notification Settings</h3>
                <p>No content available</p>
            </div>
        </div>`;

  return sect;
};

export default ProfileSettings;
