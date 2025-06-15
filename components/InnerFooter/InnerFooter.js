import "./InnerFooter.css";
import { PageBtn } from "..";
import { Todo } from "../../pages/ToDo/Todo";
import { Books } from "../../pages/Books/Books";
import { Videos } from "../../pages/VideoPage/Videos";
import { Home } from "../../pages/Home/Home";

const InnerFooter = () => {
  const footer = document.createElement("footer");
  footer.classList.add("todo-footer");
  footer.appendChild(
    PageBtn("home", "/icon/home.png", "home-footer-link", "Home")
  );
  footer.appendChild(
    PageBtn("todos", "/icon/todolist.png", "todo-footer-link", "To-do's list")
  );
  footer.appendChild(
    PageBtn(
      "videos",
      "/icon/videolist.png",
      "videos-footer-link",
      "Video's list"
    )
  );
  footer.appendChild(
    PageBtn("books", "/icon/booklist.png", "books-footer-link", "Book's list")
  );

  return footer;
};

export default InnerFooter;
