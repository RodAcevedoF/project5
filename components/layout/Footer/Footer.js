import "./Footer.css";
import { Contact, MailBtn, QualityList } from "../../../components";

const Footer = () => {
  const foot = document.querySelector("footer");
  foot.innerHTML = `<section class="foot-section">
                        <article class="foot-article">
                          <ul class="legal">
                            <li>© 2025 GetDone<li>
                            <li><a href="#null" target="_blank" rel="noopener noreferrer">Privacy</a><li>
                            <li><a href="#null" target="_blank" rel="noopener noreferrer">Terms</a><li>
                            <li class="mail-li"><li>
                          </ul>
                        </article>
                      </section>`;

  const section = foot.querySelector(".foot-section");
  const article = foot.querySelector(".foot-article");
  const mailLi = foot.querySelector(".mail-li");
  section.insertAdjacentElement("afterbegin", QualityList());
  article.insertAdjacentElement("afterbegin", Contact());

  mailLi.appendChild(MailBtn("Get in touch"));
};

export default Footer;
