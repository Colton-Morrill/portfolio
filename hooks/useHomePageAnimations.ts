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
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(SplitText, ScrollTrigger);
      ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
      });

      const mm = gsap.matchMedia();
      const sectionSplits: InstanceType<typeof SplitText>[] = [];
      const marqueeTweens: Array<gsap.core.Tween> = [];
      let desktopSplit: InstanceType<typeof SplitText> | undefined;
      let mobileSplit1: InstanceType<typeof SplitText> | undefined;
      let mobileSplit2: InstanceType<typeof SplitText> | undefined;
      let mobileSplit3: InstanceType<typeof SplitText> | undefined;
      let mobileTimeline: gsap.core.Timeline | undefined;
      const clearAnimatedProps = "transform,opacity";

      const createSplit = (selector: string, type: string) => {
        const element = document.querySelector(selector);
        if (!element) return undefined;
        return new SplitText(element, {
          type,
          linesClass: "split-line",
          wordsClass: "split-word",
          charsClass: "split-char",
        });
      };

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

      mobileSplit1 = createSplit(".mobile-text1", "words");
      mobileSplit2 = createSplit(".mobile-text2", "words");
      mobileSplit3 = createSplit(".mobile-text3", "words");

      if (mobileSplit1?.words?.length || mobileSplit2?.words?.length || mobileSplit3?.words?.length) {
        mobileTimeline = gsap.timeline();
        [mobileSplit1, mobileSplit2, mobileSplit3].forEach((split) => {
          if (!split?.words?.length) return;
          mobileTimeline!.from(split.words, {
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
        desktopSplit = createSplit(".text", "words");

        if (desktopSplit?.words?.length) {
          gsap.from(desktopSplit.words, {
            y: -100,
            opacity: 0,
            duration: 0.7,
            ease: "power4",
            stagger: 0.06,
            clearProps: clearAnimatedProps,
          });
        }

        document.querySelectorAll<HTMLElement>(".section-title").forEach((element) => {
          const sectionSplit = new SplitText(element, { type: "lines" });
          sectionSplits.push(sectionSplit);

          gsap.from(sectionSplit.lines, {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
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
        mobileSplit1?.revert();
        mobileSplit2?.revert();
        mobileSplit3?.revert();
        desktopSplit?.revert();
        sectionSplits.forEach((sectionSplit) => sectionSplit.revert());
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
