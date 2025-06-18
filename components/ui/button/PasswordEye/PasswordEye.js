import "./PasswordEye.css";

export const PasswordEye = (input, className) => {
  const img = document.createElement("img");
  img.classList.add(`${className}-eye`, "template-eye");
  const srcClosed = "/icon/closedeye.png";
  const srcOpen = "/icon/eye.png";
  img.src = srcClosed;
  img.alt = `${className} icon`;

  img.addEventListener("click", () => {
    if (input.type === "password") {
      img.src = srcOpen;
      input.type = "text";
    } else {
      img.src = srcClosed;
      input.type = "password";
    }
  });
  return img;
};
