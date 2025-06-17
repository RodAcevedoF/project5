import "./ProfileHeader.css";
import { displayNick } from "../../utils";
import { DefaultAvatar } from "..";
import { animationTitle } from "../../public/animations/animationTitle";

export const ProfileHeader = (user) => {
  const header = document.createElement("header");
  header.classList.add("profile-header");
  const nickname = displayNick(user.nickname);
  const avatar = DefaultAvatar("header", user);

  header.innerHTML = `
            <div>
              <p class="title-profile">Profile</p>
            </div>
            <div class="profile-header-body" id="profile-card">
              <p class="profile-header-nick">${nickname}</p>
              <div class="hover-profile-header">
                <h2>${user.name}</h2>
              </div>
            </div>
            <div class="divider"></div>
            <ul class="profile-nav">
              <li id="edit-profile">Edit profile</li>
              <li id="activity-profile">Activity</li>
              <li id="settings-profile">Settings</li>
            </ul>`;

  const hoverProfile = header.querySelector(".hover-profile-header");
  hoverProfile.insertAdjacentElement("afterbegin", avatar);

  const title = header.querySelector(".title-profile");

  requestAnimationFrame(() => {
    animationTitle(title, "profile-header");
  });

  return header;
};
