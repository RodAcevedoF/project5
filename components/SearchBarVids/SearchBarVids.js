export const SearchBarVids = (onSearchQuery) => {
  const container = document.createElement("div");
  container.classList.add("search-bar");

  container.innerHTML = `
    <form id="search-form">
      <input type="text" id="search-input" placeholder="Buscar videos..." required />
      <button type="submit">Buscar</button>
    </form>
  `;

  const form = container.querySelector("#search-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = container.querySelector("#search-input");
    const query = input.value.trim();
    if (!query) return;
    console.log("Consulta enviada:", query);
    onSearchQuery(query);
  });

  return container;
};
