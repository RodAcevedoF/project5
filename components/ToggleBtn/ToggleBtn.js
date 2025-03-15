import "./ToggleBtn.css";

const toggleBtn = (txt1, txt2) => {
    const btn = document.createElement("button");
    const p = document.createElement("p");
    btn.classList.add("toggle-btn");
    p.textContent = txt1;
    btn.appendChild(p);
    for (let i = 0; i < 4; i++) {
        let span = document.createElement("span");
        span.classList.add(`animation-span${i+1}`);
        btn.appendChild(span);
      }
    btn.addEventListener("click", () => {
        if (p.textContent === txt1) {
            p.textContent = txt2;
        } else {
            p.textContent = txt1;
        }
    });

    return btn;
}

export default toggleBtn;