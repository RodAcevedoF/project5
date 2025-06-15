import "./ProfileBtn.css";
import { navigate } from "../../utils/router";
const ProfileBtn = () => {
  const btn = document.createElement("button");
  btn.classList.add("profile-btn");
  btn.type = "button";
  const img = document.createElement("img");
  img.alt = "profile icon";
  const updateImg = () => {
    const storedImg = localStorage.getItem("profileImg") || "/icon/user.png";
    img.src = storedImg;
  };
  updateImg();
  btn.addEventListener("click", () => {
    navigate("profile");
  });
  btn.appendChild(img);
  return btn;
};

export default ProfileBtn;
