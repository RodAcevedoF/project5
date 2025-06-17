import "./ToDo.css";
import {
  AsideBtn,
  MainAside,
  AddTaskBtn,
  InnerFooter,
  TodoCard,
  WeatherWidget,
  HeroBanner,
  TodoDisplay,
  Calendar,
  LoadComp
} from "../../components";
import {
  fetchTodos,
  fetchUpcomingDeadlines,
  renderTodos,
  renderDeadlines,
  saveTodo,
  showError,
  showToast
} from "../../utils";

export const Todo = async () => {
  const container = document.querySelector("main");
  container.innerHTML = "";

  const loadingWrapper = document.createElement("div");
  loadingWrapper.innerHTML = LoadComp();
  container.appendChild(loadingWrapper);

  const latestTasksContainer = document.createElement("ul");
  latestTasksContainer.id = "latest-tasks";
  latestTasksContainer.classList.add("collapsible");

  const deadlinesContainer = document.createElement("ul");
  deadlinesContainer.id = "upcoming-deadlines";
  deadlinesContainer.classList.add("collapsible");

  const calendarContainer = document.createElement("div");
  calendarContainer.id = "calendar-container";
  calendarContainer.classList.add("collapsible");

  const latestContainer = document.createElement("section");
  latestContainer.classList.add("latest-container");

  const editorContainer = document.createElement("section");
  editorContainer.classList.add("editor-container");

  let todos = [];
  let offset = 0;
  const limit = 5;

  const calendarObj = Calendar({
    tasks: [],
    onTaskClick: (todo) => openTodoDisplay(todo)
  });
  calendarContainer.appendChild(calendarObj.element);

  const reloadData = async (reset = true) => {
    if (reset) {
      todos = await fetchTodos();
      offset = 0;
      latestTasksContainer.innerHTML = "";
    }

    const slice = todos.slice(offset, offset + limit);
    renderTodos(slice, latestTasksContainer, openTodoDisplay, {
      append: !reset
    });
    offset += limit;

    const deadlines = fetchUpcomingDeadlines(todos);
    renderDeadlines(deadlines, deadlinesContainer, openTodoDisplay);
    calendarObj.updateCalendar(todos.filter((t) => t.deadline && t.priority));

    return offset < todos.length;
  };

  const openTodoDisplay = (todo) => {
    latestContainer.innerHTML = "";
    latestContainer.appendChild(
      TodoDisplay(todo, {
        onUpdate: async () => {
          await reloadData(true);
        }
      })
    );

    editorContainer.classList.remove("visible");
    document.querySelector(".add-task-btn > p").textContent = "ADD TASK";
  };

  const todoEditor = TodoCard({
    onCreated: async (todoData) => {
      const result = await saveTodo(todoData);
      if (result.success) {
        showToast(todoData.id ? "Task updated!" : "Task added!");
        await reloadData(true);
      } else {
        console.log(result);
        showError(result.error || "Error saving task");
      }
    }
  });

  window.addEventListener("editTodo", (e) => {
    todoEditor.setTodoToEdit?.(e.detail);
    editorContainer.classList.add("visible");
    document.querySelector(".add-task-btn > p").textContent = "HIDE";
  });

  const aside = MainAside({
    containers: {
      latestTasks: latestTasksContainer,
      upcomingDeadlines: deadlinesContainer,
      calendar: calendarContainer
    },
    openTodoDisplay,
    loadData: reloadData
  });

  editorContainer.appendChild(todoEditor);

  const mainArea = document.createElement("section");
  mainArea.classList.add("todo-main");

  const mainArticle = document.createElement("article");
  mainArticle.classList.add("todo-tasks");

  const header = document.createElement("header");
  header.classList.add("todo-header");

  const hero = HeroBanner({
    header: "To-dos",
    messages: ["Plan goals", "Go ahead!", "Get it done"]
  });
  header.appendChild(hero);

  const weather = await WeatherWidget();
  header.appendChild(weather);

  const middleContainer = document.createElement("section");
  middleContainer.classList.add("mid-container");
  middleContainer.appendChild(AddTaskBtn(todoEditor));
  middleContainer.appendChild(AsideBtn());

  mainArticle.appendChild(header);
  mainArticle.appendChild(middleContainer);
  mainArticle.appendChild(latestContainer);
  mainArticle.appendChild(editorContainer);
  mainArticle.appendChild(InnerFooter());

  mainArea.appendChild(aside);
  mainArea.appendChild(mainArticle);

  await reloadData(true);
  loadingWrapper.remove();
  container.appendChild(mainArea);

  return container;
};
