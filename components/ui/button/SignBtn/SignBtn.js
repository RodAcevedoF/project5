import "./SignBtn.css";
import { setState, getState, navigate } from "../../../../utils";

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
      navigate(`/login?form=${formType}`);
    }
  });

  return button;
};
