import "./MainBtn.css";

const MainBtn = (type = "button", idName = null, txt = "Click me") => `<button type=${type} class="main-btn" id=${idName}>${txt}</button>`;

export default MainBtn;