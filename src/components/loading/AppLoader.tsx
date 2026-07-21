import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { useLenisRef } from "../../app/providers/lenis-context";
import "./app-loader.css";

const LOADING_MESSAGE = "Drive Into Verified Experiences.";
const LOADER_WORDS = ["Drive", "Into", "Verified", "Experiences."] as const;
const BLOCKED_SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
  "Spacebar",
]);

interface AppLoaderProps {
  onComplete: () => void;
}

export function AppLoader({ onComplete }: AppLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenisRef();

  useLayoutEffect(() => {
    const loader = loaderRef.current;

    if (!loader) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverscrollBehavior =
      document.body.style.overscrollBehavior;
    const previousHtmlOverscrollBehavior =
      document.documentElement.style.overscrollBehavior;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousHtmlTouchAction = document.documentElement.style.touchAction;
    const previousScrollRestoration = window.history.scrollRestoration;
    const previousActiveElement = document.activeElement;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let isPageRestored = false;
    let removeResizeListener: () => void = () => undefined;

    const resetInitialScrollPosition = () => {
      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const preventInitialScroll = (event: Event) => event.preventDefault();
    const preventBackgroundInteraction = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        return;
      }

      if (
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        BLOCKED_SCROLL_KEYS.has(event.key)
      ) {
        event.preventDefault();
      }
    };
    const keepInitialScrollPosition = () => {
      if (window.scrollX !== 0 || window.scrollY !== 0) {
        resetInitialScrollPosition();
      }
    };

    window.history.scrollRestoration = "manual";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.touchAction = "none";
    document.documentElement.style.touchAction = "none";
    lenisRef.current?.stop();
    resetInitialScrollPosition();
    loader.focus({ preventScroll: true });

    document.addEventListener("keydown", preventBackgroundInteraction);
    window.addEventListener("wheel", preventInitialScroll, { passive: false });
    window.addEventListener("touchmove", preventInitialScroll, {
      passive: false,
    });
    window.addEventListener("scroll", keepInitialScrollPosition, {
      passive: true,
    });

    const restorePage = () => {
      if (isPageRestored) return;
      isPageRestored = true;

      document.removeEventListener("keydown", preventBackgroundInteraction);
      window.removeEventListener("wheel", preventInitialScroll);
      window.removeEventListener("touchmove", preventInitialScroll);
      window.removeEventListener("scroll", keepInitialScrollPosition);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscrollBehavior;
      document.documentElement.style.overscrollBehavior =
        previousHtmlOverscrollBehavior;
      document.body.style.touchAction = previousBodyTouchAction;
      document.documentElement.style.touchAction = previousHtmlTouchAction;
      window.history.scrollRestoration = previousScrollRestoration;

      if (
        previousActiveElement instanceof HTMLElement &&
        previousActiveElement !== document.body
      ) {
        previousActiveElement.focus({ preventScroll: true });
      } else {
        loader.blur();
      }
    };

    const completeLoading = () => {
      resetInitialScrollPosition();
      restorePage();
      resetInitialScrollPosition();
      onComplete();
    };

    const context = gsap.context(() => {
      const characters = gsap.utils.toArray<HTMLElement>(
        ".app-loader__character",
      );
      const initials = gsap.utils.toArray<HTMLElement>(
        ".app-loader__character--initial",
      );
      const remainingCharacters = gsap.utils.toArray<HTMLElement>(
        ".app-loader__character--remaining",
      );
      const phrase = loader.querySelector<HTMLElement>(".app-loader__phrase");
      const logoLayout = loader.querySelector<HTMLElement>(
        ".app-loader__logo-layout",
      );
      const logoLayoutLetters = gsap.utils.toArray<HTMLElement>(
        ".app-loader__logo-layout-letter",
      );
      const logo = loader.querySelector<HTMLElement>(".app-loader__logo");
      const headerLogo = document.querySelector<HTMLElement>(
        ".site-header__logo-image",
      );
      const header = document.querySelector<HTMLElement>(".site-header");
      const scrollProgress =
        document.querySelector<HTMLElement>(".scroll-progress");

      if (
        characters.length === 0 ||
        initials.length !== 4 ||
        !phrase ||
        !logoLayout ||
        logoLayoutLetters.length !== 4 ||
        !logo ||
        !headerLogo ||
        !header
      ) {
        completeLoading();
        return;
      }

      const getLogoLayoutOffset = (index: number, letter: HTMLElement) => {
        const letterRect = letter.getBoundingClientRect();
        const targetRect = logoLayoutLetters[index]?.getBoundingClientRect();

        if (!targetRect) return { x: 0, y: 0, scale: 1 };

        return {
          x:
            targetRect.left +
            targetRect.width / 2 -
            (letterRect.left + letterRect.width / 2),
          y:
            targetRect.top +
            targetRect.height / 2 -
            (letterRect.top + letterRect.height / 2),
          scale: targetRect.height / letterRect.height,
        };
      };

      const getHeaderLogoTransform = () => {
        const logoRect = logo.getBoundingClientRect();
        const headerRect = headerLogo.getBoundingClientRect();
        return {
          x:
            headerRect.left +
            headerRect.width / 2 -
            (logoRect.left + logoRect.width / 2),
          y:
            headerRect.top +
            headerRect.height / 2 -
            (logoRect.top + logoRect.height / 2),
          scale: headerRect.width / logoRect.width,
        };
      };

      gsap.set(characters, { opacity: 0, y: 10, filter: "blur(8px)" });
      gsap.set(logo, { opacity: 0 });
      gsap.set(header, { autoAlpha: 0 });
      gsap.set(headerLogo, { autoAlpha: 0 });
      if (scrollProgress) gsap.set(scrollProgress, { autoAlpha: 0 });

      // Loader GSAP Timeline - 모든 STEP은 아래 하나의 Timeline에서 순차 실행됩니다.
      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: completeLoading,
      });

      if (prefersReducedMotion) {
        timeline
          .to(characters, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.2,
          })
          .set(phrase, { opacity: 0 })
          .set(logo, { opacity: 1 })
          .set(headerLogo, { autoAlpha: 1 })
          .set(header, { autoAlpha: 1 })
          .set(scrollProgress, { autoAlpha: 1 })
          .to(loader, { opacity: 0, duration: 0.2 });
        return;
      }

      timeline
        // STEP 1 - Character Fade In
        // duration: 각 문자 자체의 fade/blur/y 전환 시간
        // stagger: 다음 문자가 등장하기 시작하는 간격 (현재 0.05초)
        .to(characters, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        })
        // STEP 2 - Completed Phrase Hold (현재 0.5초)
        .to({}, { duration: 0.5 })
        // STEP 3 - Remaining Letters Fade Out (현재 0.3초)
        .to(remainingCharacters, {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
        // STEP 4 - D I V E Hold (현재 0.2초)
        .to({}, { duration: 0 })
        // STEP 5A - D I V E Scale Up In Place
        .to(
          initials,
          {
            scale: (index, letter: HTMLElement) =>
              getLogoLayoutOffset(index, letter).scale,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          "lettersScale",
        )
        // STEP 5B - Keep Scale And Move To The PNG Artwork Layout
        .to(
          initials,
          {
            x: (index, letter: HTMLElement) =>
              getLogoLayoutOffset(index, letter).x,
            y: (index, letter: HTMLElement) =>
              getLogoLayoutOffset(index, letter).y,
            opacity: 1,
            duration: 1.5,
            ease: "power3.inOut",
          },
          "lettersMove",
        )
        // STEP 6 - HTML letters and PNG logo crossfade together
        .addLabel("logoCrossfade")
        .to(
          initials,
          {
            opacity: 0,
            duration: 1.5,
            ease: "power1.inOut",
          },
          "logoCrossfade",
        )
        .to(
          logo,
          {
            opacity: 1,
            duration: 2.5,
            ease: "power1.inOut",
          },
          "logoCrossfade",
        )
        // STEP 7 - PNG Logo Move To Header
        .to(
          logo,
          {
            x: () => getHeaderLogoTransform().x,
            y: () => getHeaderLogoTransform().y,
            scale: () => getHeaderLogoTransform().scale,
            duration: 1.25,
            ease: "power3.inOut",
          },
          "logoToHeader",
        )
        // STEP 8 - Header and its real logo take over after arrival
        .addLabel("headerReveal")
        .to(
          [header, scrollProgress].filter(Boolean),
          {
            autoAlpha: 1,
            duration: 0.3,
            ease: "power1.out",
          },
          "headerReveal",
        )
        .to(
          headerLogo,
          {
            autoAlpha: 1,
            duration: 0.3,
            ease: "power1.inOut",
          },
          "headerReveal",
        )
        .to(
          logo,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power1.inOut",
          },
          "headerReveal",
        )
        // STEP 9 - Reveal Site / Loader Fade Out
        .to(loader, { opacity: 0, duration: 0.2, ease: "power2.out" });

      const handleResize = () => timeline.invalidate();
      window.addEventListener("resize", handleResize, { passive: true });
      removeResizeListener = () =>
        window.removeEventListener("resize", handleResize);
    }, loader);

    return () => {
      context.revert();
      removeResizeListener();
      restorePage();
    };
  }, [lenisRef, onComplete]);

  return (
    <div
      ref={loaderRef}
      className="app-loader"
      role="status"
      aria-label={LOADING_MESSAGE}
      tabIndex={-1}
    >
      <div className="app-loader__overlay" aria-hidden="true" />

      <div className="app-loader__stage" aria-hidden="true">
        <p className="app-loader__phrase">
          {LOADER_WORDS.map((word) => (
            <span className="app-loader__word" key={word}>
              {word.split("").map((character, index) => (
                <span
                  className={`app-loader__character app-loader__character--${
                    index === 0 ? "initial" : "remaining"
                  }`}
                  key={`${word}-${index}`}
                >
                  {character}
                </span>
              ))}
            </span>
          ))}
        </p>
        <p className="app-loader__logo-layout">
          {"DIVE".split("").map((letter) => (
            <span className="app-loader__logo-layout-letter" key={letter}>
              {letter}
            </span>
          ))}
        </p>
        <img
          className="app-loader__logo"
          src={`${import.meta.env.BASE_URL}DIVE_logo_Typo_text.png`}
          alt=""
          width="1724"
          height="500"
          decoding="async"
        />
      </div>
    </div>
  );
}
