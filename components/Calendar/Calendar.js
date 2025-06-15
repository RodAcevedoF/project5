import "./Calendar.css";

export const Calendar = ({ tasks = [], onTaskClick = () => {} }) => {
  const container = document.createElement("div");
  container.classList.add("simple-calendar");

  let currentDate = new Date();
  let currentTasks = tasks;

  const render = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const eventsMap = {};
    currentTasks.forEach((task) => {
      const d = new Date(task.deadline);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!eventsMap[day]) {
          eventsMap[day] = [];
        }
        eventsMap[day].push(task);
      }
    });

    container.innerHTML = "";

    const header = document.createElement("div");
    header.classList.add("calendar-header");

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "<";
    prevBtn.classList.add("nav-btn");
    prevBtn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      currentDate = new Date(year, month - 1, 1);
      render();
    });

    const nextBtn = document.createElement("button");
    nextBtn.textContent = ">";
    nextBtn.classList.add("nav-btn");
    nextBtn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      currentDate = new Date(year, month + 1, 1);
      render();
    });

    const monthLabel = document.createElement("span");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    monthLabel.textContent = `${monthNames[month]} ${year}`;
    monthLabel.classList.add("month-label");

    header.appendChild(prevBtn);
    header.appendChild(monthLabel);
    header.appendChild(nextBtn);
    container.appendChild(header);

    const table = document.createElement("table");
    table.classList.add("calendar-table");

    const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    daysOfWeek.forEach((day) => {
      const th = document.createElement("th");
      th.classList.add("weekday");
      th.textContent = day;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const firstDayOfMonth = new Date(year, month, 1);
    let startIndex = firstDayOfMonth.getDay() - 1;
    if (firstDayOfMonth.getDay() === 0) startIndex = 6;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const tbody = document.createElement("tbody");
    let row = document.createElement("tr");

    for (let i = 0; i < startIndex; i++) {
      row.appendChild(document.createElement("td"));
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

      const dayTasks = eventsMap[day];

      if (dayTasks && dayTasks.length > 0) {
        // Elegir la tarea más próxima a vencer (menor fecha)
        const nearestTask = dayTasks.reduce((nearest, current) => {
          return new Date(current.deadline) < new Date(nearest.deadline)
            ? current
            : nearest;
        });

        const dot = document.createElement("span");
        dot.classList.add("dot", nearestTask.priority);
        dot.title = nearestTask.title;
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          onTaskClick(nearestTask);
        });

        const dotsDiv = document.createElement("div");
        dotsDiv.classList.add("dots");
        dotsDiv.appendChild(dot);
        cell.appendChild(dotsDiv);
      }

      row.appendChild(cell);
    }

    while (row.children.length < 7)
      row.appendChild(document.createElement("td"));
    tbody.appendChild(row);
    table.appendChild(tbody);

    container.appendChild(table);
  };

  render();

  return {
    element: container,
    updateCalendar: (newTasks = []) => {
      currentTasks = newTasks;
      render();
    }
  };
};
