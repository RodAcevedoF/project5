import "./MainAside.css";
import { MainBtn } from "..";

export const MainAside = ({ containers, openTodoDisplay, loadData }) => {
  const { latestTasks, upcomingDeadlines, calendar } = containers;

  const aside = document.createElement("aside");
  aside.classList.add("main-aside");

  aside.innerHTML = `
    <div class="latest">
      <h3 id="toggle-latest">Latest tasks</h3>
    </div>
    <div class="deadline">
      <h3 id="toggle-deadlines">Next deadlines</h3>
    </div>
    <div class="calendar">
      <h3 id="toggle-calendar">Calendar</h3>
    </div>`;

  const latestDiv = aside.querySelector(".latest");
  const deadlineDiv = aside.querySelector(".deadline");
  const calendarDiv = aside.querySelector(".calendar");

  latestDiv.appendChild(latestTasks);
  deadlineDiv.appendChild(upcomingDeadlines);
  calendarDiv.appendChild(calendar);

  const loadMoreButton = MainBtn(
    "button",
    "load-more-tasks",
    "main-btn",
    "Load more",
    true
  );
  latestDiv.appendChild(loadMoreButton);

  const hideAllSections = () => {
    [latestTasks, upcomingDeadlines, calendar].forEach((el) =>
      el.classList.remove("visible")
    );
    loadMoreButton.classList.remove("visible");
  };

  const setupToggle = (btnId, section, extra = null) => {
    aside.querySelector(btnId).addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = section.classList.contains("visible");
      hideAllSections();
      if (!isVisible) {
        section.classList.add("visible");
        if (extra) extra.classList.add("visible");
      }
    });
  };

  setupToggle("#toggle-latest", latestTasks, loadMoreButton);
  setupToggle("#toggle-deadlines", upcomingDeadlines);
  setupToggle("#toggle-calendar", calendar);

  loadMoreButton.addEventListener("click", async (e) => {
    e.stopPropagation();
    const hasMore = await loadData(false); // modo append
    if (!hasMore) {
      loadMoreButton.innerText = "That's all!";
      loadMoreButton.disabled = true;
    }
  });

  document.addEventListener("click", (ev) => {
    if (!calendar.contains(ev.target) && !calendarDiv.contains(ev.target)) {
      calendar.classList.remove("visible");
    }
    if (
      !upcomingDeadlines.contains(ev.target) &&
      !deadlineDiv.contains(ev.target)
    ) {
      upcomingDeadlines.classList.remove("visible");
    }
  });

  aside.calendarUpdate = () => calendar.updateCalendar?.();
  aside.calendar = calendar;

  return aside;
};
