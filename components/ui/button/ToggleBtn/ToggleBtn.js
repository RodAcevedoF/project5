import "./ToggleBtn.css";

const toggleBtn = (txt1, txt2, initialState = "search") => {
  const btn = document.createElement("button");
  const p = document.createElement("p");
  const img = document.createElement("img");
  btn.classList.add("toggle-btn");

  p.textContent = initialState === "saved" ? txt2 : txt1;
  img.src = "../../public/icon/btn_arrow.png";
  btn.appendChild(p);
  btn.appendChild(img);

  for (let i = 0; i < 4; i++) {
    let span = document.createElement("span");
    span.classList.add(`animation-span${i + 1}`);
    btn.appendChild(span);
  }

  btn.addEventListener("click", () => {
    p.textContent = p.textContent === txt1 ? txt2 : txt1;
  });

  return btn;
};

export default toggleBtn;
