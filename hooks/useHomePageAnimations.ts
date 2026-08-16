import { useEffect } from "react";

export function useHomePageAnimations() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>("#year").forEach((element) => {
      element.innerHTML = String(new Date().getFullYear());
    });

    const yearCounter = document.querySelector<HTMLElement>("#year-counter");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      if (yearCounter) {
        yearCounter.textContent = "5";
      }
      return;
    }

    let cancelled = false;
    let teardown: (() => void) | undefined;
    const run = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
      });

      const mm = gsap.matchMedia();
      const marqueeTweens: Array<gsap.core.Tween> = [];
      let mobileTimeline: gsap.core.Timeline | undefined;
      const clearAnimatedProps = "transform,opacity";

      const reveal = (
        target: gsap.TweenTarget,
        vars: gsap.TweenVars,
        trigger: Element | string,
        start: string
      ) =>
        gsap.from(target, {
          ...vars,
          clearProps: clearAnimatedProps,
          scrollTrigger: {
            trigger,
            start,
            once: true,
          },
        });

      const mobileWordGroups = [
        document.querySelectorAll<HTMLElement>(".mobile-text1 .hero-word"),
        document.querySelectorAll<HTMLElement>(".mobile-text2 .hero-word"),
        document.querySelectorAll<HTMLElement>(".mobile-text3 .hero-word"),
      ];

      if (mobileWordGroups.some((group) => group.length)) {
        mobileTimeline = gsap.timeline();
        mobileWordGroups.forEach((words) => {
          if (!words.length) return;
          mobileTimeline!.from(words, {
            y: -100,
            opacity: 0,
            duration: 0.7,
            ease: "power4",
            stagger: 0.06,
            clearProps: clearAnimatedProps,
          });
        });
      }

      if (yearCounter) {
        const counterValue = { value: 0 };

        gsap.to(counterValue, {
          value: 5,
          duration: 2,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => {
            yearCounter.textContent = String(counterValue.value);
          },
          scrollTrigger: {
            trigger: ".experience-section",
            start: "top 70%",
            once: true,
          },
        });
      }

      const navLoad = document.querySelector(".nav-load");
      if (navLoad) {
        gsap.from(navLoad, {
          y: -18,
          opacity: 0,
          filter: "blur(12px)",
          duration: 0.9,
          ease: "power3.out",
          clearProps: "transform,opacity,filter",
        });
      }

      const heroEyebrow = document.querySelector(".hero-eyebrow");
      if (heroEyebrow) {
        gsap.from(heroEyebrow, {
          y: 16,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.75,
          delay: 0.12,
          ease: "power3.out",
          clearProps: "transform,opacity,filter",
        });
      }

      const heroSubcopy = document.querySelector(".hero-subcopy");
      if (heroSubcopy) {
        gsap.from(heroSubcopy, {
          y: 24,
          opacity: 0,
          filter: "blur(14px)",
          duration: 0.9,
          delay: 0.22,
          ease: "power3.out",
          clearProps: "transform,opacity,filter",
        });
      }

      mm.add("(min-width: 768px)", () => {
        const desktopWords = document.querySelectorAll<HTMLElement>(".text .hero-word");

        if (desktopWords.length) {
          gsap.from(desktopWords, {
            y: -100,
            opacity: 0,
            duration: 0.7,
            ease: "power4",
            stagger: 0.06,
            clearProps: clearAnimatedProps,
          });
        }

        document.querySelectorAll<HTMLElement>(".section-title").forEach((element) => {
          gsap.from(element, {
            y: 32,
            opacity: 0,
            duration: 0.9,
            ease: "power4.out",
            clearProps: clearAnimatedProps,
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
          });
        });

        [
          { target: ".si-move", trigger: ".first-row" },
          { target: ".apto-move", trigger: ".second-row" },
          { target: ".clean-move", trigger: ".third-row" },
        ].forEach(({ target, trigger }) => {
          if (!document.querySelector(target) || !document.querySelector(trigger)) return;
          gsap.fromTo(
            target,
            { y: 50 },
            {
              y: -100,
              scrollTrigger: {
                trigger,
                start: "top center",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        });
      });

      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((section) => {
        const media = section.querySelector(".section-media");
        const kicker = section.querySelector(".section-kicker");
        const copy = section.querySelectorAll(".section-copy");
        const cards = section.querySelectorAll(".timeline-card");

        if (kicker) {
          reveal(kicker, {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          }, section, "top 82%");
        }

        if (media) {
          reveal(media, {
            y: 56,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          }, section, "top 78%");
        }

        if (copy.length) {
          reveal(copy, {
            y: 24,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          }, section, "top 76%");
        }

        if (cards.length) {
          reveal(cards, {
            y: 48,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          }, cards[0], "top 84%");
        }
      });

      gsap.utils.toArray<HTMLElement>(".about-marquee-track").forEach((track) => {
        const tween = gsap.fromTo(
          track,
          { x: 0 },
          {
            xPercent: -50,
            duration: 30,
            ease: "none",
            repeat: -1,
            paused: true,
          }
        );

        marqueeTweens.push(tween);

        ScrollTrigger.create({
          trigger: track.closest(".about-marquee") ?? track,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => tween.play(),
          onEnterBack: () => tween.play(),
          onLeave: () => tween.pause(),
          onLeaveBack: () => tween.pause(),
        });
      });

      if (document.querySelector("#hero")) {
        gsap.to(".hero-content", {
          y: -80,
          opacity: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top+=10%",
            scrub: true,
          },
        });

        gsap.to(".hero-wave-layer", {
          opacity: 0.18,
          y: 36,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top+=10%",
            scrub: true,
          },
        });

        gsap.to(".hero-fade-veil", {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "center top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (document.querySelector(".contact-reveal")) {
        const contactCard = document.querySelector(".contact-card-shell");
        if (contactCard) {
          gsap.from(contactCard, {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: clearAnimatedProps,
            scrollTrigger: {
              trigger: ".contact-shell",
              start: "top 68%",
              once: true,
            },
          });
        }
      }

      teardown = () => {
        mobileTimeline?.kill();
        marqueeTweens.forEach((tween) => tween.kill());
        mm.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };

    const initHandle = window.requestAnimationFrame(() => {
      void run();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(initHandle);
      teardown?.();
    };
  }, []);
}
