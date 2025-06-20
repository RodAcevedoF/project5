import "./ProfileInfo.css";
import {
  CardBtn,
  ProfileContact,
  ProfileForm,
  DefaultAvatar
} from "../../../../components";
import {
  normalizeUrl,
  displayNick,
  formatZuluToLocal,
  formatZuluToLocalDateOnly
} from "../../../../utils";

const ProfileInfo = (user, postAll) => {
  const sect = document.createElement("section");
  sect.classList.add("profile-info-container");

  const nickname = displayNick(user.nickname);

  const editProfileBtn = CardBtn("Edit", "edit-profile", "/icon/editicon.png");
  const submitProfileBtn = CardBtn(
    "Submit",
    "submit-profile",
    "/icon/submiticon.png",
    "submit"
  );
  const cancelEditBtn = CardBtn("Cancel", "cancel-edit", "/icon/close.png");
  const profileContact = ProfileContact(user);
  const profileForm = ProfileForm(user);
  const avatar = DefaultAvatar("info", user);
  const formattedBDay =
    formatZuluToLocalDateOnly(user.birth_date) || "add your b-day";
  sect.innerHTML = `
        <div class="profile-info-body">
         <aside class="aside-profile">
          <div class="picture-name">
           <div class="pfp-div"></div>
            <h2>${user.name}</h2>
            <p>${nickname}</p>
            </div>
         </aside>
         <ul class="profile-plain-info">
            <li>
              <img src="icon/emailprofile.svg" alt="Email Icon" class="profile-info-icons" />
              <p>Email: ${user.email}</p>
            </li>
            <li>
              <img src="icon/birthdateprofile.svg" alt="Birthdate Icon" class="profile-info-icons" />
              <p>Birthdate: ${formattedBDay}</p>
            </li>
            <li>
              <img src="icon/locationprofile.svg" alt="Location Icon" class="profile-info-icons" />
              <p>Location: ${user.location || "add your location"}</p>
            </li>
            <li>
              <img src="icon/hobbiesprofile.svg" alt="Hobbies Icon" class="profile-info-icons" />
              <p>Hobbies: ${user.hobbies || "add your hobbies"}</p>
            </li>
            <li>
              <img src="icon/aboutmeprofile.svg" alt="Description Icon" class="profile-info-icons" />
              <p>About me: ${user.description || "tell us"}</p>
            </li>
            <li class="edit-profile-li" ></li>
          </ul>
          </div>`;
  sect.appendChild(profileForm);
  sect.querySelector(".edit-profile-li").appendChild(editProfileBtn);
  sect.querySelector(".form-profile-buttons").appendChild(submitProfileBtn);
  sect.querySelector(".form-profile-buttons").appendChild(cancelEditBtn);
  sect.querySelector(".aside-profile").appendChild(profileContact);
  sect.querySelector(".pfp-div").appendChild(avatar);

  const editButton = sect.querySelector(".edit-profile-button");
  const submitButton = sect.querySelector(".submit-profile-button");
  const cancelButton = sect.querySelector(".cancel-edit-button");
  const profileImageInput = sect.querySelector("#profile-image-input");
  const formContainer = sect.querySelector(".edit-form-container");
  const form = sect.querySelector("#profile-form");
  const infoDiv = sect.querySelector(".profile-info-body");
  let selectedFile = null;

  editButton.addEventListener("click", () => {
    infoDiv.classList.add("inactive");
    formContainer.classList.add("active");
  });

  cancelButton.addEventListener("click", () => {
    infoDiv.classList.remove("inactive");
    formContainer.classList.remove("active");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedUser = {
      name: sect.querySelector("#name-input").value.trim(),
      nickname: sect.querySelector("#nickname-input").value.trim(),
      birth_date: sect.querySelector("#birthdate-input").value,
      location: sect.querySelector("#location-input").value.trim(),
      hobbies: sect.querySelector("#hobbies-input").value,
      github_url: normalizeUrl(sect.querySelector("#github-input").value),
      website: normalizeUrl(sect.querySelector("#website-input").value),
      linkedin_url: normalizeUrl(sect.querySelector("#linkedin-input").value),
      instagram_url: normalizeUrl(sect.querySelector("#instagram-input").value),
      description: sect.querySelector("#description-input").value
    };
    console.log(updatedUser);
    await postAll(updatedUser, selectedFile);
    selectedFile = null;
    cancelButton.click();
  });

  profileImageInput.addEventListener("change", (e) => {
    selectedFile = e.target.files[0] || null;
  });

  return sect;
};

export default ProfileInfo;
