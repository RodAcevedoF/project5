// Calendar.js
import "./Calendar.css";
import { getTodos } from "../../api/ToDoApi";
import { TodoDisplay } from "../TodoDisplay/TodoDisplay";

export const Calendar = () => {
  const container = document.createElement("div");
  container.classList.add("simple-calendar");

  let currentDate = new Date();

  const render = async () => {    const result = await getTodos(100, 0);
    let tasks = [];
    if (result.success) {
      tasks = result.data.filter((task) => task.deadline && task.priority);
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); 

    const eventsMap = {};
    tasks.forEach((task) => {
      const d = new Date(task.deadline);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!eventsMap[day]) {
          eventsMap[day] = { high: [], medium: [], low: [] };
        }
        if (task.priority === "high") {
          eventsMap[day].high.push(task);
        } else if (task.priority === "medium") {
          eventsMap[day].medium.push(task);
        } else if (task.priority === "low") {
          eventsMap[day].low.push(task);
        }
      }
    });

    container.innerHTML = "";

    const header = document.createElement("div");
    header.classList.add("calendar-header");

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "<";
    prevBtn.classList.add("nav-btn");
    prevBtn.addEventListener("click", () => {
      currentDate = new Date(year, month - 1, 1);
      render();
    });

    const nextBtn = document.createElement("button");
    nextBtn.textContent = ">";
    nextBtn.classList.add("nav-btn");
    nextBtn.addEventListener("click", () => {
      currentDate = new Date(year, month + 1, 1);
      render();
    });

    const monthLabel = document.createElement("span");
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    monthLabel.textContent = `${monthNames[month]} ${year}`;
    monthLabel.classList.add("month-label");

    header.appendChild(prevBtn);
    header.appendChild(monthLabel);
    header.appendChild(nextBtn);
    container.appendChild(header);

    const table = document.createElement("table");
    table.classList.add("calendar-table");

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    daysOfWeek.forEach((day) => {
      const th = document.createElement("th");
      th.textContent = day;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const firstDayOfMonth = new Date(year, month, 1);
    let startIndex = firstDayOfMonth.getDay() - 1;
    if (firstDayOfMonth.getDay() === 0) {
      startIndex = 6;
    }
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const tbody = document.createElement("tbody");
    let row = document.createElement("tr");

    // Celdas vacías hasta el inicio del mes
    for (let i = 0; i < startIndex; i++) {
      const cell = document.createElement("td");
      row.appendChild(cell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      if (row.children.length === 7) {
        tbody.appendChild(row);
        row = document.createElement("tr");
      }
      const cell = document.createElement("td");
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day-number");
      dayDiv.textContent = day;
      cell.appendChild(dayDiv);

      if (eventsMap[day]) {
        const dotsDiv = document.createElement("div");
        dotsDiv.classList.add("dots");

        if (eventsMap[day].high.length > 0) {
          const dotHigh = document.createElement("span");
          dotHigh.classList.add("dot", "high");
          dotHigh.title = eventsMap[day].high.map((t) => t.title).join(", ");
          dotHigh.addEventListener("click", () => {
            const container = document.querySelector(".latest-container");
            container.innerHTML = "";
            container.appendChild(TodoDisplay(eventsMap[day].high[0]));
          });
          dotsDiv.appendChild(dotHigh);
        }
        if (eventsMap[day].medium.length > 0) {
          const dotMed = document.createElement("span");
          dotMed.classList.add("dot", "medium");
          dotMed.title = eventsMap[day].medium.map((t) => t.title).join(", ");
          dotMed.addEventListener("click", () => {
            const container = document.querySelector(".latest-container");
            container.innerHTML = "";
            container.appendChild(TodoDisplay(eventsMap[day].medium[0]));
          });
          dotsDiv.appendChild(dotMed);
        }
        if (eventsMap[day].low.length > 0) {
          const dotLow = document.createElement("span");
          dotLow.classList.add("dot", "low");
          dotLow.title = eventsMap[day].low.map((t) => t.title).join(", ");
          dotLow.addEventListener("click", () => {
            const container = document.querySelector(".latest-container");
            container.innerHTML = "";
            container.appendChild(TodoDisplay(eventsMap[day].low[0]));
          });
          dotsDiv.appendChild(dotLow);
        }
        cell.appendChild(dotsDiv);
      }
      row.appendChild(cell);
    }

    while (row.children.length < 7) {
      const cell = document.createElement("td");
      row.appendChild(cell);
    }
    tbody.appendChild(row);
    table.appendChild(tbody);

    container.appendChild(table);
  };

  render();

  container.updateCalendar = render;

  return container;
};
