"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ABOUT_IMAGE = "/assets/gallery/harshini.png";

const BIO = `Hi, I'm Harshini. A believer in beauty — in the way light settles on a quiet afternoon, in the unguarded expression, in the moments too tender to stage. I am here to find those moments and hold them still, pressed into frames you will return to long after the day has passed.

I have lived on both sides of the lens for as long as I can remember. People once called me photogenic, but I came to understand it was never really about that. I am simply happy in those moments — happy being seen, and equally happy doing the seeing. That happiness travels through the camera and into every person I photograph. They do not need to be photogenic. They only need to feel something real, because I always do.

I have always been drawn to people and the quiet worlds they carry within them — to the way someone softens when they feel truly seen. That same gaze extends to everything around them: the effortless elegance of fashion, the unhurried grace of nature, the small and telling details of a life being lived. To me, photography has never been a technique. It is the simple, honest act of recognising beauty in another soul and offering it back to them, gently preserved within a frame.

I photograph the way I remember. I grew up in a village where beauty was soft and unassuming — familiar light, gentle mornings, a landscape that asked nothing of you and gave you everything. I have since crossed oceans and built a life far from there, yet that place has never truly left me. It lives in the warmth I reach for, in the stillness I seek, in the vintage tenderness I find in every frame. My photography is not simply what stands before my lens. It is everything I have ever loved and carried with me.`;

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`about-section ${visible ? "about-section--visible" : ""}`}
    >
      <div className="about-inner layout-wrap">
        <h2 className="about-heading">The Artisan Behind the Lens</h2>
        <div className="about-divider" aria-hidden />

        <div className="about-content">
          <div className="about-image-wrap">
            <Image
              src={ABOUT_IMAGE}
              alt="Harshini portrait"
              width={614}
              height={816}
              className="about-image"
              quality={95}
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </div>
          <div className="about-bio-wrap">
            <div className="about-bio">
              {BIO.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
