import "./TodoDisplay.css";
import { deleteTodo } from "../../api/ToDoApi";
import { loadTodos, loadUpcomingDeadlines } from "../MainAside/MainAside";
import MainBtn from "../MainBtn/MainBtn";

export const TodoDisplay = (todo) => {
  const card = document.createElement("div");
  card.classList.add("todo-display-card");

  card.innerHTML = `
    <div class="card-title">
    <img src="/icon/target.png" alt="target icon">
    <h3>${todo.title}</h3>
    </div>
    <div class="card-content">
    <p>${todo.description || "No description available"}</p>
    <p>Priority: ${todo.priority}</p>
    <p>Deadline: ${
      todo.deadline ? new Date(todo.deadline).toLocaleString() : "No deadline"
    }</p>
    </div>
    <div class="actions">
      ${MainBtn("button", "edit-btn", "main-btn", "Edit")}
      ${MainBtn("button", "delete-btn", "main-btn", "Delete")}
      ${MainBtn("button", "close-btn", "main-btn", "Close")}
    </div>
  `;

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

  return card;
};
