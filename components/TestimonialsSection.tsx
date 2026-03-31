"use client";

import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "She really said 'let me show you how beautiful you are.' If you need portraits that actually hit, go to her. All the best Harshu and Ansion Studios.",
    author: "Yaznitha",
  },
  {
    quote:
      "Amazing work. I've always thought Harshini had a natural knack for aesthetics. Truly love her work and wishing her all the best.",
    author: "Sevitha Darshini Anadaraj",
  },
  {
    quote:
      "Portraits that feel natural and timeless. The moments were captured beautifully by Ansion Studios, creating photos that truly stand out.",
    author: "Anjali",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`testimonials-section ${visible ? "testimonials-section--visible" : ""}`}
    >
      <div className="layout-wrap">
        <h2 className="testimonials-heading">Words Carved in Ansion</h2>
        <div className="testimonials-divider" aria-hidden />

        <ul className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <li key={i} className="testimonial-card">
              <blockquote className="testimonial-quote">{t.quote}</blockquote>
              <footer className="testimonial-author">
                <cite className="testimonial-name">{t.author}</cite>
                {t.role && <span className="testimonial-role">{t.role}</span>}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
