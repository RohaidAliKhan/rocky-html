let scroll;
let mm = gsap.matchMedia();
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(Flip, ScrollTrigger, CustomEase, CustomWiggle);

  smoothScrolling();
  toggleSound();
  navigationToggle();
  swagSlider();
  countDownTimer();
  initMarqueeScrollV2();
  bellAnimation();
  stickyScrollContentFade();

  // setTimeout(() => {
  //   scroll.start();
  // }, 150);

  // flipLogo();
  Fancybox.bind("[data-fancybox]", {});
  ScrollTrigger.refresh();
});

function flipLogo() {
  const section = document.querySelector(".hero-section.is-home");
  if (!section) return;
  mm.add("(min-width: 1024px)", () => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".navbar",
        start: "top top",
        end: "+=15%",
        scrub: true,
        // markers: true,
        onLeave: () => gsap.set("#main-logo", { pointerEvents: "auto" }),
        onEnterBack: () => gsap.set("#main-logo", { pointerEvents: "none" }),
        onLeaveBack: () => gsap.set("#main-logo", { pointerEvents: "none" }),
      },
    });
    tl.from("#main-logo img", {
      y: "15vw",
      scale: 8.8,
      ease: "none",
    }).from(".video-container", { marginTop: "24vw" }, "<");
  });
}

function smoothScrolling() {
  mm.add("(min-width: 1025px)", () => {
    scroll = new Lenis({
      autoRaf: true,
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        scroll.scrollTo(this.getAttribute("href"));
      });
    });

    // scroll.scrollTo("top");

    // if (window.location.hash) {
    //   const target = document.querySelector(window.location.hash);
    //   if (target) {
    //     setTimeout(() => {
    //       scroll.scrollTo(target);
    //     }, 100);
    //   }
    // }
  });
}

function navigationToggle() {
  // Toggle Navigation
  document
    .querySelector('[data-navigation-toggle="toggle"]')
    .addEventListener("click", function () {
      const navStatus = document.querySelector("[data-navigation-status]");
      const currentStatus = navStatus.getAttribute("data-navigation-status");

      if (currentStatus === "not-active" || currentStatus === "hover") {
        navStatus.setAttribute("data-navigation-status", "active");
        scroll?.stop();
      } else {
        navStatus.setAttribute("data-navigation-status", "not-active");
      }
    });

  const hamburger = document.querySelector(
    '.hamburger[data-navigation-toggle="toggle"]'
  );
  if (hamburger) {
    hamburger.addEventListener("mouseover", function () {
      document
        .querySelector("[data-navigation-status]")
        .setAttribute("data-navigation-status", "hover");
    });

    hamburger.addEventListener("mouseleave", function () {
      const navStatus = document.querySelector("[data-navigation-status]");
      if (navStatus.getAttribute("data-navigation-status") === "hover") {
        navStatus.setAttribute("data-navigation-status", "not-active");
      }
    });
  }

  // Close Navigation
  const closeNavs = document.querySelectorAll(
    '[data-navigation-toggle="close"]'
  );
  closeNavs.forEach((close) => {
    if (close) {
      close.addEventListener("click", function (e) {
        document
          .querySelector("[data-navigation-status]")
          .setAttribute("data-navigation-status", "not-active");
        scroll?.start();
      });
    }
  });

  // Key ESC - Close Navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const navStatus = document.querySelector("[data-navigation-status]");
      if (navStatus.getAttribute("data-navigation-status") === "active") {
        navStatus.setAttribute("data-navigation-status", "not-active");
        scroll?.start();
      }
    }
  });
}

