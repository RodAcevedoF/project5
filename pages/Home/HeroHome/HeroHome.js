import "./HeroHome.css";

const HeroHome = () => {
  const sect = document.createElement("section");
  sect.classList.add("section-bg");
  sect.innerHTML = `
  <div class='air air1'></div>
  <div class='air air2'></div>
  <div class='air air3'></div>
  <div class='air air4'></div>
  <h1>Welcome to GetDone!</h1>
    `;
  return sect;
};

export default HeroHome;
