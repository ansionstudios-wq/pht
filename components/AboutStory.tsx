"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

/* ----- Config (edit here) ----- */
const ABOUT_STORY_CONFIG = {
  imagePath: "/assets/harshini.jpg",
  sectionTitle: "About Harshini",
  /** Intersection ratio (0–1) required for section to be "in view". */
  enterThreshold: 0.5,
  /** Number of scrolls after section is in view before card progression starts (1 or 2). */
  activationScrolls: 2,
  cardCount: 3,
  /** Min wheel delta (px) to advance one card (throttles trackpad). */
  wheelDeltaThreshold: 40,
  /**
   * Exactly 3 cards. Each item is one or more paragraph strings (same copy, no rewrite).
   * Card 1 = intro + both sides of lens; Card 2 = drawn to people; Card 3 = photograph the way I remember.
   */
  cards: [
    [
      "Hi, I'm Harshini. A believer in beauty — in the way light settles on a quiet afternoon, in the unguarded expression, in the moments too tender to stage. I am here to find those moments and hold them still, pressed into frames you will return to long after the day has passed.",
      "I have lived on both sides of the lens for as long as I can remember. People once called me photogenic, but I came to understand it was never really about that. I am simply happy in those moments — happy being seen, and equally happy doing the seeing. That happiness travels through the camera and into every person I photograph. They do not need to be photogenic. They only need to feel something real, because I always do.",
    ],
    [
      "I have always been drawn to people and the quiet worlds they carry within them — to the way someone softens when they feel truly seen. That same gaze extends to everything around them: the effortless elegance of fashion, the unhurried grace of nature, the small and telling details of a life being lived. To me, photography has never been a technique. It is the simple, honest act of recognising beauty in another soul and offering it back to them, gently preserved within a frame.",
    ],
    [
      "I photograph the way I remember. I grew up in a village where beauty was soft and unassuming — familiar light, gentle mornings, a landscape that asked nothing of you and gave you everything. I have since crossed oceans and built a life far from there, yet that place has never truly left me. It lives in the warmth I reach for, in the stillness I seek, in the vintage tenderness I find in every frame. My photography is not simply what stands before my lens. It is everything I have ever loved and carried with me.",
    ],
  ],
};

/** Motion config — tune to match reference video. */
const ABOUT_MOTION = {
  enterThreshold: 0.5,
  transitionMs: 480,
  translatePx: 56,
  fadeStart: 0,
  fadeEnd: 1,
  scaleFrom: 0.98,
  scaleTo: 1,
  easing: "cubic-bezier(0.33, 0, 0.2, 1)",
  lockPadding: 0,
};

const LAST_INDEX = ABOUT_STORY_CONFIG.cardCount - 1;

