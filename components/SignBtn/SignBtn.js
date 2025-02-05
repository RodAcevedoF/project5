import { SignLogin } from "../../pages/SignLogin/SignLogin";
import { changePage } from "../../utils/changePage";
import "./SignBtn.css";

export const SignBtn = (idName, txt) => {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("sign-in-button");
    button.id = idName;
    button.textContent = txt;
    button.addEventListener("click", () => {
        changePage(SignLogin);
    });

    return button;
    
}