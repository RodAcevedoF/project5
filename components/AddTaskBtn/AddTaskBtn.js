import "./AddTask.css";

const AddTaskBtn = (todoEditor) => {
  const btn = document.createElement("button");
  btn.classList.add("add-task-btn");
  const span = document.createElement("span");
  span.textContent = "Add task";
  const img = document.createElement("img");
  img.src = "../../public/icon/add.png"
  img.alt = "add button icon";
  btn.appendChild(span);
  btn.appendChild(img);
  btn.addEventListener("click", () => {
    const cont = document.querySelector(".editor-container");
    if (!cont.classList.contains("visible")) {
      const form = todoEditor.querySelector("#todo-form");
      form.reset();
      document.getElementById("todo-id").value = "";
      document.getElementById("save-todo").textContent = "Save";
      document.getElementById("delete-todo").style.display = "none";
      cont.classList.add("visible");
      span.textContent = "Hide"
    } else {
      cont.classList.remove("visible");
      span.textContent = "Add task";
    }
  });

  return btn;
};

export default AddTaskBtn;
