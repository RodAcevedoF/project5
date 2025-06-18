import { getTodos, createTodo, updateTodo, deleteTodo } from "../api";
import { setState } from "../utils/state";

export const fetchTodos = async () => {
  try {
    const result = await getTodos(100, 0);
    const todos = result.success ? result.data : [];
    setState("todos", todos);
    return todos;
  } catch (e) {
    console.error("Failed to fetch todos", e);
    return [];
  }
};

export const fetchUpcomingDeadlines = (todos = []) => {
  return todos
    .filter((t) => t.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);
};

export const saveTodo = async (todoData) => {
  const isUpdate = !!todoData.id;
  const result = isUpdate
    ? await updateTodo(todoData.id, todoData)
    : await createTodo(todoData);

  if (result.success) {
    await fetchTodos();
    return { success: true, todo: result.data };
  } else {
    const errorMessage =
      Array.isArray(result.errors) && result.errors.length > 0
        ? result.errors[0]
        : result.error || "Error saving task";

    return { success: false, error: errorMessage };
  }
};

export const removeTodo = async (id) => {
  const result = await deleteTodo(id);
  if (result.success) {
    await fetchTodos(); // Refresh
    return true;
  }
  return false;
};

export const renderTodos = (
  todos,
  container,
  openTodoDisplay,
  { append = false } = {}
) => {
  if (!append) container.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.textContent = todo.title;

    const img = document.createElement("img");
    img.src = "/icon/checked.png";
    img.classList.add("todo-checked");
    img.classList.toggle("visible", !!todo.checked);
    todoItem.appendChild(img);

    todoItem.addEventListener("click", () => openTodoDisplay(todo));
    container.appendChild(todoItem);
  });
};

export const renderDeadlines = (todos, container, openTodoDisplay) => {
  container.innerHTML = "";
  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.classList.add("todo-item");
    item.innerHTML = `<p>${todo.title}</p><p>${new Date(
      todo.deadline
    ).toLocaleDateString()}</p>`;
    item.addEventListener("click", () => openTodoDisplay(todo));
    container.appendChild(item);
  });
};
