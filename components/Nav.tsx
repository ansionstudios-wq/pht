"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
          <li>
            <a href="#hero" className="nav-link">
              Home
            </a>
          </li>
          <li>
            <a href="#gallery" className="nav-link">
              Gallery
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          <li>
            <a href="#testimonials" className="nav-link">
              Testimonials
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
