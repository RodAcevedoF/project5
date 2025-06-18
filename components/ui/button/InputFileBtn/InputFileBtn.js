import "./InputFileBtn.css";

export const InputFileBtn = () => {
  const div = document.createElement("div");
  div.classList.add("input-file-div");

  div.innerHTML = `
<input type="file" id="profile-image-input" class="form-file-input" name="file" accept="image/*" />
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="input-file-icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
    `;

  return div;
};
