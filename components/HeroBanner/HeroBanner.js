import "./HeroBanner.css";

const HeroBanner = () => {
    const article = document.createElement("article")
    article.classList.add("hero-article");
    article.innerHTML= `<img src="/images/booksback.png" alt="" class="hero-book">
                        <h3>What are you reading today</h3>
                        <p>Search some book now!</p>`;

    return article;
}

export default HeroBanner;