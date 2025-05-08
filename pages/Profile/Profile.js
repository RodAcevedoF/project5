import "./Profile.css";
import InnerFooter from "../../components/InnerFooter/InnerFooter";
import { ProfileHeader } from "./components/ProfileHeader/ProfileHeader";
import { getProfile } from "../../api/userApi";
import ProfileInfo from "./components/ProfilePages/ProfileInfo/ProfileInfo";
import profileActivity from "./components/ProfilePages/ProfileActivity/ProfileActivity";
import ProfileSettings from "./components/ProfilePages/ProfileSettings/ProfileSettings";

export const Profile = async () => {
  const container = document.querySelector("main");
  container.innerHTML = "";
  const profileSection = document.createElement("section");
  profileSection.classList.add("profile-section");
  const innerFooter = InnerFooter();

  let user = {
    name: "Unknown",
    nick: "unknown",
    profile_image: null
  };

  const res = await getProfile();
  console.log("Fetched profile:", res);
  user = res.user;

  const profileHeader = ProfileHeader(user);
  profileSection.appendChild(profileHeader);

  const pagesDiv = document.createElement("div");
  pagesDiv.classList.add("profile-pages-container");

  const profileInfo = ProfileInfo(user);
  pagesDiv.appendChild(profileInfo);
  profileSection.appendChild(pagesDiv);

  const profileDash = profileActivity();
  pagesDiv.appendChild(profileDash);

  const profileSettings = ProfileSettings();
  pagesDiv.appendChild(profileSettings);

  profileSection.insertAdjacentElement("beforeend", innerFooter);
  container.appendChild(profileSection);

  const addListeners = () => {
    const liEdit = profileSection.querySelector("#edit-profile");
    const infoSect = profileSection.querySelector(".profile-info-container");
    const activitySect = profileSection.querySelector(
      ".profile-activity-section"
    );
    const profileSettings = profileSection.querySelector(
      ".profile-settings-section"
    );

    liEdit.addEventListener("click", () => {
      if (infoSect.classList.contains("inactive")) {
        infoSect.classList.remove("inactive");
        activitySect.classList.add("inactive");
        profileSettings.classList.add("inactive");
      }
    });

    const liActivity = profileSection.querySelector("#activity-profile");
    liActivity.addEventListener("click", () => {
      if (activitySect.classList.contains("inactive")) {
        activitySect.classList.remove("inactive");
        infoSect.classList.add("inactive");
        profileSettings.classList.add("inactive");
      }
    });

    const liSettings = profileSection.querySelector("#settings-profile");
    liSettings.addEventListener("click", () => {
      if (profileSettings.classList.contains("inactive")) {
        profileSettings.classList.remove("inactive");
        infoSect.classList.add("inactive");
        activitySect.classList.add("inactive");
      }
    });
  };

  addListeners();
  return container;
};
