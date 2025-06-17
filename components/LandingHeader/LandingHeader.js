import "./LandingHeader.css";

const LandingHeader = () => {
  const div = document.createElement("div");
  div.classList.add("general-test-container");

  div.innerHTML = `
    <div class="anime-card" id="anime-card">
      <h1 class="main-txt text-uppercase">Organization is the key to unlock productivity</h1>
      <img class="big-cloud" src="/images/bigcloud.png" alt="big cloud image">
      <img class="small-cloud" src="/images/smallcloud.png" alt="small cloud image"> 
      <div class="icons-landing">
        <img class="landing-header-icons" src="/images/calculatoricon.png" alt="calculator image">
        <img class="landing-header-icons" src="/images/calendaricon.png" alt="calendar image">
        <img class="landing-header-icons" src="/images/erasericon.png" alt="calculator image">
        <img class="landing-header-icons" src="/images/pencilicon.png" alt="calculator image">
        <img class="landing-header-icons" src="/images/notebookicon.png" alt="calculator image">
        <img class="landing-header-icons" src="/images/clockicon.png" alt="calculator image">
      </div>
    </div>
  `;
  return div;
};

export default LandingHeader;