function bellAnimation() {
  const section = document.querySelector(".launch-section");
  if (!section) return;
  const svg = section?.querySelector("svg");
  const bell = svg.querySelector("#bell");
  let tl = gsap.timeline({
    paused: true,
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      // markers: true,
      toggleActions: "play resume none reset",
    },
  });

  gsap.set(bell, { transformOrigin: "center top" });
  tl.to(bell, {
    rotation: -20,
    duration: 3,
    ease: CustomWiggle.create("wiggle", { wiggles: 4, type: "easeOut" }),
  }).to(
    "#bell-circle",
    {
      x: -20,
      duration: 3,
      ease: CustomWiggle.create("bell-circle", { wiggles: 6, type: "easeOut" }),
    },
    "<"
  );
}

function swagSlider() {
  const section = document.querySelector(".swag-section");
  if (!section) return;
  const nextBtn = document.querySelector(".button-next");
  const swiper = new Swiper(".swiper", {
    loop: true,
    speed: 800,
    slidesPerView: 1,
    navigation: {
      nextEl: nextBtn,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.3,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
  });

  let targetElementSVG = nextBtn.querySelector(".arrow-bg");

  if (nextBtn && targetElementSVG) {
    let tl = gsap.timeline({
      paused: true,
    });

    tl.to(targetElementSVG, {
      rotation: 18,
      transformOrigin: "center",
      duration: 0.3,
      repeat: -1,
      ease: "none",
    });

    nextBtn.addEventListener("mouseenter", () => {
      tl.restart();
    });

    nextBtn.addEventListener("mouseleave", () => {
      tl.kill();
    });
  }
}

function toggleSound() {
  document.querySelectorAll("[data-sound-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      let audioStatusElement = document.querySelector("[data-audio-status]");
      let audioElement = document.getElementById("audio");
      let status = audioStatusElement.getAttribute("data-audio-status");
      if (status === "not-active" || status === "not-started") {
        audioStatusElement.setAttribute("data-audio-status", "active");
        audioElement.setAttribute("data-audio-status", "active");
        audioElement.currentTime = 0;
        audioElement.volume = 0.5;
        audioElement.play();
      } else {
        audioStatusElement.setAttribute("data-audio-status", "not-active");
        audioElement.currentTime = 0;
        audioElement.volume = 0;
      }
    });
  });
  //   document.querySelector("[data-sound-toggle]").addEventListener("click", function () {
  //     let audioStatusElement = document.querySelector("[data-audio-status]");
  //     let audioElement = document.getElementById("audio");
  //     if (audioStatusElement.getAttribute("data-audio-status") === "not-started") {
  //       audioElement.currentTime = 0;
  //       audioElement.volume = 0.5;
  //       audioElement.play();
  //       audioStatusElement.setAttribute("data-audio-status", "active");
  //     }
  //     if (audioStatusElement.getAttribute("data-audio-status") === "not-active") {
  //       audioStatusElement.setAttribute("data-audio-status", "active");
  //       audioElement.setAttribute("data-audio-status", "active");
  //       audioElement.currentTime = 0;
  //       audioElement.volume = 0.5;
  //       audioElement.play();
  //     } else {
  //       audioStatusElement.setAttribute("data-audio-status", "not-active");
  //       audioElement.currentTime = 0;
  //       audioElement.volume = 0;
  //     }
  //   });
}

