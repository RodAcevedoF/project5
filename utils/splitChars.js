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

export const splitCharsWords = (element) => {
  const text = element.textContent.trim();
  element.innerHTML = "";

  const words = text.split(" ");
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement("span");
    wordSpan.classList.add("word");
    for (const char of word) {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      charSpan.classList.add("char");
      wordSpan.appendChild(charSpan);
    }

    element.appendChild(wordSpan);

    if (wordIndex < words.length - 1) {
      const space = document.createElement("span");
      space.innerHTML = "&nbsp;";
      space.classList.add("char-space");
      element.appendChild(space);
    }
  });
};
