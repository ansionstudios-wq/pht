"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`nav ${scrolled ? "nav--scrolled" : ""} ${mobileOpen ? "nav--menu-open" : ""}`}
      role="banner"
    >
      <div className="nav__inner">
        <Link href="/" className="nav__brand" aria-label="Home">
          <span className="nav__logo" aria-hidden>
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M4 14h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
              <circle cx="16" cy="10" r="1.5" fill="currentColor" />
              <circle cx="22" cy="10" r="1.5" fill="currentColor" />
            </svg>
          </span>
          <span className="nav__name">Lumina</span>
        </Link>

        <nav className="nav__menu" aria-label="Main navigation">
          <ul className="nav__list">
            {MENU_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav__link ${pathname === href ? "nav__link--active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="nav__toggle"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span className="nav__toggle-bar nav__toggle-bar--1" />
          <span className="nav__toggle-bar nav__toggle-bar--2" />
          <span className="nav__toggle-bar nav__toggle-bar--3" />
        </button>
      </div>

      <div className="nav__backdrop" onClick={() => setMobileOpen(false)} aria-hidden />
    </header>
  );
}
