import "./Brands.css";
import brandInfo from "../../data/brands";
import { SignBtn } from "../SignBtn/SignBtn";

const Brands = () => {
    const div = document.createElement("div");
    div.classList.add("brand-div")
    div.innerHTML= `<div class="brand-article">
                      <h4>Trusted by hundreds+ of teams</h4>
                      <ul class="brand-ul"></ul>
                    </div>  
                    <h4>Organize is the secret to success</h4>
                    <p>The difference between chaos and seamless workflow.</p>
                    <div class="comparative">
                        <ul class="without">
                          <li>
                            <h5>Without GetDone</h5>
                          </li>
                          <li>
                            <img src="/public/icon/fail.png">
                            <p>Constantly switching apps</p>
                          </li>
                          <li>
                            <img src="/public/icon/fail.png">
                            <p>Manual tracking of tasks</p>
                          </li>
                          <li>
                            <img src="/public/icon/fail.png">
                            <p>Unorganized and chaotic workflows</p>
                          </li>
                          <li>
                            <img src="/public/icon/fail.png">
                            <p>Endless noise and distractions</p>
                          </li>
                        </ul>  
                        <ul class="with">
                          <li>
                            <h5>With GetDone</h5>
                          </li>
                          <li>
                            <img src="/public/icon/check.png">
                            <p>Focused and organized workflows</p>
                          </li>
                          <li>
                            <img src="/public/icon/check.png">
                            <p>Efficient task management</p>
                          </li>
                          <li>
                            <img src="/public/icon/check.png">
                            <p>Seamless integration</p>
                          </li>
                          <li>
                            <img src="/public/icon/check.png">
                            <p>All-in-one</p>
                          </li>
                        </ul>
                    </div>`;

    const ul = div.querySelector(".brand-ul");
    for (let brand of brandInfo) {
        let newLi = document.createElement("li");
        newLi.innerHTML = `<img src=${brand.url} class="${brand.className} logo">`;
        ul.appendChild(newLi);
    }
    div.appendChild(SignBtn("last-sign-in", "Get Started for free! ►"));
    return div;
}

export default Brands;