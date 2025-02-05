import QualityList from "../QualityList/QualityList";
import "./Footer.css";

const Footer = () => {
    const foot = document.querySelector("footer");
    foot.innerHTML = `<section class="foot-section">
                        <div class="foot-contact"></div>
                      </section>`;

    const section = foot.querySelector(".foot-section");
    section.insertAdjacentElement("afterbegin", QualityList());

};

export default Footer;