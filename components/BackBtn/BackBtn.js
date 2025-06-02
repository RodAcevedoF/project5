import { changePage } from "../../utils/changePage";
import { AnimBtn } from "./AnimBtn";
import "./BackBtn.css";

const BackBtn = (PageComponent, page) => {
  const btn = document.createElement("div");
  btn.classList.add("go-back-btn");
  const img = AnimBtn;
  const span = document.createElement("span");
  span.classList.add("go-back-text");
  span.innerText = "Go Back";
  btn.innerHTML = img;
  btn.appendChild(span);

  btn.addEventListener("click", () => {
    changePage(PageComponent, page);
  });

  return btn;
};

export default BackBtn;
