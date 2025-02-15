import "./MainBtn.css";

const MainBtn = (type = "button", idName = null, classNam, txt = "Click me") => `<button type=${type} class=${classNam} id=${idName}>${txt}</button>`;

export default MainBtn;