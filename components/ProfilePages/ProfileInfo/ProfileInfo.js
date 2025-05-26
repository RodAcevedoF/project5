import Swal from "sweetalert2";
import "./ProfileInfo.css";

const ProfileInfo = (user, postAll) => {
  const sect = document.createElement("section");
  sect.classList.add("profile-info-container");
  sect.innerHTML = `
         <div>
            <p>Name: ${user.name}</p>
            <p>Nickname: ${user.nickname || "add a nick"}</p>
            <p>Birthdate: ${user.birth_date || "add your b-day"}</p>
            <p>Location: ${user.location || "add your location"}</p>
            <p>Hobbies: ${user.hobbies || "add your hobbies"}</p>
            <p>GitHub: ${user.github_url || "add your GitHub profile"}</p>
            <p>Website: ${user.website || "add your website"}</p>
            <p>About me: ${user.description || "tell us"}</p>
            <button type="button" class="edit-button">Edit</button>
          </div>
          <form id="profile-form">
                <label for="name-input">Name:</label>
                <input type="text" id="name-input" value="${user.name}" >
                <label for="nickname-input">Nickname:</label>
                <input type="text" id="nickname-input" value="${
                  user.nickname || ""
                }" >
                <label for="birthdate-input">Birthdate:</label>
                <input type="date" id="birthdate-input" value="${
                  user.birth_date || ""
                }" >
                <label for="location-input">Location:</label>
                <input type="text" id="location-input" value="${
                  user.location || ""
                }" >
                <label for="hobbies-input">Hobbies:</label> 
                <input type="text" id="hobbies-input" value="${
                  user.hobbies || ""
                }" >
                <label for="github-input">GitHub:</label>
                <input type="text" id="github-input" value="${
                  user.github_url || ""
                }" >
                <label for="website-input">Website:</label>
                <input type="text" id="website-input" value="${
                  user.website || ""
                }" >
                <label for="profile-image-input">Profile Image:</label>
                <input type="file" id="profile-image-input" accept="image/*" />
                <label for="description-input">About me:</label>
                <textarea id="description-input" >${
                  user.description || ""
                }</textarea>
                <button class="submit-profile" type="submit">Save Changes</button>
                <button class="cancel-edit-btn" type="button">Cancel</button>
            </form>`;

  const editButton = sect.querySelector(".edit-button");
  const submitButton = sect.querySelector(".submit-profile");
  const cancelButton = sect.querySelector(".cancel-edit-btn");
  const profileImageInput = sect.querySelector("#profile-image-input");
  const form = sect.querySelector("#profile-form");
  const infoDiv = sect.querySelector(".profile-info-container div");
  let selectedFile = null;

  editButton.addEventListener("click", () => {
    infoDiv.classList.add("inactive");
    form.classList.add("active");
  });

  cancelButton.addEventListener("click", () => {
    infoDiv.classList.remove("inactive");
    form.classList.remove("active");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedUser = {
      name: sect.querySelector("#name-input").value,
      nickname: sect.querySelector("#nickname-input").value,
      birth_date: sect.querySelector("#birthdate-input").value,
      location: sect.querySelector("#location-input").value,
      hobbies: sect.querySelector("#hobbies-input").value,
      description: sect.querySelector("#description-input").value
    };

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
