import "./SuggestionBtn.css";

const SuggestionBtn = (callback, arr) => {
  const btn = document.createElement("button");
  btn.classList.add("suggestion-btn");

  // Seleccionar un término aleatorio del array
  const randomIndex = Math.floor(Math.random() * arr.length);
  const query =
    typeof arr[randomIndex] === "string"
      ? arr[randomIndex]
      : arr[randomIndex]?.query;

  if (!query || typeof query !== "string") {
    console.error("Invalid suggestion:", arr[randomIndex]);
    btn.innerHTML = `<span>Invalid</span>`;
    return btn;
  }

  // Configurar el botón
  btn.innerHTML = `<span>${query}</span>`;
  btn.addEventListener("click", () => {
    callback(query);
    document.querySelector(".book-grid").classList.remove("height");
    document.querySelector(".video-grid").classList.remove("height");
  });

  return btn;
};

export default SuggestionBtn;
