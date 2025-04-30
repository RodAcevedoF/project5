import "./Profile.css";
import InnerFooter from "../../components/InnerFooter/InnerFooter";

export const Profile = () => {
  const container = document.querySelector("main");
  const profileSection = document.createElement("section");
  profileSection.classList.add("profile-section");
  const innerFooter = InnerFooter();
  const userName = localStorage.getItem("name");
  profileSection.innerHTML = `<h2>Welcome ${userName}</h2>
                              `;

  profileSection.insertAdjacentElement("beforeend", innerFooter);
  container.appendChild(profileSection);
  return container;
};
