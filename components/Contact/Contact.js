import "./Contact.css";
import ImgBtn from "../ImgBtn/ImgBtn";

const Contact = () => {
    const div = document.createElement("div");
    div.classList.add("foot-contact");
    div.innerHTML = `<h5>Contact</h5>
                     <ul>
                       <li>${ImgBtn("linkedin", "/icon/linkedin.png", "linkedin.com")}</li>
                       <li>${ImgBtn("x", "/icon/twitter.png", "x.com")}</li>
                       <li>${ImgBtn("instagram", "/icon/instagram.png", "instagram.com")}</li>
                       <li>${ImgBtn("microsoft", "../../public/images/getMicrosoft.png", "microsoft.com")}</li>
                     </ul>`;
    return div;
};

export default Contact;