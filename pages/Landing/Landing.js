import "./Landing.css";
import { LoginForm } from "../../components/LoginForm/LoginForm.js";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm.js";
import { SignBtn } from "../../components/SignBtn/SignBtn.js";
import { isAuthenticated } from "../../utils/isAuthenticated.js";
import { changePage } from "../../utils/changePage.js";
import { Home } from "../Home/Home.js";
import Brands from "../../components/Brands/Brands.js";
export const Landing = () => {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="landing">
        <article class="landing-container">
          <img src="/images/gradient.png" alt="background img" class="back-landing">
          <div class="landing-box">
            <p>GetDone tasks</p>
            <h1>Welcome to <em>GetDone</em> App</h1>
            <p>Plan and organize your tasks and study goals.</p>
            <div class="alt-login">
              <div>
                <p>Free forever.</p>
                <p>No credit card.</p>
              </div>
            </div>
            <div class="reviews">
              <img src="/images/stars.png" alt="4.5 stars" class="stars">
              <p>5000+ reviews from</p>
              <img src="/images/reviewApps.png" alt="review apps" class="rev-apps">
            </div>
          </div> 
         <img src="/images/gradient.png" alt="background img" class="back-landing">
        </article>
        <article class="article-exp">
        </article>
    </section>
  `;

  const divAltLogin = main.querySelector(".alt-login");
  divAltLogin.insertAdjacentElement(
    "afterbegin",
    SignBtn("sign-in-alt", "Get Started ►", "register")
  );
  const articleExp = main.querySelector(".article-exp");
  articleExp.appendChild(Brands());
};
