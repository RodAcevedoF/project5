import "./HeroBanner.css";

const HeroBanner = (txtObj) => {
  const article = document.createElement("article");
  article.classList.add("hero-article");

  const messageList = txtObj.messages.map((m) => `<li>${m}</li>`).join("");

  article.innerHTML = `
    <div class="title-div">
      <h3>${txtObj.header}</h3>
      <ul>
        ${messageList}
      </ul>
    </div>
  `;

  return article;
};

export default HeroBanner;
