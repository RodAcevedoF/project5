import "./SwitchYesNo.css";

export const SwitchYesNo = (todo) => {
  const container = document.createElement("div");
  container.classList.add("switch-container");

  container.innerHTML = `<p class="switch-label">${
    todo.checked ? "Completed" : "Not completed"
  }</p>
                           <label class="rocker rocker-small">
                             <input id="todo-checkbox" type="checkbox" ${
                               todo.checked ? "checked" : ""
                             } />
                             <span class="switch-left">Yes</span>
                             <span class="switch-right">No</span>
                           </label>`;

  return container;
};
