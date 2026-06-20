'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  width: string;
  height: string;
  left: string;
  top: string;
  background: string;
  animation: string;
}

const COLORS = [
  'rgba(252,191,73,0.7)',
  'rgba(214,40,40,0.5)',
  'rgba(247,127,0,0.5)',
  'rgba(255,255,255,0.4)',
];

/**
 * Renders 28 floating ambient particles inside the hero section.
 * Defers rendering to the client (after mount) to avoid SSR/client
 * hydration mismatches caused by Math.random().
 */
export default function HeroParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 3 : 8;
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      background: COLORS[i % 4],
      animation: `float-particle ${6 + Math.random() * 10}s ${Math.random() * 8}s infinite ease-in-out`,
    }));
    setParticles(generated);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-y-0 left-0 right-0 w-full z-[2] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.width,
            height: p.height,
            left: p.left,
            top: p.top,
            background: p.background,
            animation: p.animation,
          }}
        />
      ))}
    </div>
  );
}