function initMarqueeScrollV2() {
  $("[data-marquee-target]").each(function () {
    let marquee = $(this);

    let marqueeItemsWidth = marquee.find(".marquee-content").width();
    let marqueeSpeed =
      marquee.attr("data-marquee-speed") *
      (marqueeItemsWidth / $(window).width());

    // Speed up Marquee on Tablet & Mobile
    if ($(window).width() <= 540) {
      marqueeSpeed = marqueeSpeed * 0.25;
    } else if ($(window).width() <= 1024) {
      marqueeSpeed = marqueeSpeed * 0.5;
    }

    let marqueeDirection;
    if (marquee.attr("data-marquee-direction") == "right") {
      marqueeDirection = -1;
    } else {
      marqueeDirection = 1;
    }

    let marqueeContent = gsap
      .to(marquee.find(".marquee-content"), {
        xPercent: -100,
        repeat: -1,
        duration: marqueeSpeed,
        ease: "linear",
        paused: true,
      })
      .totalProgress(0.5);

    gsap.set(marquee.find(".marquee-content"), { xPercent: 50 });

    ScrollTrigger.create({
      trigger: marquee,
      start: "top bottom",
      end: "bottom top",
      onUpdate(self) {
        if (self.direction !== marqueeDirection) {
          marqueeDirection *= -1;
          if (marquee.attr("data-marquee-direction") == "right") {
            gsap.to([marqueeContent], {
              timeScale: marqueeDirection * -1,
              overwrite: true,
            });
          } else {
            gsap.to([marqueeContent], {
              timeScale: marqueeDirection,
              overwrite: true,
            });
          }
        }
        self.direction === -1
          ? marquee.attr("data-marquee-status", "normal")
          : marquee.attr("data-marquee-status", "inverted");
      },
      onEnter: () => marqueeContent.play(),
      onEnterBack: () => marqueeContent.play(),
      onLeave: () => marqueeContent.play(),
      onLeaveBack: () => marqueeContent.play(),
    });

    // Extra speed on scroll
    marquee.each(function () {
      let triggerElement = $(this);
      let targetElement = $(this).find(".marquee-scroll");
      let marqueeScrollSpeed = $(this).attr("data-marquee-scroll-speed");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "0% 100%",
          end: "100% 0%",
          scrub: 0,
          // markers: true,
        },
      });

      if (triggerElement.attr("data-marquee-direction") == "left") {
        tl.fromTo(
          targetElement,
          {
            x: marqueeScrollSpeed + "vw",
          },
          {
            x: marqueeScrollSpeed * -1 + "vw",
            ease: "none",
          }
        );
      }

      if (triggerElement.attr("data-marquee-direction") == "right") {
        tl.fromTo(
          targetElement,
          {
            x: marqueeScrollSpeed * -1 + "vw",
          },
          {
            x: marqueeScrollSpeed + "vw",
            ease: "none",
          }
        );
      }
    });
  });
}

function countDownTimer() {
  const SECOND = 1000,
    MINUTE = SECOND * 60,
    HOUR = MINUTE * 60,
    DAY = HOUR * 24;

  // Get the countdown date from a WordPress custom field (assuming it's in a div with ID 'countdown-date')
  let countdownElement = document.getElementById("countdown-date");
  let countdownDateString = countdownElement
    ? countdownElement.getAttribute("data-countdown")
    : "Nov 8, 2025 07:00:00 GMT-0500";

  let countDown = new Date(countdownDateString).getTime();

  let x = setInterval(function () {
    let now = new Date().getTime(),
      distance = countDown - now;

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown-timer").innerHTML = "Time's Up!";
      return;
    }

    document.getElementById("days").innerHTML = Math.floor(distance / DAY);
    document.getElementById("hours").innerHTML = Math.floor(
      (distance % DAY) / HOUR
    );
    document.getElementById("minutes").innerHTML = Math.floor(
      (distance % HOUR) / MINUTE
    );
    document.getElementById("seconds").innerHTML = Math.floor(
      (distance % MINUTE) / SECOND
    );
  }, SECOND);
}

function stickyScrollContentFade() {
  const section = document.querySelector(".gear-section");
  if (!section) return;
  const contents = section.querySelectorAll(".gear-content");
  const visuals = section.querySelectorAll(".is-desktop .gear-visual .overlay");

  mm.add("(min-width: 768px)", () => {
    console.log("tag");
    const activateVisual = (index) => {
      visuals.forEach((visual, i) => {
        if (i === index) {
          visual.classList.add("active");
        } else {
          visual.classList.remove("active");
        }
      });
    };

    activateVisual(0);

    contents.forEach((content, i) => {
      ScrollTrigger.create({
        trigger: content,
        start: "top center",
        end: "bottom center",
        markers: false,
        onEnter: () => activateVisual(i),
        onEnterBack: () => activateVisual(i),
      });
    });
  });
}
