import "./ToDo.css";
import {
  MainAside,
  loadTodos,
  loadUpcomingDeadlines
} from "../../components/MainAside/MainAside";
import { createTodo, updateTodo, deleteTodo } from "../../api/ToDoApi";

export const Todo = () => {
  const container = document.querySelector("main");
  container.innerHTML = "";

  const aside = MainAside();

  const mainArea = document.createElement("section");
  mainArea.classList.add("todo-main");
  mainArea.innerHTML = `
    <div class="task-editor">
      <h2>Área de Trabajo</h2>
      <form id="todo-form">
        <input type="hidden" id="todo-id" />
        <input type="text" id="todo-title" placeholder="Título de la tarea" required />
        <textarea id="todo-description" placeholder="Descripción de la tarea"></textarea>
        <select id="todo-urgency">
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        <input type="datetime-local" id="todo-deadline" />
        <input type="file" id="todo-file" />
        <button type="submit" class="todo-btn" id="save-todo">Guardar Tarea</button>
        <button type="button" class="todo-btn" id="delete-todo" style="display: none;">Eliminar Tarea</button>
      </form>
    </div>
  `;

  mainArea.appendChild(aside);
  container.appendChild(mainArea);

  const loadTodoIntoEditor = (todo) => {
    document.getElementById("todo-id").value = todo.id;
    document.getElementById("todo-title").value = todo.title;
    document.getElementById("todo-description").value = todo.description || "";
    document.getElementById("todo-urgency").value = todo.priority || "low";
    if (todo.deadline) {
      document.getElementById("todo-deadline").value = todo.deadline.slice(0, 16);
    } else {
      document.getElementById("todo-deadline").value = "";
    }
    document.getElementById("save-todo").textContent = "Actualizar Tarea";
    document.getElementById("delete-todo").style.display = "inline-block";
  };

  window.addEventListener("loadTodoIntoEditor", (e) => {
    const todo = e.detail;
    loadTodoIntoEditor(todo);
  });

  const todoForm = mainArea.querySelector("#todo-form");
  todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("todo-id").value;
    const title = document.getElementById("todo-title").value;
    const description = document.getElementById("todo-description").value;
    const urgency = document.getElementById("todo-urgency").value;
    const deadline = document.getElementById("todo-deadline").value;
    const fileInput = document.getElementById("todo-file");
    const file = fileInput.files[0];

    const todoData = { title, description, priority: urgency, deadline };
    if (file) {
      todoData.file = file;
    }

    let result;
    if (id) {
      result = await updateTodo(id, todoData);
    } else {
      result = await createTodo(todoData);
    }

    if (result.success) {
      todoForm.reset();
      document.getElementById("todo-id").value = "";
      document.getElementById("save-todo").textContent = "Guardar Tarea";
      document.getElementById("delete-todo").style.display = "none";
      
      // Actualizar las listas de tareas
      loadTodos(10, 0, (todo) => {
        window.dispatchEvent(
          new CustomEvent("loadTodoIntoEditor", { detail: todo })
        );
      });
      loadUpcomingDeadlines();
      
      // Actualizar el calendario
      if (aside.calendarUpdate && typeof aside.calendarUpdate === "function") {
        aside.calendarUpdate();
      }
    } else {
      alert(result.error || "Error al guardar la tarea");
    }
  });

  const deleteButton = document.getElementById("delete-todo");
  deleteButton.addEventListener("click", async () => {
    const id = document.getElementById("todo-id").value;
    if (id && confirm("¿Estás seguro de eliminar esta tarea?")) {
      const result = await deleteTodo(id);
      if (result.success) {
        todoForm.reset();
        document.getElementById("todo-id").value = "";
        document.getElementById("save-todo").textContent = "Guardar Tarea";
        document.getElementById("delete-todo").style.display = "none";
        
        loadTodos(10, 0, (todo) => {
          window.dispatchEvent(
            new CustomEvent("loadTodoIntoEditor", { detail: todo })
          );
        });
        loadUpcomingDeadlines();
        
        // Actualizar el calendario
        if (aside.calendarUpdate && typeof aside.calendarUpdate === "function") {
          aside.calendarUpdate();
        }
      } else {
        alert(result.error || "Error al eliminar la tarea");
      }
    }
  });
  return container;
};
