import "./TodoDisplay.css";
import { deleteTodo, updateTodo } from "../../api/ToDoApi";
import { MainBtn, SwitchYesNo, loadTodos, loadUpcomingDeadlines } from "..";

export const TodoDisplay = (todo) => {
  const card = document.createElement("div");
  card.classList.add("todo-display-card");
  card.innerHTML = `
    <div class="card-title">
    <img src="/icon/done.png" alt="target icon">
    <h3>${todo.title}</h3>
    </div>
    <div class="card-content">
      <p class="todo-description"><strong>Notes:</strong> ${
        todo.description || "No description available"
      }</p>
      <p class="card-p"><strong>Priority:</strong> ${todo.priority}</p>
      <p class="card-p"><strong>Deadline:</strong> ${
        todo.deadline
          ? new Date(todo.deadline).toLocaleDateString()
          : "No deadline"
      }</p>
    </div>
    <div class="actions">
      ${MainBtn("button", "edit-btn", "main-btn", "Edit")}
      ${MainBtn("button", "close-btn", "main-btn", "Close")}
      ${MainBtn("button", "delete-btn", "main-btn", "Delete")}
    </div>
  `;
  const switchElement = SwitchYesNo(todo);
  const cardContent = card.querySelector(".card-content");
  cardContent.appendChild(switchElement);

  card.querySelector("#edit-btn").addEventListener("click", () => {
    window.dispatchEvent(
      new CustomEvent("loadTodoIntoEditor", { detail: todo })
    );
    card.remove();
    const p = document.querySelector(".add-task-btn > p");
    p.textContent = "Hide";
  });

  card.querySelector("#delete-btn").addEventListener("click", async () => {
    if (confirm("¿Estás seguro de eliminar esta tarea?")) {
      const result = await deleteTodo(todo.id);
      if (result.success) {
        card.remove();
        loadTodos(10, 0);
        loadUpcomingDeadlines();
        const aside = document.querySelector("aside");
        if (aside && typeof aside.calendarUpdate === "function") {
          aside.calendarUpdate();
        }
      } else {
        alert(result.error || "Error al eliminar la tarea");
      }
    }
  });

  card.querySelector("#close-btn").addEventListener("click", () => {
    card.remove();
  });

  card.querySelector("#todo-checkbox").addEventListener("change", async (e) => {
    const isChecked = e.target.checked;
    const result = await updateTodo(todo.id, { checked: isChecked });
    if (result.success) {
      card.querySelector(".switch-label").textContent = `${
        isChecked ? "Completed" : "Not completed"
      }`;
      loadTodos(10, 0);
      loadUpcomingDeadlines();
    } else {
      alert(result.error || "Error al actualizar la tarea");
    }
  });

  return card;
};
