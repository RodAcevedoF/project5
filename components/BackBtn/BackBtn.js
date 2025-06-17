import "./BackBtn.css";
import { AnimBtn } from "..";
import { navigate } from "../../utils";

const BackBtn = (page) => {
  const btn = document.createElement("div");
  btn.classList.add("go-back-btn");
  const img = AnimBtn;
  const span = document.createElement("span");
  span.classList.add("go-back-text");
  span.innerText = "Go Back";
  btn.innerHTML = img;
  btn.appendChild(span);

  btn.addEventListener("click", () => {
    navigate(page);
  });

  return btn;
};

export default BackBtn;
