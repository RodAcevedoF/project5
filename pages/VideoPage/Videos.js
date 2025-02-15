//import "./Videos.css";
import { VideoGrid } from "../../components/VideoGrid/VideoGrid.js";
import HeroBanner from "../../components/HeroBanner/HeroBanner.js";

export const Videos = () => {
  const main = document.querySelector("main");
  main.innerHTML = `<section class="video-main"></section>`;
  const div = document.createElement("div")
  const section = main.querySelector(".video-main");
  section.appendChild(HeroBanner());

  const videoGrid = VideoGrid();

  section.appendChild(videoGrid.container);

  return main;
};
