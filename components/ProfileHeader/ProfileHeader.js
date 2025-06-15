import "./ProfileHeader.css";
import displayNick from "../../utils/displayNickname";
import gsap from "gsap";
import { DefaultAvatar } from "..";
import { splitChars } from "../../utils/splitChars";

export const ProfileHeader = (user) => {
  const header = document.createElement("header");
  header.classList.add("profile-header");
  const nickname = displayNick(user.nickname);
  const avatar = DefaultAvatar("header", user);

  header.innerHTML = `
            <div>
              <p class="title-profile">Profile</p>
            </div>
            <div class="profile-header-body" id="profile-card">
              <p class="profile-header-nick">${nickname}</p>
              <div class="hover-profile-header">
                <h2>${user.name}</h2>
              </div>
            </div>
            <div class="divider"></div>
            <ul class="profile-nav">
              <li id="edit-profile">Edit profile</li>
              <li id="activity-profile">Activity</li>
              <li id="settings-profile">Settings</li>
            </ul>`;

  const card = header.querySelector(".profile-header-body");
  const hoverProfile = header.querySelector(".hover-profile-header");
  hoverProfile.insertAdjacentElement("afterbegin", avatar);

  let flipped = false;

  card.addEventListener("mouseenter", () => {
    if (flipped) return;
    flipped = true;
    gsap.to(card, {
      rotateY: 180,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    if (!flipped) return;
    flipped = false;
    gsap.to(card, {
      rotateY: 0,
      duration: 0.3,
      ease: "power2.inOut"
    });
  });

  const title = header.querySelector(".title-profile");
  splitChars(title);
  const chars = title.querySelectorAll(".char");
  requestAnimationFrame(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(chars, {
      y: () => gsap.utils.random(-150, 150),
      x: () => gsap.utils.random(-150, 150),
      rotate: gsap.utils.random(-360, 360),
      scale: gsap.utils.random(0, 2),
      opacity: 0,
      duration: 0.2,
      stagger: 0.2,
      delay: 0.2
    });
    chars.forEach((char, index) => {
      const charsHover = () => {
        gsap.timeline();
        gsap.to(char, {
          y: () => gsap.utils.random(-100, 100),
          x: () => gsap.utils.random(-100, 100),
          rotate: gsap.utils.random(-180, 180),
          scale: gsap.utils.random(0, 2),
          color: `rgb(${gsap.utils.random(0, 255)}, ${gsap.utils.random(
            0,
            255
          )}, ${gsap.utils.random(0, 255)})`,
          onComplete: () => {
            char.removeEventListener("mouseenter", charsHover);
          }
        });

        gsap.to(char, {
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1,
          delay: 0.5,
          color: "inherit",
          onComplete: () => {
            char.addEventListener("mouseenter", charsHover);
          }
        });
      };
      char.addEventListener("mouseenter", charsHover);
    });
  });

  return header;
};
