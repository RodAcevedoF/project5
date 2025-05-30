import "./Profile.css";
import InnerFooter from "../../components/InnerFooter/InnerFooter";
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
  ProfileHeader
} from "../../components";
import { getDashboardData } from "../../api/dashboardApi";
import LoadComp from "../../components/LoadComp/LoadComp";
import { deleteUser as apiDeleteUser } from "../../api/userApi";
import { removeTokens } from "../../utils/authUtils"; // asegurate de tener esto
import { changePage } from "../../utils/changePage";
import { Landing } from "../Landing/Landing";
import Swal from "sweetalert2";

export const Profile = async () => {
  const container = document.querySelector("main");
  container.innerHTML = "";
  container.style.padding = "12em 0";

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
      await Swal.fire("Error", res.error, "error");
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
      await Swal.fire("Error", res.error, "error");
      return;
    }
    await Swal.fire(
      "Success",
      "Sensitive data updated successfully!",
      "success"
    );

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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action is permanent. You will lose your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it"
    });

    if (result.isConfirmed) {
      const res = await apiDeleteUser();

      if (res?.success) {
        Swal.fire("Deleted!", "Your account has been removed.", "success");

        removeTokens(); // remueve localStorage/sessionStorage/tokens
        localStorage.clear();
        sessionStorage.clear();

        // redirigir al landing
        changePage(Landing, "landing");
      } else {
        Swal.fire("Error", res?.error || "Could not delete account", "error");
      }
    }
  };

  const postImage = async (file) => {
    const res = await uploadProfileImage(file);
    if (res.error) {
      await Swal.fire("Error", res.error, "error");
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
      await Swal.fire("Success", "Profile updated successfully!", "success");
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
