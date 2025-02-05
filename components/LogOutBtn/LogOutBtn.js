import "./LogOutbtn.css";
import { changePage } from "../../utils/changePage.js";
import { Landing } from "../../pages/Landing/Landing.js";
import { logoutUser } from "../../api/userApi.js";
import { isAuthenticated } from "../../utils/isAuthenticated.js";

export const LogOutBtn = () => {
  const button = document.createElement("button");
  button.type = "button";
  button.id = "logout-btn";
  button.classList.add("log-btn");
  button.textContent = "LOGOUT"

  button.addEventListener("click", () => {
    if (isAuthenticated()) {
      logoutUser();
      changePage(Landing);
    }
  });

  return button;
};