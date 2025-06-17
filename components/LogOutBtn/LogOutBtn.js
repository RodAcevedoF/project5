import "./LogOutbtn.css";
import { logoutUser } from "../../api/authApi";
import { NavBar } from "../NavBar/NavBar";
import { showConfirm, showSuccess, navigate } from "../../utils";

export const LogOutBtn = () => {
  const button = document.createElement("button");
  button.type = "button";
  button.id = "logout-btn";
  button.classList.add("log-btn");
  button.textContent = "LOGOUT";

  button.addEventListener("click", async () => {
    const { isConfirmed } = await showConfirm({
      title: "Logout",
      text: "Are you sure you want to log out?",
      confirmText: "Yes, log out"
    });

    if (!isConfirmed) return;

    logoutUser();
    NavBar();
    await showSuccess("Logged out successfully!");
    navigate("/");
  });

  return button;
};
