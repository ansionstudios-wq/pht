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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = useCallback((target: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
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

        <button
          type="button"
          className={`nav-hamburger ${menuOpen ? "nav-hamburger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="nav-hamburger-bar" />
          <span className="nav-hamburger-bar" />
          <span className="nav-hamburger-bar" />
        </button>

        <ul className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
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

      {menuOpen && (
        <div
          className="nav-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      )}
    </header>
  );
}