export function AboutStory() {
  const [cardIndex, setCardIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [useReducedMotion, setUseReducedMotion] = useState(false);
  const [imageError, setImageError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const hasEntered = useRef(false);
  const wheelAccum = useRef(0);
  const lastCardChangeAt = useRef(0);
  const sectionInViewRef = useRef(false);
  const activationScrollCountRef = useRef(0);
  const touchActivationCountRef = useRef(0);
  const touchActivationCountedThisGesture = useRef(false);

  // Respect prefers-reduced-motion: show all cards in normal scroll, no lock
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handle = () => setUseReducedMotion(mq.matches);
    handle();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  // IntersectionObserver: section "in view" when a substantial part (e.g. 50%) is visible.
  // Card progression (isActive) starts only after activationScrolls (1–2) scrolls while in view.
  useEffect(() => {
    if (useReducedMotion || !sectionRef.current) return;
    const section = sectionRef.current;
    const { enterThreshold } = ABOUT_STORY_CONFIG;
    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        const ratio = e.intersectionRatio;
        const scrollY = window.scrollY;
        const nowInView = ratio >= enterThreshold;
        sectionInViewRef.current = nowInView;

        if (nowInView) {
          if (!hasEntered.current) {
            hasEntered.current = true;
            activationScrollCountRef.current = 0;
            setCardIndex(scrollY > lastScrollY.current ? 0 : LAST_INDEX);
          }
          // Do NOT set isActive here — wait for 1–2 scrolls (handled in handleWheel)
        } else {
          setIsActive(false);
          hasEntered.current = false;
          wheelAccum.current = 0;
          activationScrollCountRef.current = 0;
          touchActivationCountRef.current = 0;
        }
        lastScrollY.current = scrollY;
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [useReducedMotion]);

  // Update lastScrollY when not active so we can detect enter direction
  useEffect(() => {
    if (useReducedMotion) return;
    const onScroll = () => {
      if (!isActive) lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isActive, useReducedMotion]);

  // Wheel: after section is in view, count 1–2 scrolls then start card progression. Then one scroll step = one card.
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (useReducedMotion) return;
      const { activationScrolls, wheelDeltaThreshold } = ABOUT_STORY_CONFIG;
      const inView = sectionInViewRef.current;

      // Section in view but not yet "active": count this scroll; after activationScrolls, arm cards.
      if (inView && !isActive && Math.abs(e.deltaY) > 15) {
        activationScrollCountRef.current += 1;
        if (activationScrollCountRef.current >= activationScrolls) {
          setIsActive(true);
        }
        return; // let page scroll for these first scrolls
      }

      if (!isActive) return;
      const goingDown = e.deltaY > 0;
      const atFirst = cardIndex <= 0;
      const atLast = cardIndex >= LAST_INDEX;

      if (goingDown && atLast) return;
      if (!goingDown && atFirst) return;

      const now = typeof performance !== "undefined" ? performance.now() : Date.now();
      const cooldownMs = ABOUT_MOTION.transitionMs * 0.6;
      if (now - lastCardChangeAt.current < cooldownMs) {
        e.preventDefault();
        return;
      }

      wheelAccum.current += e.deltaY;
      if (Math.abs(wheelAccum.current) >= wheelDeltaThreshold) {
        e.preventDefault();
        const step = wheelAccum.current > 0 ? 1 : -1;
        wheelAccum.current = 0;
        lastCardChangeAt.current = now;
        setCardIndex((i) => Math.max(0, Math.min(LAST_INDEX, i + step)));
      }
    },
    [isActive, cardIndex, useReducedMotion]
  );

  useEffect(() => {
    if (useReducedMotion) return;
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel, useReducedMotion]);

  const touchStartY = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchActivationCountedThisGesture.current = false;
  }, []);
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (useReducedMotion) return;
      const y = e.touches[0].clientY;
      const delta = Math.abs(y - touchStartY.current);
      const inView = sectionInViewRef.current;

      if (inView && !isActive && delta > 50 && !touchActivationCountedThisGesture.current) {
        touchActivationCountedThisGesture.current = true;
        touchActivationCountRef.current += 1;
        if (touchActivationCountRef.current >= ABOUT_STORY_CONFIG.activationScrolls) {
          setIsActive(true);
        }
        touchStartY.current = y;
        return;
      }
      if (!isActive) return;
      const goingDown = y < touchStartY.current;
      const atFirst = cardIndex <= 0;
      const atLast = cardIndex >= LAST_INDEX;
      if (goingDown && atLast) return;
      if (!goingDown && atFirst) return;
      if (delta < 50) return;
      e.preventDefault();
      setCardIndex((i) => (goingDown ? Math.min(i + 1, LAST_INDEX) : Math.max(i - 1, 0)));
      touchStartY.current = y;
    },
    [isActive, cardIndex, useReducedMotion]
  );

  const { imagePath, sectionTitle, cards } = ABOUT_STORY_CONFIG;
  const motion = ABOUT_MOTION;
  const motionVars = {
    "--about-duration": `${motion.transitionMs}ms`,
    "--about-ease": motion.easing,
    "--about-translate": `${motion.translatePx}px`,
    "--about-fade-start": motion.fadeStart,
    "--about-fade-end": motion.fadeEnd,
    "--about-scale-from": motion.scaleFrom,
    "--about-scale-to": motion.scaleTo,
  } as React.CSSProperties;

  if (useReducedMotion) {
    return (
      <section ref={sectionRef} className="about-story about-story--reduced-motion" id="about">
        <div className="about-story__inner">
          <h2 className="about-story__title">{sectionTitle}</h2>
          <div className="about-story__media">
            <div className="about-story__media-inner">
              {!imageError && (
                <Image
                  src={imagePath}
                  alt="Harshini"
                  width={480}
                  height={600}
                  className="about-story__image"
                  sizes="(max-width: 900px) 100vw, 45vw"
                  onError={() => setImageError(true)}
                />
              )}
              <div className="about-story__placeholder" aria-hidden style={{ display: imageError ? "flex" : "none" }}>
                Portrait
              </div>
            </div>
          </div>
          <div className="about-story__content">
            <div className="about-story__cards about-story__cards--all">
              {cards.map((paragraphs, i) => (
                <div key={i} className="about-story__card">
                  <span className="about-story__card-num">{String(i + 1).padStart(2, "0")}/{String(cards.length).padStart(2, "0")}</span>
                  {paragraphs.map((text, j) => (
                    <p key={j}>{text}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="about-story"
      id="about"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ touchAction: isActive ? "pan-y" : "auto", ...motionVars }}
    >
      <div className="about-story__inner">
        <h2 className="about-story__title">{sectionTitle}</h2>
        {/* LEFT: portrait (sticky) */}
        <div className="about-story__media">
          <div className="about-story__media-inner">
            {!imageError && (
              <Image
                src={imagePath}
                alt="Harshini"
                width={480}
                height={600}
                className="about-story__image"
                sizes="(max-width: 900px) 100vw, 45vw"
                onError={() => setImageError(true)}
              />
            )}
            <div className="about-story__placeholder" aria-hidden style={{ display: imageError ? "flex" : "none" }}>
              Portrait
            </div>
          </div>
        </div>
        {/* RIGHT: content cards */}
        <div className="about-story__content">
          <div className="about-story__cards" aria-live="polite" aria-atomic="true">
            {cards.map((paragraphs, i) => (
              <div
                key={i}
                className="about-story__card"
                data-state={i < cardIndex ? "prev" : i > cardIndex ? "next" : "active"}
              >
                <span className="about-story__card-num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}/{String(cards.length).padStart(2, "0")}
                </span>
                {paragraphs.map((text, j) => (
                  <p key={j}>{text}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="about-story__progress" aria-hidden>
            <div className="about-story__progress-bar">
              <div
                className="about-story__progress-fill"
                style={{ width: `${((cardIndex + 1) / cards.length) * 100}%` }}
              />
            </div>
            <span className="about-story__progress-label">
              {cardIndex + 1} / {cards.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
