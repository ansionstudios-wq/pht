"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/**
 * Hero portrait: add your image at public/hero-portrait.jpg
 * or pass imageSrc="/your-image.jpg". Shows a placeholder until the image is added.
 */
export function Hero({ imageSrc = "/hero-portrait.jpeg" }: { imageSrc?: string }) {
  const [imageError, setImageError] = useState(false);
  const showImage = imageSrc && !imageError;

  return (
    <section className="hero">
      <div className="hero__grain" aria-hidden />
      <div className="hero__diagonal" aria-hidden />
      <div className="hero__inner">
        <div className="hero__content-wrap">
          <div className="hero__content">
            <p className="hero__kicker">Portrait photography</p>
            <h1 className="hero__headline">
              <span className="hero__headline-line">Portraits that</span>
              <span className="hero__headline-line">withstand time</span>
            </h1>
            <p className="hero__subtext">
              Where light meets memory, and every gaze becomes a story etched in
              amber and gold.
            </p>
            <Link href="/" className="hero__cta">
              Enter the gallery
            </Link>
          </div>
        </div>
        <div className="hero__image-wrap">
          <div className="hero__image-tilt">
            <div className="hero__image-fade" aria-hidden />
            <div className="hero__image-inner">
              {showImage ? (
                <Image
                  src={imageSrc}
                  alt="Portrait"
                  fill
                  className="hero__image"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="hero__image-placeholder" aria-hidden>
                  <span>Your portrait image</span>
                  <span className="hero__image-placeholder-hint">Add public/hero-portrait.jpg</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
