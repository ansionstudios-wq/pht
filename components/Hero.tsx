"use client";

import Image from "next/image";
import { DustParticles } from "./DustParticles";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1920&q=80";

type HeroProps = {
  imageSrc?: string;
  imageAlt?: string;
};

export function Hero({ imageSrc = DEFAULT_IMAGE, imageAlt = "Portrait" }: HeroProps) {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="hero-bg-image"
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-overlay" aria-hidden />
      <DustParticles />
      <div className="hero-content">
        <h1 className="hero-headline">Portraits That Withstand Time</h1>
        <p className="hero-subheading">
          Where light meets memory, and every gaze becomes a story etched in
          amber and gold.
        </p>
        <a href="#gallery" className="btn-engraved">
          Enter the gallery
        </a>
      </div>
    </section>
  );
}
