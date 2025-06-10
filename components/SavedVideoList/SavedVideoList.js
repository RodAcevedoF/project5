import "./SavedVideoList.css";
import { getVideos } from "../../api/videoApi";
import { VidListElement } from "..";
const SavedVideoList = () => {
  const ul = document.createElement("ul");
  ul.classList.add("saved-vid-list");
  ul.setAttribute("role", "list");
  setTimeout(async () => {
    const { data: videos } = await getVideos();
    videos.forEach((video) => {
      let elem = VidListElement(video);
      ul.appendChild(elem);
    });
  });

  return ul;
};

export default SavedVideoList;
