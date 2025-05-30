import "./ProfileForm.css";

const ProfileForm = (user) => {
  const div = document.createElement("div");
  div.classList.add("edit-form-container");

  div.innerHTML = `
              <h4 class="form-heading">Update your info</h4>
              <form id="profile-form">
                <label for="name-input">Name:</label>
                <input type="text" id="name-input" class="edit-form-input" value="${
                  user.name
                }" >
                <label for="nickname-input">Nickname:</label>
                <input type="text" id="nickname-input" class="edit-form-input" value="${
                  user.nickname || ""
                }" >
                <label for="birthdate-input">Birthdate:</label>
                <input type="date" id="birthdate-input" class="edit-form-input" value="${
                  user.birth_date || ""
                }" >
                <label for="location-input">Location:</label>
                <input type="text" id="location-input" class="edit-form-input" value="${
                  user.location || ""
                }" >
                <label for="hobbies-input">Hobbies:</label> 
                <input type="text" id="hobbies-input" class="edit-form-input" value="${
                  user.hobbies || ""
                }" >
                <label for="github-input">GitHub:</label>
                <input type="text" id="github-input" class="edit-form-input" value="${
                  user.github_url || ""
                }" >
                <label for="website-input">Website:</label>
                <input type="text" id="website-input" class="edit-form-input" value="${
                  user.website || ""
                }" >
                <label for="linkedin-input">Linkedin:</label>
                <input type="text" id="linkedin-input" class="edit-form-input" value="${
                  user.linkedin_url || ""
                }" >
                <label for="instagram-input">Instagram:</label>
                <input type="text" id="instagram-input" class="edit-form-input" value="${
                  user.instagram || ""
                }" >
                <label for="profile-image-input">Profile Image:</label>
                <input type="file" id="profile-image-input" class="edit-form-input" accept="image/*" />
                <label for="description-input">About me:</label>
                <textarea id="description-input" class="edit-form-input" >${
                  user.description || ""
                }</textarea>
                <div class="form-profile-buttons"></div>
              </form>
  `;

  return div;
};

export default ProfileForm;
