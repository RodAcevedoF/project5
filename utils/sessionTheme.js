export const checkSessionTheme = () => {
  if (sessionStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};
