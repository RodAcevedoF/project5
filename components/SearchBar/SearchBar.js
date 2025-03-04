export const SearchBar = (onSearchQuery) => {
  const container = document.createElement("div");
  container.classList.add("search-bar");

  container.innerHTML = `
    <form id="search-form">
      <input type="text" id="search-input" placeholder="Buscar libros..." required />
      <button type="submit">Buscar</button>
    </form>
  `;

  const form = container.querySelector("#search-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = container.querySelector("#search-input");
    let query = input.value.trim();
    if (!query || typeof query !== "string") return;
    
    onSearchQuery(query);
  });

  return container;
};
