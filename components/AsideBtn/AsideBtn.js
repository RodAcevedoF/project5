import "./AsideBtn.css";

const AsideBtn = () =>{ 
    const btn = document.createElement("button");
    btn.classList.add("aside-btn")
    btn.innerHTML = `  <span></span>
                       <span></span>
                       <span></span>
                       <span></span>
                       <div class="open-close">
                        <span></span>
                        <span></span>
                        <span></span>
                       </div>`;
                       

return btn;
}
export default AsideBtn;