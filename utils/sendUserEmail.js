import emailjs from "@emailjs/browser";

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_VERIFY_TEMPLATE;

emailjs.init(publicKey);

export const sendUserEmail = async ({
  email,
  name,
  token,
  mode = "verify"
}) => {
  try {
    const frontendBase = window.location.origin;
    const backendBase = import.meta.env.VITE_BACKEND_EMAIL_BASE;

    const link =
      mode === "verify"
        ? `${backendBase}/verify?token=${token}`
        : `${frontendBase}/?token=${token}&email=${encodeURIComponent(email)}`;

    const message =
      mode === "verify"
        ? `Click the link below to verify your account:\n\n${link}`
        : `Click the link below to reset your password:\n\n${link}`;

    const templateParams = {
      to_name: name || "User",
      email_id: email,
      message
    };

    await emailjs.send(serviceID, templateID, templateParams);
  } catch (error) {
    console.error(`Error sending email (${mode}):`, error);
    throw new Error(`Failed to send ${mode} email`);
  }
};
