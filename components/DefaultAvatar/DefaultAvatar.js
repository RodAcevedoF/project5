import "./DefaultAvatar.css";
import { getRandomColor } from "../../utils";

export const DefaultAvatar = (type, user) => {
  if (user.profile_image) {
    const img = document.createElement("img");
    img.src = user.profile_image;
    img.alt = "Avatar";
    img.classList.add(type === "header" ? "header-avatar" : "avatar");
    return img;
  }

  const span = document.createElement("span");
  span.textContent = user.name.charAt(0).toUpperCase();
  span.style.backgroundColor = getRandomColor();
  span.classList.add(
    type === "header" ? "default-header-avatar" : "default-avatar"
  );
  return span;
};
