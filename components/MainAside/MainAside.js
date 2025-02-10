import "./MainAside.css";
import { getTodos } from "../../api/ToDoApi";
import { Calendar } from "../Calendar/Calendar";

export const MainAside = () => {
  const aside = document.createElement("aside");
  aside.classList.add("main-aside");

  aside.innerHTML = `
    <div class="latest">
      <h3 id="toggle-latest">Últimas Tareas</h3>
      <ul id="latest-tasks" class="collapsible">
        <!-- Aquí se cargarán las tareas recientes -->
        <li><button id="load-more" class="todo-btn">Cargar más</button></li>
      </ul>
    </div>
    <div class="deadline">
      <h3 id="toggle-deadlines">Próximos Vencimientos</h3>
      <ul id="upcoming-deadlines" class="collapsible">
        <!-- Aquí se mostrarán tareas con vencimientos próximos -->
      </ul>
    </div>
    <div class="calendar">
      <h3>Calendario</h3>
      <div id="calendar-container" class="collapsible">
        <!-- Calendario personalizado -->
      </div>
    </div>
  `;

  const latestBtn = aside.querySelector("#toggle-latest");
  const deadlineBtn = aside.querySelector("#toggle-deadlines");
  const calendarBtn = aside.querySelector(".calendar > h3");

  latestBtn.addEventListener("click", () => {
    const latestUl = aside.querySelector("#latest-tasks");
    latestUl.classList.toggle("hidden");
  });

  deadlineBtn.addEventListener("click", () => {
    const deadlineUl = aside.querySelector("#upcoming-deadlines");
    deadlineUl.classList.toggle("hidden");
  });

  calendarBtn.addEventListener("click", () => {
    const calendarCont = aside.querySelector("#calendar-container");
    calendarCont.classList.toggle("hidden");
  });

  loadTodos(10, 0, (todo) => {
    window.dispatchEvent(
      new CustomEvent("loadTodoIntoEditor", { detail: todo })
    );
  });
  loadUpcomingDeadlines();

  const loadMoreButton = aside.querySelector("#load-more");
  loadMoreButton.addEventListener("click", () => {
    alert("Implementa la carga de más tareas");
  });

  const calendarComp = Calendar();
  const calendarContainer = aside.querySelector("#calendar-container");
  calendarContainer.appendChild(calendarComp);

  // Aquí se asigna la función de actualización correctamente:
  aside.calendarUpdate = calendarComp.updateCalendar;

  return aside;
};

export const loadTodos = async (limit = 10, offset = 0, onTodoClick) => {
  const result = await getTodos(limit, offset);
  const latestUl = document.querySelector("#latest-tasks");
  if (result.success) {
    latestUl.innerHTML = "";
    result.data.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.classList.add("todo-item");
      todoItem.textContent = todo.title;
      todoItem.addEventListener("click", () => {
        if (typeof onTodoClick === "function") {
          onTodoClick(todo);
        }
      });
      latestUl.appendChild(todoItem);
    });
  } else {
    latestUl.textContent = "No se pudieron cargar las tareas.";
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
      .slice(0, 3); // Mostrar solo 3 tareas
    sortedTodos.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.classList.add("todo-item");
      todoItem.textContent = `${todo.title} - ${new Date(
        todo.deadline
      ).toLocaleDateString()}`;
      todoItem.addEventListener("click", () => {
        window.dispatchEvent(
          new CustomEvent("loadTodoIntoEditor", { detail: todo })
        );
      });
      deadlineUl.appendChild(todoItem);
    });
  } else {
    deadlineUl.textContent = "No se pudieron cargar las tareas.";
  }
};
