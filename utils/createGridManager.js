export const createGridManager = async ({
  entity,
  resultKey,
  getSearchResults,
  getSavedItems,
  renderCard,
  renderListItem,
  createSearchBar,
  createSavedList,
  createSavedBar,
  updateCount,
  applyExtraFilters = () => {},
  deletedEvent,
  suggestionsComponent,
  toggleButtonLabels,
  pagination
}) => {
  const container = document.createElement("article");
  container.classList.add(`${entity}-article`);

  const toggleSect = document.createElement("section");
  toggleSect.classList.add("toggle-section");

  const menuSect = document.createElement("section");
  menuSect.classList.add("menu-section");

  const grid = document.createElement("section");
  grid.classList.add(`${entity}-grid`);

  const savedSect = document.createElement("section");
  savedSect.classList.add("saved-section");

  const List = createSavedList();
  const toggleButton = ToggleBtn(...toggleButtonLabels);
  const loadMoreButton = LoadMoreBtn("loadMore");

  let showingSaved = false;
  let totalItems = 0;
  let searchParams = {};

  const showLoading = (comp) => {
    comp.innerHTML = LoadComp();
  };

  const updateResults = (comp, result, isNewSearch = false) => {
    if (isNewSearch) {
      comp.innerHTML = "";
      pagination.reset();
    }

    const toggleState = getState("currentToggle");
    const items = result?.[resultKey] || [];

    if (!items.length && toggleState === "search") {
      comp.innerHTML = "";
      comp.appendChild(suggestionsComponent(search, toggleButton));
      return;
    } else if (!items.length && toggleState === "saved") {
      comp.innerHTML = "";
      comp.appendChild(SavedListsSuggestions(entity, toggleButton));
      return;
    }

    const renderedIds = new Set(
      Array.from(comp.querySelectorAll(`[data-${entity}-id]`)).map((el) =>
        el.getAttribute(`data-${entity}-id`)
      )
    );

    items.forEach((item) => {
      if (renderedIds.has(item.id)) return;
      const elem = comp === grid ? renderCard(item) : renderListItem(item);
      comp.appendChild(elem);
    });

    totalItems = result.totalItems || items.length;
    pagination.advance();
    loadMoreButton.style.display = pagination.hasMore(totalItems)
      ? "block"
      : "none";
  };

  const search = async (isNewSearch = false) => {
    if (!searchParams.query && !searchParams.category) {
      grid.innerHTML = `<p>Please enter a search term or category.</p>`;
      return;
    }

    if (isNewSearch) showLoading(grid);

    const result = await getSearchResults(
      searchParams.query,
      pagination.getParam(),
      searchParams.maxResults || 10,
      searchParams.category,
      searchParams.extra
    );
    updateResults(grid, result, isNewSearch);
  };

  const loadSaved = async () => {
    showLoading(List);
    const items = await getSavedItems();
    setState(`${entity}Cards`, items);
    updateResults(List, { [resultKey]: items, totalItems: items.length }, true);

    const bar = await createSavedBar();
    const existingBar = document.querySelector(`.saved-${entity}s-bar`);
    if (!existingBar && bar) menuSect.appendChild(bar);

    applyExtraFilters();
    updateCount();
  };

  const handleToggle = async () => {
    showingSaved = !showingSaved;
    const savedBar = document.querySelector(`.saved-${entity}s-bar`);

    if (showingSaved) {
      setState("currentToggle", "saved");
      searchBarElement.style.display = "none";
      grid.style.display = "none";
      savedSect.style.display = "flex";
      if (savedBar) savedBar.style.display = "flex";
      loadMoreButton.style.display = "none";
      await loadSaved();
    } else {
      setState("currentToggle", "search");
      searchBarElement.style.display = "flex";
      grid.style.display = "grid";
      savedSect.style.display = "none";
      if (savedBar) savedBar.style.display = "none";
      grid.innerHTML = "";
      searchBarElement.reset();
      loadMoreButton.style.display = "block";
      search(true);
    }
  };

  const handleItemDeleted = async ({ detail: { id } }) => {
    const cards = getState(`${entity}Cards`) || {};
    if (cards[id]) {
      delete cards[id];
      setState(`${entity}Cards`, cards);
    }

    updateCount();

    const newBar = await createSavedBar();
    const oldBar = document.querySelector(`.saved-${entity}s-bar`);
    if (oldBar) oldBar.replaceWith(newBar);
  };

  const searchBarElement = createSearchBar((params) => {
    searchParams = params;
    pagination.reset();
    search(true);
  });

  toggleButton.addEventListener("click", handleToggle);
  loadMoreButton.addEventListener("click", () => search());
  document.addEventListener(deletedEvent, handleItemDeleted);

  searchBarElement.style.display = "flex";
  toggleSect.appendChild(toggleButton);
  menuSect.appendChild(searchBarElement);
  savedSect.appendChild(List);

  container.append(toggleSect, menuSect, grid, loadMoreButton, savedSect);
  savedSect.style.display = "none";
  search(true);

  return { container, updateResults, showLoading };
};
