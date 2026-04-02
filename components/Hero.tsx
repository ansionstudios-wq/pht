"use client";

import Image from "next/image";
import { DustParticles } from "./DustParticles";

const DEFAULT_IMAGE = "/assets/hero/hero.JPG";

type HeroProps = {
  imageSrc?: string;
  imageAlt?: string;
};

export function Hero({ imageSrc = DEFAULT_IMAGE, imageAlt = "Anusion studio" }: HeroProps) {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="hero-bg-image"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>
      <div className="hero-overlay" aria-hidden />
      <DustParticles />
      <div className="hero-content">
        <p className="hero-tagline">Where beauty finds its frame</p>
        <h1 className="hero-headline">Portraits That Withstand Time</h1>
        <p className="hero-subheading">
        Every glance , every embrace , every fleeting moment - Capturing with honesty , soul and an eye for beautiful
        </p>
        <button
          type="button"
          className="btn-engraved"
          onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
        >
          Enter the gallery
        </button>
      </div>
      <button
        type="button"
        className="hero-scroll-indicator"
        aria-label="Scroll to gallery"
        onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </section>
  );
}
