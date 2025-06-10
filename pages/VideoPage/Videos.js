import "./Videos.css";
import { HeroBanner, InnerFooter, VideoGrid } from "../../components";

export const Videos = () => {
  const main = document.querySelector("main");
  main.innerHTML = `<section class="video-main"></section>`;
  const section = main.querySelector(".video-main");

  const videoGrid = VideoGrid();
  const hero = HeroBanner({
    header: "Videos",
    messages: ["Search videos", "Save videos", "Watch videos"]
  });

  section.appendChild(hero);
  section.appendChild(videoGrid.container);
  section.appendChild(InnerFooter());

  return main;
};
