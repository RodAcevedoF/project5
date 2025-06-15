import "./NotFound.css";
import { BackBtn } from "../../components";

const NotFound = () => {
  const main = document.querySelector("main");
  const sect = document.createElement("section");
  sect.classList.add("not-found-container");
  const btn = BackBtn("/");
  sect.innerHTML = `
                    <div class="scanlines"></div>
                    <div class="intro-wrap">
	                    <div class="noise"></div>
	                    <div class="noise noise-moving"></div>
                      <div class="play" data-splitting>PLAY</div>
	                    <div class="time">--:--</div>
	                    <div class="recordSpeed">SLP 0:00:00</div>
                    </div>
                    <div class="notfound-message-div">
                      <h2>404</h2>
                      <h4>Route not found</h4>
                      <div class="notfound-inner-div">
                        <img src="/icon/list.png" alt="getdone logo">
                      </div>
                    </div>
                    `;
  const messageDiv = sect.querySelector(".notfound-inner-div");
  messageDiv.appendChild(btn);
  main.appendChild(sect);
  document.querySelector("footer").style.display = "none";
  document.querySelector("header").style.display = "none";
  return main;
};

export default NotFound;
