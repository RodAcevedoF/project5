import "./SavedList.css";
import { getBooks } from "../../api/bookApi";
import { ListElement } from "..";
const SavedList = () => {
  const ul = document.createElement("ul");
  ul.classList.add("saved-list");
  ul.setAttribute("role", "list");
  setTimeout(async () => {
    const books = await getBooks();
    books.forEach((book) => {
      let elem = ListElement(book);
      ul.appendChild(elem);
    });
  });

  return ul;
};

export default SavedList;
