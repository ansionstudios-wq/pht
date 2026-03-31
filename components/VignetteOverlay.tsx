"use client";

/**
 * Subtle vignette darkening on screen edges — heritage gallery / temple feel.
 */
export function VignetteOverlay() {
  return (
    <div
      className="vignette-overlay"
      aria-hidden
      style={{
        background: `radial-gradient(
          ellipse 80% 70% at 50% 50%,
          transparent 40%,
          rgba(26, 21, 18, 0.12) 70%,
          rgba(26, 21, 18, 0.28) 100%
        )`,
      }}
    />
  );
}
