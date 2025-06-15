import "./MainBtn.css";

const MainBtn = (
  type = "button",
  idName = null,
  className,
  txt = "Click me",
  asNode = false // clave acá
) => {
  if (!asNode) {
    return `<button type="${type}" class="${className}" id="${idName}">${txt}</button>`;
  }

  const button = document.createElement("button");
  button.type = type;
  button.textContent = txt;
  if (idName) button.id = idName;
  if (className) button.className = className;
  return button;
};

export default MainBtn;
