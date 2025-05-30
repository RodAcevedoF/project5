import "./NotFound.css";

const NotFound = () => {
  const sect = document.createElement("section");
  sect.classList.add("not-found-container");

  sect.innerHTML = `
                    <div class="scanlines"></div>
                    <div class="intro-wrap">
	                  <div class="noise"></div>
	                  <div class="noise noise-moving"></div>
                      <div class="play" data-splitting>PLAY</div>
	                  <div class="time">--:--</div>
	                  <div class="recordSpeed">SLP 0:00:00</div>
                    </div>`;
};
