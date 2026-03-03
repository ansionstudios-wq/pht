"use client";

import { useState } from "react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="contact" className="contact-section">
        <div className="contact-scroll">
          <h2 className="contact-heading">Your missive has been received</h2>
          <div className="contact-divider" aria-hidden />
          <div className="contact-success">
            <p className="contact-success-text">
              Thank you for reaching out. Your words have been carried to us like
              a scroll of old—we shall read them with care and reply in kind
              before long.
            </p>
            <p className="contact-success-signature">— The Atelier</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-scroll">
        <h2 className="contact-heading">Send Your Invitation</h2>
        <div className="contact-divider" aria-hidden />

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-field">
            <label htmlFor="contact-name" className="contact-label">
              Your name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              className="contact-input"
              required
              autoComplete="name"
              placeholder=" "
            />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email" className="contact-label">
              Your email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              className="contact-input"
              required
              autoComplete="email"
              placeholder=" "
            />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message" className="contact-label">
              Your message
            </label>
            <textarea
              id="contact-message"
              name="message"
              className="contact-input contact-textarea"
              required
              rows={4}
              placeholder=" "
            />
          </div>
          <div className="contact-actions">
            <button type="submit" className="contact-submit btn-engraved">
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
