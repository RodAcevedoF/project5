import "./MenuUl.css";

export const MenuUl = () => {
  const ul = document.createElement("ul");
  ul.classList.add("services-ul");
  const servicesArr = ["Product ▽", "Solutions ▽", "Resources ▽", "About us ▽"];

  for (let elem of servicesArr) {
    let elemLi = document.createElement("li");
    elemLi.textContent = elem;
    elemLi.classList.add("service-li");
    ul.appendChild(elemLi);
  }

  return ul;
};

export const menuBtn = (menuContainer) => {
  const btn = document.createElement("button");
  btn.classList.add("menu-burger-btn");

  btn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

  btn.addEventListener("click", (ev) => {
    ev.stopPropagation();  
    btn.classList.toggle("active");
    menuContainer.classList.toggle("get");
  });

  document.addEventListener("click", (ev) => {
    if (!btn.contains(ev.target) && !menuContainer.contains(ev.target)) {
      btn.classList.remove("active");
      menuContainer.classList.remove("get");
    }
  });

  return btn;
};
