import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initLandingAnimations = () => {
  // inicio header
  gsap.fromTo(
    ".landing-header",
    { opacity: 0, yPercent: 30 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      ease: "power2.out"
    }
  );

  //independientes
  gsap.to(".landing-ideas-li img", {
    y: -10,
    duration: 1.5,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.to(".big-cloud", {
    xPercent: 25,
    duration: 4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.to(".small-cloud", {
    xPercent: -20,
    duration: 4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.to(".landing-header-icons", {
    yPercent: -20,
    duration: 1,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.to(".brand-ul li", {
    y: -5,
    duration: 1,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: {
      amount: 1.5,
      from: "start"
    }
  });
  gsap.to(".without li img", {
    scale: 1.2,
    duration: 0.25,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: {
      amount: 0.5,
      from: "start"
    }
  });
  gsap.to(".with li img", {
    scale: 1.3,
    duration: 0.25,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: {
      amount: 0.5,
      from: "start"
    }
  });

  ScrollTrigger.create({
    trigger: ".landing",
    start: "top top",
    end: "1%",
    scrub: true,
    onUpdate: (self) => {
      if (self.progress === 1) {
        gsap.to(".landing-header", {
          opacity: 0,
          yPercent: -30,
          duration: 0.6,
          ease: "power2.inOut"
        });
      } else if (self.progress === 0) {
        gsap.to(".landing-header", {
          opacity: 1,
          yPercent: 0,
          duration: 0.6,
          ease: "power2.inOut"
        });
      }
    }
  });

  // tl general
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing",
      start: "top top",
      end: "+=240%",
      scrub: true,
      pin: true
    }
  });

  // 1
  tl.fromTo(
    ".landing-header-ideas",
    { opacity: 0, yPercent: 30 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      ease: "power2.inOut"
    }
  );

  tl.from(
    ".landing-ideas-li",
    {
      opacity: 0,
      y: 40,
      x: 50,
      scale: 1.2,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.3
    },
    "<+0.2"
  );

  tl.to(".landing-header-ideas", {
    opacity: 0,
    yPercent: -30,
    duration: 0.8,
    ease: "power2.inOut"
  });

  // 2
  tl.fromTo(
    ".landing-box",
    { opacity: 0, yPercent: 30 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      ease: "power2.inOut"
    }
  );

  tl.from(
    ".landing-card h1",
    {
      opacity: 0,
      x: -100,
      scale: 1.2,
      duration: 0.8,
      ease: "power2.out"
    },
    "<+0.4"
  );

  tl.from(
    ".landing-card p:not(.reviews p)",
    {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    },
    "<+0.1"
  );

  tl.from(
    ".reviews",
    {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: "power2.out"
    },
    "<+0.2"
  );
  // fin
  tl.to({}, { duration: 0.6 });
};

export const destroyLandingAnimations = () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.globalTimeline.clear();
};
