import "./CheckBox.css";

export const CheckBox = (id) => {
  const label = document.createElement("label");
  label.classList.add("neon-checkbox");
  label.setAttribute("for", id);

  label.innerHTML = `
  <input type="checkbox" id=${id} required/>
  <div class="neon-checkbox-frame">
    <div class="neon-checkbox-box">
      <div class="neon-checkbox-check-container">
        <svg viewBox="0 0 24 24" class="neon-checkbox-check">
          <path d="M3,12.5l7,7L21,5"></path>
        </svg>
      </div>
      <div class="neon-checkbox-glow"></div>
      <div class="neon-checkbox-borders">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>
    <div class="neon-checkbox-effects">
      <div class="neon-checkbox-particles">
        <span></span><span></span><span></span><span></span> <span></span
        ><span></span><span></span><span></span> <span></span><span></span
        ><span></span><span></span>
      </div>
      <div class="neon-checkbox-rings">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
      </div>
      <div class="neon-checkbox-sparks">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>
  </div>
  `;

  return label;
};
