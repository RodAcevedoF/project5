import "./CardBtn.css";

const CardBtn = (txt, className, src) => {
    const btn = document.createElement("button");
    btn.classList.add("card-button");
    btn.classList.add(`${className}-button`);
    btn.innerHTML = `<img src=${src} alt="${className} icon">
  <span class="tooltip">${txt}</span>`;

  return btn;

}

export default CardBtn;