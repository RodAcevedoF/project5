import "./HeroBanner.css";

const HeroBanner = (txt) => {
    const article = document.createElement("article")
    article.classList.add("hero-article");
    article.innerHTML= `<div class="title-div">
                        <h3>${txt}</h3>
                        </div>`
    return article;
}

export default HeroBanner;