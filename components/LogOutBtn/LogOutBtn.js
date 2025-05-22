import "./LogOutbtn.css";
import { changePage } from "../../utils/changePage.js";
import { Landing } from "../../pages/Landing/Landing.js";
import { logoutUser } from "../../api/authApi.js";
import { setState } from "../../utils/state.js";
import { NavBar } from "../NavBar/NavBar.js";

export const LogOutBtn = () => {
  const button = document.createElement("button");
  button.type = "button";
  button.id = "logout-btn";
  button.classList.add("log-btn");
  button.textContent = "LOGOUT";

  button.addEventListener("click", () => {
    logoutUser();
    setState("isLoggedIn", false);
    NavBar();
    changePage(Landing, "landing");
  });

  return button;
};
