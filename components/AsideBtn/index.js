import "./AsideBtn.css";

const AsideBtn = () => {
  const btn = document.createElement("button");
  btn.classList.add("aside-btn");
  btn.innerHTML = `  <span></span>
                       <span></span>
                       <span></span>
                       <span></span>
                       <p>TASKS</p>
                       <div class="open-close">
                        <span class="oc"></span>
                        <span class="oc"></span>
                        <span class="oc"></span>
                       </div>`;

  btn.addEventListener("click", () => {
    const openCloseSpan = document.querySelectorAll(".open-close span");
    openCloseSpan.forEach((span) => span.classList.toggle("closing"));
    const aside = document.querySelector(".main-aside");
    aside.classList.toggle("visible");
  });

  return btn;
};
export default AsideBtn;
