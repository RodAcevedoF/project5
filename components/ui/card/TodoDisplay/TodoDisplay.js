import "./TodoDisplay.css";
import { deleteTodo, updateTodo } from "../../../..//api/ToDoApi";
import { MainBtn, SwitchYesNo } from "../../../../components";
import { showConfirm, showError, showSuccess } from "../../../../utils";

export const TodoDisplay = (todo, { onUpdate }) => {
  const card = document.createElement("div");
  card.classList.add("todo-display-card");

  card.innerHTML = `
    <div class="card-title">
      <img src="../../public/images/todolanding.png" alt="todo icon">
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

  // Switch de completado
  const switchElement = SwitchYesNo(todo);
  card.querySelector(".card-content").appendChild(switchElement);

  // Eventos
  card
    .querySelector("#close-btn")
    .addEventListener("click", () => card.remove());

  card.querySelector("#edit-btn").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("editTodo", { detail: todo }));
    card.remove();
  });

  card.querySelector("#delete-btn").addEventListener("click", async () => {
    const confirmed = await showConfirm({
      title: "Delete task",
      text: "Are you sure you want to delete this task?",
      confirmButtonText: "Yes, delete it"
    });
    if (!confirmed) return;

    const result = await deleteTodo(todo.id);
    if (result.success) {
      card.remove();
      onUpdate?.({ reload: true });
      await showSuccess("Task deleted");
    } else {
      await showError(result.error || "Error deleting task");
    }
  });

  card.querySelector("#todo-checkbox").addEventListener("change", async (e) => {
    const isChecked = e.target.checked;
    const result = await updateTodo(todo.id, { checked: isChecked });

    if (result.success) {
      card.querySelector(".switch-label").textContent = isChecked
        ? "Completed"
        : "Not completed";
      onUpdate?.({ reload: true });
    } else {
      await showError(result.error || "Error updating task");
    }
  });

  return card;
};
