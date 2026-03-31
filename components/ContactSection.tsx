"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError(
        "Email sending isn't configured yet. Please set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY."
      );
      return;
    }

    const formEl = formRef.current;
    if (!formEl) {
      setError("Something went wrong. Please refresh and try again.");
      return;
    }

    try {
      setSubmitting(true);
      await emailjs.sendForm(serviceId, templateId, formEl, { publicKey });
      setSubmitted(true);
      formEl.reset();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err && "text" in err
            ? String((err as { text?: unknown }).text)
            : null;
      setError(message ? `Failed to send your message: ${message}` : "Failed to send your message. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
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

        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
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

          {error && (
            <p className="contact-error" role="alert">
              {error}
            </p>
          )}

          <div className="contact-actions">
            <button type="submit" className="contact-submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send your message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
