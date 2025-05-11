import "./ProfileInfo.css";

const ProfileInfo = (user, fn) => {
  const sect = document.createElement("section");
  sect.classList.add("profile-info-container");

  /*user: 
  name: "haster"
  nickname: null
  birth_date: null
  description: null
  email: "haster@rat.com"
  github_url: null
  hobbies: null
  id: 1
  location: null
  phone: null
  profile_image: nullwebsite: null
*/

  sect.innerHTML = `
         <div>
            <h2>Profile</h2>
            <p>Name: ${user.name}</p>
            <p>Nickname: ${user.nickname || "add a nick"}</p>
            <p>Birthdate: ${user.birth_date || "add your b-day"}</p>
            <p>Location: ${user.location || "add your location"}</p>
            <p>Hobbies: ${user.hobbies || "add your hobbies"}</p>
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

  const form = sect.querySelector("#profile-form");
  const infoDiv = sect.querySelector(".profile-info-container div");

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

    await fn(updatedUser);
    cancelButton.click();
  });

  return sect;
};

export default ProfileInfo;
