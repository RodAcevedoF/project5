import "./SignBtn.css";
import { SignLogin } from "../../pages/SignLogin/SignLogin.js";
import { setState, getState } from "../../utils/state.js";
import { changePage } from "../../utils/changePage.js";

export const SignBtn = (idName, txt, formType) => {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("sign-in-button");
  button.id = idName;
  button.textContent = txt;

  button.addEventListener("click", () => {
    const currentPage = getState("currentPage");

    if (currentPage === "signlogin") {
      window.dispatchEvent(new CustomEvent("changeForm", { detail: formType }));
    } else {
      setState("currentForm", formType);
      changePage(SignLogin, "signlogin");
    }
  });

  return button;
};
