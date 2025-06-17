import { navigate } from "../../utils";
import "./PageBtn.css";

const PageBtn = (page, img, id, txt) => {
  const btn = document.createElement("button");
  btn.classList.add("page-btn");
  btn.id = id;
  btn.innerHTML = `<img src=${img} alt="${txt} icon">
                     <h5>${txt}<h5>`;
  btn.addEventListener("click", () => {
    navigate(page);
  });
  return btn;
};

export default PageBtn;
