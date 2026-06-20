'use client';

import { useEffect, useRef } from 'react';

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track scroll outside the animation frame loop to prevent layout thrashing
    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let isIntersecting = true;
    let isRunning = true;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    const isMobile = window.innerWidth < 768;
    // Reduce particle count by 70% (Desktop: 45 -> 13, Mobile: 15 -> 4)
    const numParticles = isMobile ? 4 : 13;

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedY: Math.random() * 0.4 + 0.1,
        speedX: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // Debounce resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!isIntersecting || !isRunning) return;

      ctx.clearRect(0, 0, width, height);

      const currentScrollY = scrollY;
      const scrollDiff = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Draw and update particles
      particles.forEach((p) => {
        p.y -= p.speedY + scrollDiff * 0.15;
        p.x += p.speedX;

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        } else if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        if (p.x < -10) {
          p.x = width + 10;
        } else if (p.x > width + 10) {
          p.x = -10;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(252, 191, 73, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Intersection Observer to pause rendering when the canvas is offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasIntersecting = isIntersecting;
          isIntersecting = entry.isIntersecting;
          if (isIntersecting && !wasIntersecting) {
            lastScrollY = scrollY = window.scrollY; // Reset offset tracking
            animate();
          }
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    // Tab visibility handling to pause loop when browser tab is inactive
    const handleVisibility = () => {
      isRunning = !document.hidden;
      if (isRunning && isIntersecting) {
        lastScrollY = scrollY = window.scrollY;
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Start loop
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-1"
    />
  );
}
