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

export const menuBtn = () => {
  const btn = document.createElement("button");
  btn.classList.add("menu-burger-btn");

  btn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

  btn.addEventListener("click", (ev) => {
    ev.stopPropagation();  
  const ul = document.querySelector(".services-ul");
    btn.classList.toggle("active");
    ul.classList.toggle("get");
  });

  document.addEventListener("click", (ev) => {
    const target = ev.target;
    const ul = document.querySelector(".services-ul");
    if (!btn.contains(target) && !ul.contains(target)) {
      btn.classList.remove("active");
      ul.classList.remove("get");
    }
  });

  return btn;
};
