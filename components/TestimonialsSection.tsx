"use client";

import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "To sit before this lens is to be seen as you are—gentle, patient, and utterly present. The portrait we made feels less like a photograph and more like a window into a moment I will carry forever.",
    author: "Elena V.",
    role: "Fine art client",
  },
  {
    quote:
      "I had never felt so at ease in front of a camera. The light, the silence, the care—it was like stepping into an old temple where time slows and the soul is allowed to show itself.",
    author: "James M.",
    role: "Portrait session",
  },
  {
    quote:
      "These are not pictures. They are inscriptions—carved in light and shadow, as lasting as stone. I am grateful to have been witnessed in this way.",
    author: "Sofia K.",
    role: "Wedding portraits",
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
        <h2 className="testimonials-heading">Words Carved in Stone</h2>
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
