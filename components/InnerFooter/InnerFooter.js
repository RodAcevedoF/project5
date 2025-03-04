import "./InnerFooter.css";
import PageBtn from "../PageBtn/PageBtn";
import { Todo } from "../../pages/ToDo/Todo";
import { Books } from "../../pages/Books/Books"; 
import { Videos } from "../../pages/VideoPage/Videos";
import { Home } from "../../pages/Home/Home";

const InnerFooter = () => {
    const footer = document.createElement("footer");
    footer.classList.add("todo-footer");
    footer.appendChild(PageBtn(Home, "../../public/icon/home.png", "home-footer-link", "home", "Home"));
    footer.appendChild(PageBtn(Todo, "../../public/icon/home.png", "todo-footer-link", "todo", "To-do's list"));
    footer.appendChild(PageBtn(Videos, "../../public/icon/home.png", "videos-footer-link", "videos", "Video's list"));
    footer.appendChild(PageBtn(Books, "../../public/icon/home.png", "books-footer-link", "books", "Book's list"));

    return footer;
}

export default InnerFooter;