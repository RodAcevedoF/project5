import "./SignBtn.css";
import { SignLogin } from "../../pages/SignLogin/SignLogin";
import { changePage } from "../../utils/changePage";

export const SignBtn = (idName, txt, formType) => {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("sign-in-button");
  button.id = idName;
  button.textContent = txt;

  button.addEventListener("click", () => {
    if (window.location.pathname === "/signlogin") {
      // Si ya estamos en SignLogin, cambiar solo el formulario sin recargar
      window.dispatchEvent(new CustomEvent("changeForm", { detail: formType }));
    } else {
      // Guardar la elección del usuario antes de cambiar la página
      sessionStorage.setItem("currentForm", formType);
      changePage(SignLogin);
    }
  });

  return button;
};
