"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1557862921-37829c790f19?w=800&q=80";

const BIO = `I came to portrait work through a love of light and a belief that every face holds a story waiting to be seen. For years I wandered through old galleries and temples, studying how the masters caught a glance, a fold of cloth, a moment of stillness—and slowly, the craft became a kind of devotion.

What I seek in each sitting is not perfection, but presence: the unguarded instant when the person before the lens is simply themselves. I work with natural light whenever I can, and with patience. The best portraits, like the oldest manuscripts, are made of time and attention.

This gallery is a record of those encounters—faces that have trusted me with their silence and their light. I offer them here as you might find them in an old journal: not as trophies, but as witnesses to the quiet art of seeing.`;

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
              alt="The portrait photographer at work"
              width={480}
              height={600}
              className="about-image"
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
