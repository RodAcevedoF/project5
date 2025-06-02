/**
 * Envía un mail al usuario con EmailJS
 * @param {string} email - Email del usuario
 * @param {string} name - Nombre del usuario
 * @param {string} token - Token generado por backend
 * @param {"verify" | "reset"} mode - Tipo de mensaje a enviar
 * @returns {Promise<void>}
 */

import emailjs from "@emailjs/browser";

const serviceID = "service_hzpaiyd";
const templateID = "template_1irdetr";
const publicKey = "64s8LY0LFxfWYJTrH";

emailjs.init(publicKey);

export const sendUserEmail = async ({
  email,
  name,
  token,
  mode = "verify"
}) => {
  try {
    const frontendBase = window.location.origin;
    const backendBase = "https://service.todo-api.site/api/security";

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
