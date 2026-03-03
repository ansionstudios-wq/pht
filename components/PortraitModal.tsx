"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type PortraitModalItem = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type PortraitModalProps = {
  item: PortraitModalItem | null;
  onClose: () => void;
};

export function PortraitModal({ item, onClose }: PortraitModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (!item) {
      setReveal(false);
      return;
    }
    setReveal(false);
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReveal(true));
    });
    return () => cancelAnimationFrame(t);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!item) return null;

  return (
    <div
      ref={overlayRef}
      className="portrait-modal-overlay"
      data-open={reveal ? "true" : undefined}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portrait-modal-title"
      aria-describedby="portrait-modal-desc"
    >
      <div className="portrait-modal">
        <button
          type="button"
          className="portrait-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="portrait-modal-frame">
          <div className="portrait-modal-image-wrap">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="portrait-modal-image"
              sizes="(max-width: 900px) 95vw, 80vmin"
            />
          </div>
        </div>
        <div className="portrait-modal-caption">
          <h2 id="portrait-modal-title" className="portrait-modal-title">
            {item.title}
          </h2>
          <p id="portrait-modal-desc" className="portrait-modal-description">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
