import "./ToDo.css";
import {
  AsideBtn,
  MainAside,
  AddTaskBtn,
  InnerFooter,
  QuoteWidget,
  TodoCard,
  WeatherWidget
} from "../../components";

export const Todo = () => {
  const container = document.querySelector("main");
  container.innerHTML = "";

  const aside = MainAside();
  const todoEditor = TodoCard();

  const mainArea = document.createElement("section");
  mainArea.classList.add("todo-main");

  const header = document.createElement("header");
  header.classList.add("todo-header");
  const quote = QuoteWidget();
  header.appendChild(quote);
  const weather = WeatherWidget();
  header.appendChild(weather);

  const mainArticle = document.createElement("article");
  mainArticle.classList.add("todo-tasks");
  mainArticle.appendChild(header);

  const middleContainer = document.createElement("div");
  middleContainer.classList.add("mid-container");

  const latestContainer = document.createElement("div");
  latestContainer.classList.add("latest-container");

  const editorContainer = document.createElement("div");
  editorContainer.classList.add("editor-container");
  editorContainer.appendChild(todoEditor);

  const taskBtn = AddTaskBtn(todoEditor);
  const asideButton = AsideBtn();
  middleContainer.appendChild(taskBtn);
  middleContainer.appendChild(asideButton);
  mainArticle.appendChild(middleContainer);

  mainArea.appendChild(aside);
  mainArea.appendChild(mainArticle);

  mainArticle.appendChild(latestContainer);
  mainArticle.appendChild(editorContainer);
  const inFooter = InnerFooter();
  mainArticle.appendChild(inFooter);
  container.appendChild(mainArea);

  return container;
};
