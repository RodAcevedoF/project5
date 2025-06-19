import "./LandingCard.css";
import { SignBtn } from "../../../../components";

const LandingCard = () => {
  const art = document.createElement("article");
  art.classList.add("landing-card");

  art.innerHTML = `<p>Give it a try!</p>
                   <p>Welcome to</p>
                   <h1><em>GetDone</em> App</h1>
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
                   </div>`;

  const divAltLogin = art.querySelector(".alt-login");
  divAltLogin.insertAdjacentElement(
    "afterbegin",
    SignBtn("sign-in-alt", "Get Started ►", "register")
  );

  return art;
};

export default LandingCard;
