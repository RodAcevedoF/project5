import "./MenuUl.css"

const MenuUl = () => {
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
}

export default MenuUl;