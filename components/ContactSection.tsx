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
          <p className="contact-success-badge">Received</p>
          <h2 className="contact-heading contact-heading--success">Your story has reached us</h2>
          <div className="contact-divider" aria-hidden />
          <div className="contact-success">
            <p className="contact-success-text">
              Thank you. We have read your words with care and will reply in kind.
              Your moment matters to us.
            </p>
            <p className="contact-success-signature">— Anusion studio</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-scroll">
        <h2 className="contact-heading">Your Vision, Our Lens</h2>
        <p className="contact-subheading">
          Every story begins with a single message. We're honoured to read yours.
        </p>
        <div className="contact-divider" aria-hidden />

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-field">
            <label htmlFor="contact-name" className="contact-label">
              name
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
              email
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
              message
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
            <button type="submit" className="contact-submit">
              Send your message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
