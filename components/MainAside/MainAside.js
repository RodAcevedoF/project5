import "./MainAside.css";
import { getTodos } from "../../api/ToDoApi";
import { Calendar } from "../Calendar/Calendar";
import { TodoDisplay } from "../TodoDisplay/TodoDisplay";
import MainBtn from "../MainBtn/MainBtn";
import AsideBtn from "../AsideBtn/AsideBtn";

export const MainAside = () => {
  const aside = document.createElement("aside");
  aside.classList.add("main-aside");

  aside.innerHTML = `
    <div class="latest">
      <h3 id="toggle-latest">Latest tasks</h3>
      <ul id="latest-tasks" class="collapsible"></ul>
      ${MainBtn("button", "load-more-tasks", "main-btn", "Load more")}
    </div>
    <div class="deadline">
      <h3 id="toggle-deadlines">Next deadlines</h3>
      <ul id="upcoming-deadlines" class="collapsible"></ul>
    </div>
    <div class="calendar">
      <h3 id="toggle-calendar">Calendar</h3>
      <div id="calendar-container" class="collapsible"></div>
    </div>
  `;
  const asideButton = AsideBtn();
  aside.appendChild(asideButton);
  const latestBtn = aside.querySelector("#toggle-latest");
  const deadlineBtn = aside.querySelector("#toggle-deadlines");
  const calendarBtn = aside.querySelector("#toggle-calendar");
  const loadMoreButton = aside.querySelector("#load-more-tasks");

  const hideAllSections = () => {
    aside.querySelector("#latest-tasks").classList.remove("visible");
    loadMoreButton.classList.remove("visible");
    aside.querySelector("#upcoming-deadlines").classList.remove("visible");
    aside.querySelector("#calendar-container").classList.remove("visible");
  };

  latestBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const latestUl = aside.querySelector("#latest-tasks");
    const isVisible = latestUl.classList.contains("visible");
    hideAllSections();
    if (!isVisible) {
      latestUl.classList.add("visible");
      loadMoreButton.classList.add("visible");
    }
  });

  deadlineBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const deadlineUl = aside.querySelector("#upcoming-deadlines");
    const isVisible = deadlineUl.classList.contains("visible");
    hideAllSections();
    if (!isVisible) {
      deadlineUl.classList.add("visible");
    }
  });

  calendarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const calendarCont = aside.querySelector("#calendar-container");
    const isVisible = calendarCont.classList.contains("visible");
    hideAllSections();
    if (!isVisible) {
      calendarCont.classList.add("visible");
    }
  });

  document.addEventListener("click", (ev) => {
    const calendarCont = aside.querySelector("#calendar-container");
    if (!calendarCont.contains(ev.target) && !calendarBtn.contains(ev.target)) {
      calendarCont.classList.remove("visible");
    }
  });

  loadTodos(5, 0);
  loadUpcomingDeadlines();

  loadMoreButton.addEventListener("click", async (e) => {
    e.stopPropagation();
    const latestUl = aside.querySelector("#latest-tasks");
    const currentCount = latestUl.querySelectorAll("li.todo-item").length;
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
        latestUl.appendChild(todoItem);
      });
    } else {
      loadMoreButton.textContent = "That's it";
      loadMoreButton.disabled = true;
    }
  });

  const calendarComp = Calendar();
  const calendarContainer = aside.querySelector("#calendar-container");
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
      todoItem.addEventListener("click", () => {
        const container = document.querySelector(".latest-container");
        container.innerHTML = "";
        container.appendChild(TodoDisplay(todo));
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
      todoItem.textContent = `${todo.title} - ${new Date(
        todo.deadline
      ).toLocaleDateString()}`;
      todoItem.addEventListener("click", () => {
        const container = document.querySelector(".latest-container");
        container.innerHTML = "";
        container.appendChild(TodoDisplay(todo));
      });
      deadlineUl.appendChild(todoItem);
    });
  } else {
    deadlineUl.textContent = "Oops...we are having some issues";
  }
};
