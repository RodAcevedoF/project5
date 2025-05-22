import "./Profile.css";
import InnerFooter from "../../components/InnerFooter/InnerFooter";
import { ProfileHeader } from "../../components/ProfileHeader/ProfileHeader";
import {
  getProfile,
  updateProfile,
  updateCredentials
} from "../../api/userApi";
import ProfileInfo from "../../components/ProfilePages/ProfileInfo/ProfileInfo";
import profileActivity from "../../components/ProfilePages/ProfileActivity/ProfileActivity";
import ProfileSettings from "../../components/ProfilePages/ProfileSettings/ProfileSettings";
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
  container.style.padding = "10em 0";

  const loading = LoadComp();
  container.innerHTML = loading;

  const profileSection = document.createElement("section");
  profileSection.classList.add("profile-section");
  const innerFooter = InnerFooter();

  const { user } = await getProfile();
  const userData = await getDashboardData();
  console.log("Dashboard data: ", userData);

  const postData = async (updatedData) => {
    const cleanedData = Object.fromEntries(
      Object.entries(updatedData).filter(([_, value]) => value !== "")
    );
    const res = await updateProfile(cleanedData);
    if (res.error) {
      await Swal.fire("Error", res.error, "error");
      return;
    }
    await Swal.fire("Success", "Profile updated successfully!", "success");
    const refreshedUser = (await getProfile()).user;
    const newProfileInfo = ProfileInfo(refreshedUser, postData);
    const infoSect = profileSection.querySelector(".profile-info-container");
    infoSect.replaceWith(newProfileInfo);
  };

  const postPrivData = async (privData) => {
    const cleanedData = Object.fromEntries(
      Object.entries(privData).filter(([_, value]) => value !== "")
    );
    const res = await updateCredentials(cleanedData); // <-- este método debe estar definido en userApi.js
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

  const profileHeader = ProfileHeader(user);
  profileSection.appendChild(profileHeader);

  const pagesDiv = document.createElement("div");
  pagesDiv.classList.add("profile-pages-container");

  const profileInfo = ProfileInfo(user, postData);
  pagesDiv.appendChild(profileInfo);
  profileSection.appendChild(pagesDiv);

  const profileDash = profileActivity(userData);
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
