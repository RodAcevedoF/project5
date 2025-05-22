import "./ProfileSettings.css";

const ProfileSettings = (userData, fn1, fn2) => {
  const sect = document.createElement("section");
  sect.className = "profile-settings-section";
  sect.classList.add("inactive");

  sect.innerHTML = `
    <h2>Settings</h2>
    <div>
      <div class="email-pass-div">
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Password:</strong> ********</p>
        <button type="button" class="btn-edit-sensitive">Edit</button>
      </div>
      <form id="email-pass-form" class="inactive">
        <label>
          Current password:
          <input type="password" id="current-password" placeholder="Current password"/>
        </label>
        <label>
          New e-mail:
          <input type="email" id="email-change" placeholder="myemail@email.com"/>
        </label>
        <label>
          New password:
          <input type="password" id="password-change" placeholder="At least 8 characters"/>
        </label>
        <label>
          Repeat new password:
          <input type="password" id="password-change-repeat" placeholder="At least 8 characters"/>
        </label>
        <button type="submit" class="btn-form-sensitive">Edit</button>
        <button type="button" class="btn-form-cancel">Cancel
        </button>
      </form>
      <div class="delete-acc-div">
        <p>Delete account</p>
        <button type="button" class="delete-user-btn">Delete</button>
      </div>
    </div>
  `;

  const editBtn = sect.querySelector(".btn-edit-sensitive");
  const submitBtn = sect.querySelector(".btn-form-sensitive");
  const cancelBtn = sect.querySelector(".btn-form-cancel");
  const deleteBtn = sect.querySelector(".delete-user-btn");
  const credentialsDiv = sect.querySelector(".email-pass-div");
  const credentialsForm = sect.querySelector("#email-pass-form");

  editBtn.addEventListener("click", () => {
    if (!credentialsDiv.classList.contains("inactive")) {
      credentialsDiv.classList.add("inactive");
      credentialsForm.classList.remove("inactive");
    }
  });

  cancelBtn.addEventListener("click", () => {
    if (!credentialsForm.classList.contains("inactive")) {
      credentialsForm.classList.add("inactive");
      credentialsDiv.classList.remove("inactive");
      credentialsForm.reset();
    }
  });

  deleteBtn.addEventListener("click", fn2);

  credentialsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const currentPassword = sect
      .querySelector("#current-password")
      .value.trim();
    const email = sect.querySelector("#email-change").value.trim();
    const newPassword = sect.querySelector("#password-change").value.trim();
    const repeatNewPassword = sect
      .querySelector("#password-change-repeat")
      .value.trim();

    // Validación de campos
    if (!currentPassword) {
      alert("Current password is required.");
      return;
    }

    if (newPassword && newPassword !== repeatNewPassword) {
      alert("New passwords do not match.");
      return;
    }

    if (!email && !newPassword) {
      alert("You must change at least the email or password.");
      return;
    }
    const payload = {};
    if (email) payload.email = email;
    if (newPassword) payload.password = newPassword;
    payload.currentPassword = currentPassword;

    await fn1(payload);
    cancelBtn.click();
  });

  return sect;
};

export default ProfileSettings;
