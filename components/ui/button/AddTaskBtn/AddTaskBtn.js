import "./AddTask.css";

const AddTaskBtn = (todoEditor) => {
  const btn = document.createElement("button");
  btn.classList.add("add-task-btn");
  const p = document.createElement("p");
  p.textContent = "ADD TASK";
  const img = document.createElement("img");
  img.src = "/icon/add.png";
  img.alt = "add button icon";
  btn.appendChild(p);
  btn.appendChild(img);

  for (let i = 0; i < 4; i++) {
    const span = document.createElement("span");
    span.classList.add(`animation-span${i + 1}`);
    btn.appendChild(span);
  }

  btn.addEventListener("click", () => {
    const cont = document.querySelector(".editor-container");
    if (!cont.classList.contains("visible")) {
      const form = todoEditor.querySelector("#todo-form");
      form.reset();
      cont.classList.add("visible");
      p.textContent = "HIDE";

      const displayCard = document.querySelector(".todo-display-card");
      if (displayCard) displayCard.remove();
    } else {
      cont.classList.remove("visible");
      p.textContent = "ADD TASK";
    }
  });

  return btn;
};

export default AddTaskBtn;
