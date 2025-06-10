import "./ProfileHeader.css";
import displayNick from "../../utils/displayNickname";

export const ProfileHeader = (user) => {
  const header = document.createElement("header");
  header.classList.add("profile-header");
  const nickname = displayNick(user.nickname);
  const defaultAvatar = () => {
    const span = document.createElement("span");
    span.classList.add("default-header-avatar");
    span.textContent = user.name.charAt(0).toUpperCase();
    return span.outerHTML;
  };
  header.innerHTML = `
            <div>
              <p class="title-profile">Profile</p>
            </div>
            <div class="profile-header-body">
              <p class="profile-header-nick">${nickname}</p>
              <div class="hover-profile-header">
                ${
                  user.profile_image !== null
                    ? `<img
                      src=${user.profile_image}
                      alt="Avatar"
                      class="header-avatar"
                    />`
                    : defaultAvatar()
                }
                <h2>${user.name}</h2>
              </div>
            </div>
            <div class="divider"></div>
            <ul class="profile-nav">
              <li id="edit-profile">Edit profile</li>
              <li id="activity-profile">Activity</li>
              <li id="settings-profile">Settings</li>
            </ul>`;

  return header;
};
/*(name, email, password, description, profile_image, phone, website, github_url, birth_date, hobbies, location)*/
