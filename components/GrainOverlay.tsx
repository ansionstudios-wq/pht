"use client";

/**
 * Subtle grain overlay for an atmospheric, cinematic feel.
 * Fixed position, pointer-events: none, so it doesn’t block interaction.
 */
export function GrainOverlay() {
  return (
    <div
      className="grain-container"
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        opacity: 0.09,
        mixBlendMode: "multiply",
      }}
    />
  );
}
