import "./TodoCard.css";
import { createTodo, updateTodo, deleteTodo } from "../../api/ToDoApi";
import { loadTodos, loadUpcomingDeadlines } from "../MainAside/MainAside";
import MainBtn from "../MainBtn/MainBtn";

export const TodoCard = () => {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("task-editor");
  cardContainer.innerHTML = `
    <h2>Add a task, reminder or a random thought!</h2>
    <form id="todo-form">
      <input type="hidden" id="todo-id" />
      <input type="text" id="todo-title" placeholder="Add a nice title" required />
      <textarea id="todo-description" placeholder="Elaborate a little bit further" rows="5"></textarea>
      <div class="form-div">
      <select id="todo-urgency">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="datetime-local" id="todo-deadline" />
      </div>
      <div class="form-btns">
      ${MainBtn("submit", "save-todo", "main-btn", "Save")}
      ${MainBtn("button", "delete-todo", "main-btn", "Delete")}
      </div>
    </form>
  `;

  {
    /* <input type="file" id="todo-file" /> */
  }
  const todoForm = cardContainer.querySelector("#todo-form");

  const loadTodoIntoEditor = (todo) => {
    const form = cardContainer.querySelector("#todo-form");
    form.querySelector("#todo-id").value = todo.id;
    form.querySelector("#todo-title").value = todo.title;
    form.querySelector("#todo-description").value = todo.description || "";
    form.querySelector("#todo-urgency").value = todo.priority || "low";
    form.querySelector("#todo-deadline").value = todo.deadline
      ? todo.deadline.slice(0, 16)
      : "";
    form.querySelector("#save-todo").textContent = "Update";
    const cont = document.querySelector(".editor-container"); 
    cont.classList.add("visible")
  };

  window.addEventListener("loadTodoIntoEditor", (e) => {
    const todo = e.detail;
    loadTodoIntoEditor(todo);
    const cont = document.querySelector(".editor-container");
    cont.classList.add("visible"); 
  });

  const resetForm = () => {
    const form = cardContainer.querySelector("#todo-form");
    form.reset();
    form.querySelector("#todo-id").value = "";
    form.querySelector("#save-todo").textContent = "Save";
    form.querySelector("#delete-todo").style.display = "none";
  };

  todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = cardContainer.querySelector("#todo-form");
    const id = form.querySelector("#todo-id").value;
    const title = form.querySelector("#todo-title").value;
    const description = form.querySelector("#todo-description").value;
    const urgency = form.querySelector("#todo-urgency").value;
    const deadline = form.querySelector("#todo-deadline").value;
    /* const fileInput = form.querySelector("#todo-file");
    const file = fileInput.files[0]; */

    const todoData = { title, description, priority: urgency, deadline };
    /* if (file) {
      todoData.file = file;
    } */

    let result;
    if (id) {
      result = await updateTodo(id, todoData);
    } else {
      result = await createTodo(todoData);
    }

    if (result.success) {
      resetForm();
      loadTodos(10, 0, (todo) => {
        window.dispatchEvent(
          new CustomEvent("loadTodoIntoEditor", { detail: todo })
        );
      });
      loadUpcomingDeadlines();
      const aside = document.querySelector("aside");
      if (aside && typeof aside.calendarUpdate === "function") {
        aside.calendarUpdate();
      }
      const cont = document.querySelector(".editor-container");
      cont.classList.remove("visible");
    } else {
      alert(result.error || "Error al guardar la tarea");
    }
  });

  const deleteButton = cardContainer.querySelector("#delete-todo");
  deleteButton.addEventListener("click", async () => {
    const form = cardContainer.querySelector("#todo-form");
    const id = form.querySelector("#todo-id").value;
    if (id && confirm("¿Estás seguro de eliminar esta tarea?")) {
      const result = await deleteTodo(id);
      if (result.success) {
        resetForm();
        loadTodos(10, 0, (todo) => {
          window.dispatchEvent(
            new CustomEvent("loadTodoIntoEditor", { detail: todo })
          );
        });
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

  return cardContainer;
};
