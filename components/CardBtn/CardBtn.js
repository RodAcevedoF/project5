import "./CardBtn.css";

const CardBtn = (txt, className, src) => {
  const btn = document.createElement("button");
  btn.classList.add("card-button");
  btn.classList.add(`${className}-button`);
  btn.innerHTML = `
   <span class="tooltip">${txt}</span>
   <img src=${src} alt="${className} icon">`;
  return btn;
};

export default CardBtn;
