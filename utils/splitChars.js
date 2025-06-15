export const splitChars = (element) => {
  const text = element.textContent.trim();
  element.innerHTML = "";
  for (const char of text) {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("char");
    element.appendChild(span);
  }
};
