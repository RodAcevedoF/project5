//import "./Videos.css";
import { VideoGrid } from "../../components/VideoGrid/VideoGrid.js";
import HeroBanner from "../../components/HeroBanner/HeroBanner.js";
import InnerFooter from "../../components/InnerFooter/InnerFooter.js";

export const Videos = () => {
  const main = document.querySelector("main");
  main.innerHTML = `<section class="video-main"></section>`;
  const section = main.querySelector(".video-main");
  section.appendChild(HeroBanner("/images/videosBan.png"));

  const videoGrid = VideoGrid();

  section.appendChild(videoGrid.container);
  section.appendChild(InnerFooter());

  return main;
};
