import "./Brands.css";
import brandInfo from "../../../data/brands";
import { SignBtn } from "../../../components";
/* import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger); */
import { animationBrand, animationTitle } from "../../../components";

const Brands = () => {
  const sect = document.createElement("section");
  sect.classList.add("brand-div");
  sect.innerHTML = `<div class="brand-article">
                      <h4>Trusted by hundreds+ of teams</h4>
                      <ul class="brand-ul"></ul>
                    </div>  
                    <div class="brand-subtitle">
                      <h4>Just simple organization</h4>
                      <p>The difference between chaos and seamless workflow.</p>
                    </div>
                    <div>
                    <div class="comparative">
                        <ul class="without">
                          <li>
                            <h5>Without GetDone</h5>
                          </li>
                          <li>
                            <img src="/icon/fail.png">
                            <p>Constantly switching apps</p>
                          </li>
                          <li>
                            <img src="/icon/fail.png">
                            <p>Manual tracking of tasks</p>
                          </li>
                          <li>
                            <img src="/icon/fail.png">
                            <p>Unorganized and chaotic workflows</p>
                          </li>
                          <li>
                            <img src="/icon/fail.png">
                            <p>Endless noise and distractions</p>
                          </li>
                        </ul>  
                        <ul class="with">
                          <li>
                            <h5>With GetDone</h5>
                          </li>
                          <li>
                            <img src="/icon/check.png">
                            <p>Focused and organized workflows</p>
                          </li>
                          <li>
                            <img src="/icon/check.png">
                            <p>Efficient task management</p>
                          </li>
                          <li>
                            <img src="/icon/check.png">
                            <p>Seamless integration</p>
                          </li>
                          <li>
                            <img src="/icon/check.png">
                            <p>All-in-one</p>
                          </li>
                        </ul>
                    </div>`;

  const ul = sect.querySelector(".brand-ul");
  for (let brand of brandInfo) {
    let newLi = document.createElement("li");
    newLi.innerHTML = `<img src=${brand.url} class="${brand.className} logo">`;
    ul.appendChild(newLi);
  }
  sect.appendChild(
    SignBtn("last-sign-in", "Get Started for free! ►", "register")
  );
  const subtitle = sect.querySelector(".brand-subtitle h4");
  requestAnimationFrame(() => {
    animationBrand();
    animationTitle(subtitle, "brand-subtitle", true);
  });
  return sect;
};

export default Brands;
