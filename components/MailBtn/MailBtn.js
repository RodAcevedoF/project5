import "./MailBtn.css";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { CloseBtn } from "..";

export const MailBtn = (txt) => {
  const divFooterMail = document.createElement("div");
  divFooterMail.innerHTML = `
    <button type="button" class="mail-button">${txt}</button>
    <form id="mailform" class="mail-pop-form">
      ${CloseBtn}
      <div class="mail-field">
        <label for="from_name">Contact Name</label>
        <input type="text" name="from_name" id="from_name" placeholder="What's your name?" required>
      </div>
      <div class="mail-field">
        <label for="message">Your Message</label>
        <textarea name="message" id="message" placeholder="Leave me a message" rows="4" required></textarea>
      </div>
      <div class="mail-field">
        <label for="email_id">Your Email</label>
        <input type="email" name="email_id" id="email_id" placeholder="I'll reply ASAP!" required>
      </div>
      <input type="submit" id="send-mail-button" value="Send Email">
    </form>
    <div class="mail-overlay"></div>
  `;

  const serviceID = "service_hzpaiyd";
  const templateID = "template_le1zewq";
  const publicKey = "64s8LY0LFxfWYJTrH";

  emailjs.init(publicKey);

  const btn = divFooterMail.querySelector("#send-mail-button");
  const mailForm = divFooterMail.querySelector("#mailform");
  const mailBtn = divFooterMail.querySelector(".mail-button");
  const overlay = divFooterMail.querySelector(".mail-overlay");
  const closeBtn = divFooterMail.querySelector(".outer-close");

  mailBtn.addEventListener("click", () => {
    mailForm.classList.toggle("get-form");
    overlay.classList.toggle("visible");
  });

  overlay.addEventListener("click", () => {
    mailForm.classList.toggle("get-form");
    overlay.classList.toggle("visible");
  });

  closeBtn.addEventListener("click", () => {
    mailForm.classList.toggle("get-form");
    overlay.classList.toggle("visible");
  });

  mailForm.addEventListener("submit", (ev) => {
    ev.preventDefault();

    btn.value = "Sending...";

    emailjs.sendForm(serviceID, templateID, mailForm).then(
      () => {
        btn.value = "Send Email";
        Swal.fire({
          icon: "success",
          text: "Email sent successfully!"
        });
        mailForm.reset();
        mailForm.classList.toggle("get-form");
        overlay.classList.toggle("visible");
      },
      (err) => {
        btn.value = "Send Email";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
        mailForm.classList.toggle("get-form");
        overlay.classList.toggle("visible");
        console.log(JSON.stringify(err));
      }
    );
  });

  return divFooterMail;
};
