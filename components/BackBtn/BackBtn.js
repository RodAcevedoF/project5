import { changePage } from "../../utils/changePage";
import "./BackBtn.css";

const BackBtn = (PageComponent, page) => {
  const btn = document.createElement("button");
  btn.classList.add("go-back-btn");
  const img = document.createElement("img");
  img.src = "/icon/goback.png";
  img.alt = "back button";
  const span = document.createElement("span");
  span.innerText = "Go Back"
  btn.appendChild(img);
  btn.appendChild(span);

  btn.addEventListener("click",() => {
    changePage(PageComponent, page);
  });

  return btn;
};

export default BackBtn;
