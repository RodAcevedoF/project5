import "./AddTask.css";

const AddTaskBtn = (todoEditor) => {
  const btn = document.createElement("button");
  btn.classList.add("add-task-btn");
  const p = document.createElement("p");
  p.textContent = "Add task";
  const img = document.createElement("img");
  img.src = "../../public/icon/add.png";
  img.alt = "add button icon";
  btn.appendChild(p);
  btn.appendChild(img);
  for (let i = 0; i < 4; i++) {
    let span = document.createElement("span");
    span.classList.add(`animation-span${i+1}`);
    btn.appendChild(span);
  }
  btn.addEventListener("click", () => {
    const cont = document.querySelector(".editor-container");
    if (!cont.classList.contains("visible")) {
      const form = todoEditor.querySelector("#todo-form");
      form.reset();
      document.getElementById("todo-id").value = "";
      document.querySelector(".tooltip").textContent = "Save";
      document.querySelector(".delete-todo-button").style.display = "none";
      cont.classList.add("visible");
      p.textContent = "Hide";
    } else {
      cont.classList.remove("visible");
      p.textContent = "Add task";
    }
  });

  return btn;
};

export default AddTaskBtn;
