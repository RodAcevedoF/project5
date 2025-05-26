import "./ProfileHeader.css";

export const ProfileHeader = (user) => {
  const defaultAvatar = () => {
    const span = document.createElement("span");
    span.classList.add("default-avatar");
    span.textContent = user.name.charAt(0).toUpperCase();
    return span.outerHTML;
  };

  const displayNick = user.nickname.startsWith("@")
    ? user.nickname
    : `@${user.nickname}`;

  const header = document.createElement("header");
  header.classList.add("profile-header");
  header.innerHTML = `
            <p class="title-profile">Profile</p>
            <div>
            ${
              user.profile_image !== null
                ? `<img
                  src=${user.profile_image}
                  alt="Avatar"
                  class="avatar"
                />`
                : defaultAvatar()
            }
            <h2>${user.name}</h2>
            </div>
            <p>${displayNick}</p>
            <ul class="profile-nav">
              <li id="edit-profile">Edit profile</li>
              <li id="activity-profile">Activity</li>
              <li id="settings-profile">Settings</li>
            </ul>`;

  return header;
};
/*(name, email, password, description, profile_image, phone, website, github_url, birth_date, hobbies, location)*/
