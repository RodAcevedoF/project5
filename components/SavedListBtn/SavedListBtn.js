import "./SavedListBtn.css";

const SavedListBtn = (str1, id1, str2, id2) => {
  const div = document.createElement("div");
  div.classList.add("front-btns");
  div.innerHTML = `
               <button id=${id1} class=read-btn>Just ${str1}!</button>
               <button id=${id2} class="del-btn">${str2}</button>`;

  return div;
};

export default SavedListBtn;
