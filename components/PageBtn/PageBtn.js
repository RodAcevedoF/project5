import { changePage } from "../../utils/changePage";
import "./PageBtn.css";

const PageBtn = (PageComponent, img, id, page, txt) => {
    const btn = document.createElement("button");
    btn.classList.add("page-btn");
    btn.id = id;
    btn.innerHTML = `<img src=${img} alt="${txt} icon">
                     <h5>${txt}<h5>`;
    btn.addEventListener("click", () => {
        changePage(PageComponent, page);
    })
    return btn;
}

export default PageBtn;