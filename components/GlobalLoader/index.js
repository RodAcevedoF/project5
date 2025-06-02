import "./GlobalLoader.css";

export const showGlobalLoader = () => {
  let loader = document.getElementById("global-loader");
  if (!loader) {
    loader = document.createElement("div");
    loader.id = "global-loader";
    loader.innerHTML = `
    <div class="hacker-loader">
      <div class="loader-text">
        <span data-text="Initializing..." class="text-glitch">Initializing...</span>
      </div>
      <div class="loader-bar">
        <div class="bar-fill"></div>
        <div class="bar-glitch"></div>
      </div>
      <div class="particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
      </div>
    </div>
    `;
    document.body.appendChild(loader);
  }
};

export const hideGlobalLoader = () => {
  const loader = document.getElementById("global-loader");
  if (loader) {
    loader.classList.add("hidden");
    setTimeout(() => loader.remove(), 300);
  }
};
