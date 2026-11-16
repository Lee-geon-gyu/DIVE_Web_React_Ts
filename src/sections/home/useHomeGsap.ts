import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "../../lib/animation/gsap";

export function useHomeGsap(rootRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    let backgroundRangeTrigger: ScrollTrigger | undefined;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const sharedScope = root.querySelector<HTMLElement>(".home-visual-group");
      const sharedBackground = root.querySelector<HTMLElement>(
        ".home-visual-group__background",
      );
      const backgroundStartSection =
        root.querySelector<HTMLElement>(".home-categories");
      const resources = root.querySelector<HTMLElement>(".home-resources");

      if (
        sharedScope &&
        sharedBackground &&
        backgroundStartSection &&
        resources
      ) {
        const setBackgroundVisibility = (
          isVisible: boolean,
          immediate = false,
        ) => {
          if (immediate) {
            gsap.set(sharedBackground, { autoAlpha: isVisible ? 1 : 0 });
            return;
          }

          gsap.to(sharedBackground, {
            autoAlpha: isVisible ? 1 : 0,
            duration: 0.7,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        ScrollTrigger.getById("home-fixed-background-range")?.kill();
        gsap.set(sharedBackground, {
          autoAlpha: 0,
          filter: "brightness(1)",
        });
        backgroundRangeTrigger = ScrollTrigger.create({
          id: "home-fixed-background-range",
          trigger: backgroundStartSection,
          start: "top 50%",
          endTrigger: resources,
          end: "bottom 10%",
          onEnter: () => setBackgroundVisibility(true),
          onEnterBack: () => setBackgroundVisibility(true),
          onLeave: () => setBackgroundVisibility(false),
          onLeaveBack: () => setBackgroundVisibility(false),
          onRefresh: (self) => setBackgroundVisibility(self.isActive, true),
        });
      }

      const sharedBackgroundPointer = root.querySelector<HTMLElement>(".home-visual-group__background-pointer");
      const sharedBackgroundAmbient = root.querySelector<HTMLElement>(".home-visual-group__background-ambient");

      if (sharedBackgroundAmbient) {
        const isTablet = window.matchMedia(
          "(min-width: 768px) and (max-width: 1279px)",
        ).matches;
        const isDesktop = window.matchMedia("(min-width: 1280px)").matches;

        if (isTablet || isDesktop) {
          const strength = isTablet ? 0.5 : 1;

          gsap
            .timeline({ repeat: -1 })
            .to(sharedBackgroundAmbient, {
              x: 2 * strength,
              y: -2 * strength,
              rotationY: 0.06 * strength,
              rotationX: -0.04 * strength,
              duration: 4,
              ease: "sine.inOut",
            })
            .to(sharedBackgroundAmbient, {
              x: 1.5 * strength,
              y: 2 * strength,
              rotationY: 0.03 * strength,
              rotationX: 0.04 * strength,
              duration: 4,
              ease: "sine.inOut",
            })
            .to(sharedBackgroundAmbient, {
              x: -2 * strength,
              y: 1.5 * strength,
              rotationY: -0.06 * strength,
              rotationX: 0.03 * strength,
              duration: 4,
              ease: "sine.inOut",
            })
            .to(sharedBackgroundAmbient, {
              x: -1.5 * strength,
              y: -2 * strength,
              rotationY: -0.03 * strength,
              rotationX: -0.04 * strength,
              duration: 4,
              ease: "sine.inOut",
            })
            .to(sharedBackgroundAmbient, {
              x: 0,
              y: 0,
              rotationY: 0,
              rotationX: 0,
              duration: 4,
              ease: "sine.inOut",
            });
        }
      }

      let removeHomeBackgroundEffects = () => undefined;

      if (
        sharedScope &&
        sharedBackground &&
        sharedBackgroundPointer &&
        window.matchMedia(
          "(min-width: 1280px) and (hover: hover) and (pointer: fine)",
        ).matches
      ) {
        const moveBackgroundX = gsap.quickTo(sharedBackgroundPointer, "x", {
          duration: 0.8,
          ease: "power3.out",
        });
        const moveBackgroundY = gsap.quickTo(sharedBackgroundPointer, "y", {
          duration: 0.8,
          ease: "power3.out",
        });
        const rotateBackgroundX = gsap.quickTo(
          sharedBackgroundPointer,
          "rotationX",
          { duration: 1, ease: "power3.out" },
        );
        const rotateBackgroundY = gsap.quickTo(
          sharedBackgroundPointer,
          "rotationY",
          { duration: 1, ease: "power3.out" },
        );
        const handlePointerMove = (event: PointerEvent) => {
          const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
          const normalizedY = (event.clientY / window.innerHeight) * 2 - 1;

          moveBackgroundX(normalizedX * 4);
          moveBackgroundY(normalizedY * 3);
          rotateBackgroundX(normalizedY * -0.08);
          rotateBackgroundY(normalizedX * 0.12);
        };

        const resetPointerPosition = () => {
          moveBackgroundX(0);
          moveBackgroundY(0);
          rotateBackgroundX(0);
          rotateBackgroundY(0);
        };

        sharedScope.addEventListener("pointermove", handlePointerMove, {
          passive: true,
        });
        sharedScope.addEventListener("pointerleave", resetPointerPosition);

        removeHomeBackgroundEffects = () => {
          sharedScope.removeEventListener("pointermove", handlePointerMove);
          sharedScope.removeEventListener(
            "pointerleave",
            resetPointerPosition,
          );
          gsap.killTweensOf(sharedBackgroundPointer);
        };
      }

      const createSectionEffects = (strength: number) => {
        const featured = root.querySelector<HTMLElement>(
          ".home-featured-guides",
        );
        const featuredCards = featured?.querySelectorAll<HTMLElement>(
          ".home-featured-guides__link",
        );
        if (featured && featuredCards?.length) {
          gsap.fromTo(
            featuredCards,
            { "--featured-depth": 0.97 },
            {
              "--featured-depth": 1,
              ease: "none",
              scrollTrigger: {
                trigger: featured,
                start: "top 82%",
                end: "center 42%",
                scrub: 0.9,
              },
            },
          );
        }

        const aiTools = root.querySelector<HTMLElement>(".home-ai-tools");
        if (aiTools) {
          gsap.fromTo(
            aiTools,
            { "--ai-grid-y": "-3%" },
            {
              "--ai-grid-y": `${8 * strength}%`,
              ease: "none",
              scrollTrigger: {
                trigger: aiTools,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        }

        const resources = root.querySelector<HTMLElement>(".home-resources");
        if (resources) {
          gsap.fromTo(
            resources,
            { "--resources-reveal": "100%", "--resources-layer-y": "-2%" },
            {
              "--resources-reveal": "0%",
              "--resources-layer-y": `${5 * strength}%`,
              ease: "none",
              scrollTrigger: {
                trigger: resources,
                start: "top 88%",
                end: "center 45%",
                scrub: 0.9,
              },
            },
          );
        }
      };

      media.add("(min-width: 1280px)", () => createSectionEffects(1));
      media.add("(min-width: 768px) and (max-width: 1279px)", () =>
        createSectionEffects(0.6),
      );

      const finalCta = root.querySelector<HTMLElement>(".home-final-cta");
      const finalEyebrow = finalCta?.querySelector<HTMLElement>(
        ".home-final-cta__eyebrow",
      );
      const finalTitleLine = finalCta?.querySelector<HTMLElement>(
        ".home-final-cta__title-line",
      );
      const finalDescription = finalCta?.querySelector<HTMLElement>(
        ".home-final-cta__description",
      );
      const finalActions = finalCta?.querySelector<HTMLElement>(
        ".home-final-cta__actions",
      );

      if (
        finalCta &&
        finalEyebrow &&
        finalTitleLine &&
        finalDescription &&
        finalActions
      ) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: finalCta,
              start: "top 75%",
              once: true,
            },
            defaults: { ease: "power3.out" },
          })
          .fromTo(
            finalCta,
            { "--cta-reveal": "100%" },
            { "--cta-reveal": "0%", duration: 0.8 },
          )
          .fromTo(
            finalEyebrow,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45 },
            0.18,
          )
          .fromTo(
            finalTitleLine,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.7 },
            0.25,
          )
          .fromTo(
            finalDescription,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            0.48,
          )
          .fromTo(
            finalActions,
            { scale: 0.96, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5 },
            0.62,
          );
      }

      return removeHomeBackgroundEffects;
    }, root);

    return () => {
      backgroundRangeTrigger?.kill();
      gsap.killTweensOf(
        root.querySelector<HTMLElement>(".home-visual-group__background"),
      );
      media.revert();
      context.revert();
    };
  }, [rootRef]);
}
