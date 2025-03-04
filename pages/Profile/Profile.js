import "./Profile.css";
import BackBtn from "../../components/BackBtn/BackBtn";
import { Home } from "../Home/Home";

export const Profile = () => {
  const container = document.querySelector("main");
 
  const profileSection = document.createElement("section");
  profileSection.classList.add("profile-section");
  const userName = localStorage.getItem("name");
  profileSection.innerHTML = `<h2>Welcome ${userName}</h2>
                              `;

  profileSection.appendChild(BackBtn(Home, "home"));

  container.appendChild(profileSection);
  return container;
};
