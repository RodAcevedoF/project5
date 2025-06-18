import "./ProfileSettings.css";
import { CardBtn, PasswordEye } from "../../../../components";
import {
  showWarning,
  showError,
  showInfo,
  validatePasswordsColor
} from "../../../../utils";

const ProfileSettings = (userData, fn1, fn2) => {
  const sect = document.createElement("section");
  sect.className = "profile-settings-section";
  sect.classList.add("inactive");

  const editSensitiveBtn = CardBtn(
    "Edit",
    "edit-sensitive",
    "/icon/editicon.png"
  );
  const submitSensitiveBtn = CardBtn(
    "Submit",
    "submit-sensitive",
    "/icon/submiticon.png",
    "submit"
  );
  const cancelSensitiveBtn = CardBtn(
    "Cancel",
    "cancel-sensitive",
    "/icon/close.png"
  );
  const deleteSensitiveBtn = CardBtn(
    "Delete",
    "delete-sensitive",
    "/icon/deleteicon.png"
  );

  sect.innerHTML = `
  <div class="profile-settings-body">
    <h2>Settings</h2>
    <div class="email-pass-body">
      <div class="email-pass-div">
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Password:</strong> ********</p>
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
        <div class="sensitive-form-buttons"></div>
      </form>
      <div class="delete-acc-div">
        <p>Delete account</p>
      </div>
    </div>
  </div>
  `;

  sect.querySelector(".email-pass-div").appendChild(editSensitiveBtn);
  sect.querySelector(".sensitive-form-buttons").appendChild(submitSensitiveBtn);
  sect.querySelector(".sensitive-form-buttons").appendChild(cancelSensitiveBtn);
  sect.querySelector(".delete-acc-div").appendChild(deleteSensitiveBtn);

  const editBtn = sect.querySelector(".edit-sensitive-button");
  const submitBtn = sect.querySelector(".submit-sensitive-button");
  const cancelBtn = sect.querySelector(".cancel-sensitive-button");
  const deleteBtn = sect.querySelector(".delete-sensitive-button");
  const credentialsDiv = sect.querySelector(".email-pass-div");
  const credentialsForm = sect.querySelector("#email-pass-form");
  const passInput = sect.querySelector("#password-change");
  const repeatPassInput = sect.querySelector("#password-change-repeat");

  const eyePass = PasswordEye(passInput, "password");
  passInput.insertAdjacentElement("afterend", eyePass);

  const repeatEyePass = PasswordEye(repeatPassInput, "repeat-password");
  repeatPassInput.insertAdjacentElement("afterend", repeatEyePass);

  passInput.addEventListener("input", () =>
    validatePasswordsColor(passInput, repeatPassInput)
  );
  repeatPassInput.addEventListener("input", () =>
    validatePasswordsColor(passInput, repeatPassInput)
  );

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

    if (!currentPassword) {
      await showWarning("Current password is required.");
      return;
    }

    if (newPassword && newPassword !== repeatNewPassword) {
      await showError("New passwords do not match.");
      return;
    }

    if (!email && !newPassword) {
      await showInfo("You must change at least the email or password.");
      return;
    }

    const payload = {};
    if (email) payload.email = email;
    if (newPassword) payload.password = newPassword;
    payload.currentPassword = currentPassword;

    await fn1(payload);
  });

  return sect;
};

export default ProfileSettings;
