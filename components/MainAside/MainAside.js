import "./MainAside.css";
import { getTodos } from "../../api/ToDoApi";
import { Calendar } from "../Calendar/Calendar";
import { TodoDisplay } from "../TodoDisplay/TodoDisplay";
import MainBtn from "../MainBtn/MainBtn";
import { getState } from "../../utils/state";

export const MainAside = () => {
  const aside = document.createElement("aside");
  aside.classList.add("main-aside");

  aside.innerHTML = `
    <div class='latest'>
      <h3 id='toggle-latest'>Latest tasks</h3>
      <ul id='latest-tasks' class='collapsible'></ul>
      ${MainBtn("button", "load-more-tasks", "main-btn", "Load more")}
    </div>
    <div class='deadline'>
      <h3 id='toggle-deadlines'>Next deadlines</h3>
      <ul id='upcoming-deadlines' class='collapsible'></ul>
    </div>
    <div class='calendar'>
      <h3 id='toggle-calendar'>Calendar</h3>
      <div id='calendar-container' class='collapsible'></div>
    </div>`;

  const latestBtn = aside.querySelector("#toggle-latest");
  const deadlineBtn = aside.querySelector("#toggle-deadlines");
  const calendarBtn = aside.querySelector("#toggle-calendar");
  const loadMoreButton = aside.querySelector("#load-more-tasks");
  const latestTasks = aside.querySelector("#latest-tasks");
  const upcomingDeadlines = aside.querySelector("#upcoming-deadlines");
  const calendarContainer = aside.querySelector("#calendar-container");

  const hideAllSections = () => {
    aside
      .querySelectorAll(".collapsible")
      .forEach((section) => section.classList.remove("visible"));
    loadMoreButton.classList.remove("visible");
  };

  latestBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isVisible = latestTasks.classList.contains("visible");
    hideAllSections();
    if (!isVisible) {
      latestTasks.classList.add("visible");
      loadMoreButton.classList.add("visible");
    }
  });

  deadlineBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isVisible = upcomingDeadlines.classList.contains("visible");
    hideAllSections();
    if (!isVisible) {
      upcomingDeadlines.classList.add("visible");
    }
  });

  calendarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isVisible = calendarContainer.classList.contains("visible");
    hideAllSections();
    if (!isVisible) {
      calendarContainer.classList.add("visible");
    }
  });

  const loadMoreTodos = async () => {
    const currentCount = latestTasks.querySelectorAll("li.todo-item").length;
    const result = await getTodos(5, currentCount);
    if (result.success && result.data.length > 0) {
      result.data.forEach((todo) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");
        todoItem.textContent = todo.title;
        todoItem.addEventListener("click", () => {
          const container = document.querySelector(".latest-container");
          container.innerHTML = "";
          container.appendChild(TodoDisplay(todo));
        });
        latestTasks.appendChild(todoItem);
      });
    } else {
      loadMoreButton.textContent = "That's it";
      loadMoreButton.disabled = true;
    }
  };

  loadMoreButton.addEventListener("click", (e) => {
    e.stopPropagation();
    loadMoreTodos();
  });

  document.addEventListener("click", (ev) => {
    if (
      !calendarContainer.contains(ev.target) &&
      !calendarBtn.contains(ev.target)
    ) {
      calendarContainer.classList.remove("visible");
    }
  });

  if (window.innerWidth < 792) {
    document.addEventListener("click", (ev) => {
      const asideBtn = document.querySelector(".aside-btn");
      const currentPage = getState("currentPage");
      if (currentPage !== "todo") return;
      if (!aside.contains(ev.target) && !asideBtn.contains(ev.target)) {
        document
          .querySelectorAll(".collapsible")
          .forEach((elem) => elem.classList.remove("visible"));
        loadMoreButton.classList.remove("visible");
        aside.classList.remove("visible");
        document
          .querySelectorAll(".open-close span")
          .forEach((span) => span.classList.remove("closing"));
      }
    });
  }

  loadTodos(5, 0);
  loadUpcomingDeadlines();

  const calendarComp = Calendar();
  calendarContainer.appendChild(calendarComp);
  aside.calendarUpdate = calendarComp.updateCalendar;

  return aside;
};

export const loadTodos = async (limit = 5, offset = 0) => {
  const result = await getTodos(limit, offset);
  const latestUl = document.querySelector("#latest-tasks");
  if (result.success) {
    if (offset === 0) {
      latestUl.innerHTML = "";
    }
    result.data.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.classList.add("todo-item");
      todoItem.textContent = todo.title;
      const img = document.createElement("img");
      img.src = "/icon/checked.png";
      img.classList.add("todo-checked");
      todoItem.append(img);
      todo.checked
        ? img.classList.add("visible")
        : img.classList.remove("visible");
      todoItem.addEventListener("click", () => {
        const container = document.querySelector(".latest-container");
        container.innerHTML = "";
        container.appendChild(TodoDisplay(todo));
        document
          .querySelectorAll(".collapsible")
          .forEach((elem) => elem.classList.remove("visible"));
        document.querySelector("#load-more-tasks").classList.remove("visible");
        if (window.innerWidth < 792) {
          document.querySelector(".main-aside").classList.remove("visible");
          document
            .querySelectorAll(".open-close span")
            .forEach((span) => span.classList.remove("closing"));
        }
      });
      latestUl.appendChild(todoItem);
    });
  } else {
    latestUl.textContent = "Oops...we are having some issues";
  }
};

export const loadUpcomingDeadlines = async () => {
  const result = await getTodos(100, 0);
  const deadlineUl = document.querySelector("#upcoming-deadlines");
  if (result.success) {
    deadlineUl.innerHTML = "";
    const sortedTodos = result.data
      .filter((todo) => todo.deadline)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 3);
    sortedTodos.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.classList.add("todo-item");
      todoItem.innerHTML = `<p>${todo.title}</p>
                            <p>${new Date(
                              todo.deadline
                            ).toLocaleDateString()}</p>`;
      todoItem.addEventListener("click", () => {
        const container = document.querySelector(".latest-container");
        container.innerHTML = "";
        container.appendChild(TodoDisplay(todo));
        document
          .querySelectorAll(".collapsible")
          .forEach((elem) => elem.classList.remove("visible"));
        document.querySelector("#load-more-tasks").classList.remove("visible");
        if (window.innerWidth < 792) {
          document.querySelector(".main-aside").classList.remove("visible");
          document
            .querySelectorAll(".open-close span")
            .forEach((span) => span.classList.remove("closing"));
        }
      });
      deadlineUl.appendChild(todoItem);
    });
  } else {
    deadlineUl.textContent = "Oops...we are having some issues";
  }
};
