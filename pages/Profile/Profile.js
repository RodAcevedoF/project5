import "./Profile.css";
import BackBtn from "../../components/BackBtn/BackBtn";
import { Home } from "../Home/Home";

export const Profile = () => {
  const container = document.querySelector("main");
  container.innerHTML = "";

  const profileSection = document.createElement("section");
  profileSection.classList.add("profile-section");
  profileSection.innerHTML = ``;

  profileSection.appendChild(BackBtn(Home));

  container.appendChild(profileSection);
  return container;
};
