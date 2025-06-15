import "./TodoCard.css";
import { CardBtn } from "..";

export const TodoCard = ({ onCreated }) => {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("task-editor");
  cardContainer.innerHTML = `
    <h2>Add a task or reminder!</h2>
    <form id="todo-form">
      <input type="text" id="todo-title" placeholder="Add a nice title" required />
      <textarea id="todo-description" placeholder="Elaborate a little bit further" rows="5"></textarea>
      <div class="form-div">
        <select id="todo-urgency">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input type="date" id="todo-deadline" />
      </div>
      <div class="form-btns"></div>
    </form>
  `;

  const todoForm = cardContainer.querySelector("#todo-form");
  const formBtns = cardContainer.querySelector(".form-btns");
  formBtns.appendChild(CardBtn("Save", "save-todo", "/icon/add.png", "submit"));

  let todoToEdit = null;

  const resetForm = () => {
    todoForm.reset();
    todoToEdit = null;
  };

  const fillForm = (todo) => {
    todoForm.querySelector("#todo-title").value = todo.title || "";
    todoForm.querySelector("#todo-description").value = todo.description || "";
    todoForm.querySelector("#todo-urgency").value = todo.priority || "low";
    todoForm.querySelector("#todo-deadline").value = todo.deadline
      ? todo.deadline.slice(0, 10)
      : "";
    todoToEdit = todo;
  };

  todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = todoForm.querySelector("#todo-title").value.trim();
    const description = todoForm
      .querySelector("#todo-description")
      .value.trim();
    const urgency = todoForm.querySelector("#todo-urgency").value;
    const deadlineDate = todoForm.querySelector("#todo-deadline").value;
    const deadline = deadlineDate ? `${deadlineDate}T10:00:00` : "";

    const todoData = {
      title,
      description,
      priority: urgency,
      deadline
    };

    if (todoToEdit?.id) {
      todoData.id = todoToEdit.id;
    }

    try {
      if (onCreated) {
        await onCreated(todoData);
      }
      resetForm();
      cardContainer.classList.remove("visible");
      document.querySelector(".add-task-btn > p").textContent = "ADD TASK";
    } catch (error) {
      console.log("Error saving task");
    }
  });

  cardContainer.setTodoToEdit = fillForm;
  return cardContainer;
};
