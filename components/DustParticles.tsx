"use client";

/**
 * Soft floating dust particles — slow, atmospheric movement.
 * Respects prefers-reduced-motion.
 */
const PARTICLE_COUNT = 12;

const particles = [
  { id: 0, size: 2, left: "12%", top: "20%", duration: 22, delay: 0, opacity: 0.22 },
  { id: 1, size: 1.8, left: "78%", top: "15%", duration: 26, delay: 2, opacity: 0.18 },
  { id: 2, size: 2.5, left: "45%", top: "35%", duration: 20, delay: 4, opacity: 0.2 },
  { id: 3, size: 1.5, left: "8%", top: "60%", duration: 28, delay: 1, opacity: 0.16 },
  { id: 4, size: 2.2, left: "85%", top: "55%", duration: 24, delay: 3, opacity: 0.24 },
  { id: 5, size: 1.7, left: "25%", top: "75%", duration: 19, delay: 5, opacity: 0.19 },
  { id: 6, size: 2, left: "62%", top: "80%", duration: 25, delay: 2, opacity: 0.17 },
  { id: 7, size: 1.6, left: "50%", top: "12%", duration: 23, delay: 6, opacity: 0.21 },
  { id: 8, size: 2.3, left: "92%", top: "40%", duration: 21, delay: 1, opacity: 0.18 },
  { id: 9, size: 1.9, left: "5%", top: "85%", duration: 27, delay: 4, opacity: 0.2 },
  { id: 10, size: 2.1, left: "35%", top: "48%", duration: 20, delay: 3, opacity: 0.23 },
  { id: 11, size: 1.5, left: "70%", top: "28%", duration: 29, delay: 0, opacity: 0.16 },
];

export function DustParticles() {
  return (
    <div className="dust-container" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="dust-particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
