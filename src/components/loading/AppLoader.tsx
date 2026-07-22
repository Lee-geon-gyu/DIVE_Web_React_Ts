import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { useLenisRef } from "../../app/providers/lenis-context";
import letterD from "../../assets/images/logo/loader/dive-letter-d.png";
import letterE from "../../assets/images/logo/loader/dive-letter-e.png";
import letterI from "../../assets/images/logo/loader/dive-letter-i.png";
import letterV from "../../assets/images/logo/loader/dive-letter-v.png";
import fullLogo from "../../assets/images/logo/loader/dive-logo-full.png";
import "./app-loader.css";

const LOADING_MESSAGE = "Drive Into Verified Experiences.";
const LOADER_WORDS = ["Drive", "Into", "Verified", "Experiences."] as const;
const LOADER_INITIALS = [
  { letter: "D", src: letterD, width: 563, height: 480 },
  { letter: "I", src: letterI, width: 138, height: 480 },
  { letter: "V", src: letterV, width: 533, height: 480 },
  { letter: "E", src: letterE, width: 482, height: 480 },
] as const;
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
    let isCancelled = false;
    let context: gsap.Context | undefined;
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

    const initializeLoader = async () => {
      const assetImages = Array.from(
        loader.querySelectorAll<HTMLImageElement>(".app-loader__asset-image"),
      );

      await Promise.all(
        assetImages.map(async (image) => {
          if (typeof image.decode === "function") {
            await image.decode().catch(() => undefined);
          } else if (!image.complete) {
            await new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
            });
          }
        }),
      );

      if (isCancelled) return;

      context = gsap.context(() => {
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
      const assembly = loader.querySelector<HTMLElement>(
        ".app-loader__logo-assembly",
      );
      const assemblyLetters = gsap.utils.toArray<HTMLElement>(
        ".app-loader__assembly-letter",
      );
      const logoMotion = loader.querySelector<HTMLElement>(
        ".app-loader__logo-motion",
      );
      const logo = loader.querySelector<HTMLElement>(".app-loader__logo");
      const headerLogo = document.querySelector<HTMLImageElement>(
        ".site-header__inner > .site-header__logo .site-header__logo-image",
      );
      const header = document.querySelector<HTMLElement>(".site-header");
      const scrollProgress =
        document.querySelector<HTMLElement>(".scroll-progress");

      if (
        characters.length === 0 ||
        initials.length !== 4 ||
        !phrase ||
        !assembly ||
        assemblyLetters.length !== 4 ||
        !logoMotion ||
        !logo ||
        !headerLogo ||
        !header
      ) {
        completeLoading();
        return;
      }

      const getAssemblyOffset = (index: number, letter: HTMLElement) => {
        const letterRect = letter.getBoundingClientRect();
        const targetRect = assemblyLetters[index]?.getBoundingClientRect();

        if (!targetRect) return { x: 0, y: 0 };

        return {
          x:
            targetRect.left +
            targetRect.width / 2 -
            (letterRect.left + letterRect.width / 2),
          y:
            targetRect.top +
            targetRect.height / 2 -
            (letterRect.top + letterRect.height / 2),
        };
      };

      const getSharedLetterScale = () => {
        const inlineHeight = initials[0]?.getBoundingClientRect().height;
        const finalHeight = assemblyLetters[0]?.getBoundingClientRect().height;

        return inlineHeight ? finalHeight / inlineHeight : 1;
      };

      let headerTargetRect: DOMRect | undefined;

      const normalizeLogoMotion = () => {
        const sourceRect = logoMotion.getBoundingClientRect();

        logoMotion.style.translate = "none";
        gsap.set(logoMotion, {
          position: "fixed",
          left: sourceRect.left,
          top: sourceRect.top,
          width: sourceRect.width,
          height: sourceRect.height,
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          transformOrigin: "center center",
        });

        headerTargetRect = headerLogo.getBoundingClientRect();
      };

      const correctFinalLogoRect = () => {
        const sourceRect = logoMotion.getBoundingClientRect();
        const targetRect = headerLogo.getBoundingClientRect();

        if (
          Math.abs(sourceRect.left - targetRect.left) <= 1 &&
          Math.abs(sourceRect.top - targetRect.top) <= 1 &&
          Math.abs(sourceRect.width - targetRect.width) <= 1 &&
          Math.abs(sourceRect.height - targetRect.height) <= 1
        ) {
          return;
        }

        gsap.set(logoMotion, {
          left: targetRect.left,
          top: targetRect.top,
          width: targetRect.width,
          height: targetRect.height,
        });
      };

      gsap.set(characters, { opacity: 0, y: 10, filter: "blur(8px)" });
      gsap.set(assembly, { opacity: 0 });
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
          .set(assembly, { opacity: 0 })
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
        // STEP 5 - Enlarge every initial by the same shared ratio
        .to(initials, {
          scale: getSharedLetterScale,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        })
        // STEP 6 - Move the enlarged images into the gap-zero assembly layout
        .to(
          initials,
          {
            x: (index, letter: HTMLElement) =>
              getAssemblyOffset(index, letter).x,
            y: (index, letter: HTMLElement) =>
              getAssemblyOffset(index, letter).y,
            opacity: 1,
            duration: 1,
            ease: "power3.inOut",
          },
          "lettersMove",
        )
        // STEP 7 - Hand off to the identical final-size assembly group
        .set(initials, { opacity: 0 })
        .set(assembly, { opacity: 1 })
        // STEP 8 - Assembly group and full logo crossfade together
        .addLabel("logoCrossfade")
        .to(
          assembly,
          {
            opacity: 0,
            duration: 0.35,
            ease: "power1.inOut",
          },
          "logoCrossfade",
        )
        .to(
          logo,
          {
            opacity: 1,
            duration: 0.35,
            ease: "power1.inOut",
          },
          "logoCrossfade",
        )
        // STEP 9 - PNG Logo Move To Header
        .call(normalizeLogoMotion)
        .to(
          logoMotion,
          {
            left: () => headerTargetRect?.left ?? 0,
            top: () => headerTargetRect?.top ?? 0,
            width: () => headerTargetRect?.width ?? 0,
            height: () => headerTargetRect?.height ?? 0,
            duration: 1.25,
            ease: "power3.inOut",
          },
          "logoToHeader",
        )
        .call(correctFinalLogoRect)
        // STEP 10 - Header and its real logo take over after arrival
        .addLabel("headerReveal")
        .call(
          () => window.dispatchEvent(new Event("dive:loader-header-reveal")),
          [],
          "headerReveal",
        )
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
        // STEP 11 - Reveal Site / Loader Fade Out
        .to(loader, { opacity: 0, duration: 0.2, ease: "power2.out" });

      const handleResize = () => timeline.invalidate();
      window.addEventListener("resize", handleResize, { passive: true });
      removeResizeListener = () =>
        window.removeEventListener("resize", handleResize);
      }, loader);
    };

    void initializeLoader();

    return () => {
      isCancelled = true;
      context?.revert();
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
          {LOADER_WORDS.map((word, wordIndex) => (
            <span className="app-loader__word" key={word}>
              {word.split("").map((character, index) => (
                <span
                  className={`app-loader__character app-loader__character--${
                    index === 0 ? "initial" : "remaining"
                  }`}
                  key={`${word}-${index}`}
                >
                  {index === 0 ? (
                    <span className="app-loader__letter-size">
                      <img
                        className="app-loader__asset-image app-loader__letter-image"
                        src={LOADER_INITIALS[wordIndex].src}
                        alt=""
                        width={LOADER_INITIALS[wordIndex].width}
                        height={LOADER_INITIALS[wordIndex].height}
                      />
                    </span>
                  ) : (
                    <span className="app-loader__character-text">
                      {character}
                    </span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </p>
        <div className="app-loader__logo-assembly">
          {LOADER_INITIALS.map(({ letter, src, width, height }) => (
            <span
              className="app-loader__assembly-letter"
              key={letter}
            >
              <img
                className="app-loader__asset-image app-loader__assembly-image"
                src={src}
                alt=""
                width={width}
                height={height}
              />
            </span>
          ))}
        </div>
        <div className="app-loader__logo-motion">
          <img
            className="app-loader__asset-image app-loader__logo"
            src={fullLogo}
            alt=""
            width="1715"
            height="480"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
