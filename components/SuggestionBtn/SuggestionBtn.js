import "./SuggestionBtn.css";

const SuggestionBtn = (callback, arr) => {
  const btn = document.createElement("button");
  btn.classList.add("suggestion-btn");

  // Seleccionar un término aleatorio
  const randomIndex = Math.floor(Math.random() * arr.length);
  const query = arr[randomIndex];

  // Configurar el botón con el término
  btn.innerHTML = `<span>${query}</span>`;
  btn.addEventListener("click", () => {
    callback(query); // Llamar al callback con el query seleccionado
  });

  return btn;
};

export default SuggestionBtn;
