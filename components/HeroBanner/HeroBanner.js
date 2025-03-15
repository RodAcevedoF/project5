import "./HeroBanner.css";

const HeroBanner = (src, txt) => {
    const article = document.createElement("article")
    article.classList.add("hero-article");
    article.innerHTML= `<div class="title-div">
                        <h3>What are you reading today?</h3>
                        <p>Search some books now!</p>
                        </div>
                        <img src=${src} alt="${txt} banner" class="hero-img">`;

    return article;
}

export default HeroBanner;