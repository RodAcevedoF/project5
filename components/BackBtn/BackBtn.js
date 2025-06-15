import { changePage } from "../../utils/changePage";
import { AnimBtn } from "..";
import "./BackBtn.css";
import { getState } from "../../utils/state";
import { navigate } from "../../utils/router";

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
