import Contact from "../Contact/Contact";
import QualityList from "../QualityList/QualityList";
import "./Footer.css";

const Footer = () => {
    const foot = document.querySelector("footer");
    foot.innerHTML = `<section class="foot-section">
                        <article class="foot-article">
                          <ul class="legal">
                            <li>© 2025 GetDone<li>
                            <li><a href="#null" target="_blank" rel="noopener noreferrer">Privacy</a><li>
                            <li><a href="#null" target="_blank" rel="noopener noreferrer">Terms</a><li>
                            <li><a href="#null" target="_blank" rel="noopener noreferrer">Get in touch</a><li>
                          </ul>
                        </article>
                      </section>`;

    const section = foot.querySelector(".foot-section");
    const article = foot.querySelector(".foot-article");
    section.insertAdjacentElement("afterbegin", QualityList());
    article.insertAdjacentElement("afterbegin" ,Contact());

};

export default Footer;