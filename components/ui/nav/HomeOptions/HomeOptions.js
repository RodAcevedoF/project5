import "./HomeOptions.css";

const HomeOptions = () => {
  const div = document.createElement("div");
  div.classList.add("options-caroussel-div");
  div.innerHTML = `
    <div class="pages-links">
  <ul class="links-ul-list">
    <li class="links-pages-item">
      <button class="links-pages-link">
        <img class="links-pages-icon" src="/images/todolist.png" alt="to-do list icon"/>
        <span class="links-pages-text">To-do List</span>
      </button>
    </li>
    <li class="links-pages-item"">
      <button class="links-pages-link">
        <img class="links-pages-icon" src="/images/booklist.png" alt="book list icon"/>
        <span class="links-pages-text">Book's List</span>
      </button>
    </li>
    <li class="links-pages-item"">
      <button class="links-pages-link">
        <img class="links-pages-icon" src="/images/videolist.png" alt="video list icon"/>
        <span class="links-pages-text">Video's List</span>
      </button>
    </li>
  </ul>
</div>
 `;

  return div;
};

export default HomeOptions;
