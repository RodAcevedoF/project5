// components/LogOutBtn.js
import { changePage } from "../../utils/changePage.js";
import { Landing } from "../../pages/Landing/Landing.js";
import { logoutUser } from "../../api/userApi.js";
import { isAuthenticated } from "../../utils/isAuthenticated.js";

export const LogOutBtn = () => {
  const button = document.createElement("button");
  button.type = "button";
  button.id = "logout-btn";
  button.classList.add("log-btn");

  const updateButtonText = () => {
    button.textContent = isAuthenticated() ? "LOGOUT" : "START";
  };

  updateButtonText();

  LogOutBtn.updateButtonText = updateButtonText;

  button.addEventListener("click", () => {
    if (isAuthenticated()) {
      logoutUser();
      changePage(Landing);
      updateButtonText();
    } else {
      const loginForm = document.querySelector(".landing-buttons");
      if (loginForm) {
        loginForm.classList.add("get");
        loginForm.classList.add("highlight");
        setTimeout(() => {
          loginForm.classList.remove("highlight");
        }, 1000);
      }
    }
  });

  return button;
};