"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Home", target: "hero" },
  { label: "Gallery", target: "gallery" },
  { label: "About", target: "about" },
  { label: "Testimonials", target: "testimonials" },
  { label: "Contact", target: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((target: string) => {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <header
      className={`nav-bar ${scrolled ? "nav-bar--scrolled" : ""}`}
      role="banner"
    >
      <nav className="nav-inner" aria-label="Main">
        <Link href="/" className="nav-logo">
          <span className="nav-logo-line">Ansion</span>
          <span className="nav-logo-line">studio</span>
        </Link>
        <ul className="nav-links">
          {NAV_ITEMS.map(({ label, target }) => (
            <li key={target}>
              <button
                type="button"
                className="nav-link"
                onClick={() => scrollTo(target)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
