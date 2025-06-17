import "./Profile.css";
import {
  getProfile,
  updateProfile,
  updateCredentials,
  uploadProfileImage
} from "../../api/userApi";
import {
  ProfileInfo,
  ProfileActivity,
  ProfileSettings,
  ProfileHeader,
  LoadComp,
  InnerFooter
} from "../../components";
import { getDashboardData } from "../../api/dashboardApi";
import { deleteUser as apiDeleteUser } from "../../api/userApi";
import {
  removeTokens,
  setState,
  navigate,
  showConfirm,
  showError,
  showSuccess
} from "../../utils";

export const Profile = async () => {
  const container = document.querySelector("main");
  container.innerHTML = "";

  const loading = LoadComp();
  container.innerHTML = loading;

  const profileSection = document.createElement("section");
  profileSection.classList.add("profile-section");
  const innerFooter = InnerFooter();

  const { user } = await getProfile();

  const userData = await getDashboardData();

  const postData = async (updatedData) => {
    const cleanedData = Object.fromEntries(
      Object.entries(updatedData).filter(([_, value]) => value !== "")
    );
    const res = await updateProfile(cleanedData);
    if (res.error) {
      await showError(res.error);
      return false;
    }
    const refreshedUser = (await getProfile()).user;
    const newProfileInfo = ProfileInfo(refreshedUser, postAllProfileData);
    const infoSect = profileSection.querySelector(".profile-info-container");
    infoSect.replaceWith(newProfileInfo);
    return true;
  };

  const postPrivData = async (privData) => {
    const cleanedData = Object.fromEntries(
      Object.entries(privData).filter(([_, value]) => value !== "")
    );
    const res = await updateCredentials(cleanedData);
    if (res.error) {
      await showError(res.error);
      return;
    }
    await showSuccess("Sensitive data updated successfully!");

    const refreshedUser = (await getProfile()).user;
    const newProfileSettings = ProfileSettings(
      refreshedUser,
      postPrivData,
      deleteUser
    );
    newProfileSettings.classList.remove("inactive");
    const settingsSect = profileSection.querySelector(
      ".profile-settings-section"
    );
    settingsSect.replaceWith(newProfileSettings);
  };

  const deleteUser = async () => {
    const result = await showConfirm({
      title: "Are you sure?",
      text: "This action is permanent. You will lose your account.",
      confirmText: "Yes, delete it"
    });

    if (result.isConfirmed) {
      const res = await apiDeleteUser();

      if (res?.success) {
        await showSuccess("Your account has been removed.");
        removeTokens();
        setState("isLoggedIn", false);
        setState("currentUser", null);
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
      } else {
        await showError(res?.error || "Could not delete account");
      }
    }
  };

  const postImage = async (file) => {
    const res = await uploadProfileImage(file);
    if (res.error) {
      await showError(res.error);
      return false;
    }

    const refreshedUser = (await getProfile()).user;

    const newProfileInfo = ProfileInfo(refreshedUser, postAllProfileData);
    const infoSect = profileSection.querySelector(".profile-info-container");
    infoSect.replaceWith(newProfileInfo);

    const newProfileHeader = ProfileHeader(refreshedUser);
    const oldHeader = profileSection.querySelector(".profile-header");
    oldHeader.replaceWith(newProfileHeader);
    return true;
  };

  const postAllProfileData = async (data, file) => {
    let didUpdate = false;
    const hasDataChanges = Object.values(data).some((val) => val !== "");
    if (hasDataChanges) {
      const okData = await postData(data);
      if (okData) didUpdate = true;
    }
    if (file) {
      const okImage = await postImage(file);
      if (okImage) didUpdate = true;
    }
    if (didUpdate) {
      await showSuccess("Profile updated successfully!");
    }
  };

  const profileHeader = ProfileHeader(user);
  profileSection.appendChild(profileHeader);

  const pagesDiv = document.createElement("div");
  pagesDiv.classList.add("profile-pages-container");

  const profileInfo = ProfileInfo(user, postAllProfileData);
  pagesDiv.appendChild(profileInfo);
  profileSection.appendChild(pagesDiv);

  const profileDash = ProfileActivity(userData);
  pagesDiv.appendChild(profileDash);

  const profileSettings = ProfileSettings(user, postPrivData, deleteUser);
  pagesDiv.appendChild(profileSettings);

  profileSection.insertAdjacentElement("beforeend", innerFooter);

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

  container.innerHTML = "";
  container.style.padding = "0";
  container.appendChild(profileSection);

  return container;
};
