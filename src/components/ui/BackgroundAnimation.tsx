'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // 1. Check mobile/tablet and reduced motion - disable canvas to save CPU/GPU
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || prefersReducedMotion) {
      setShouldRender(false);
      return;
    }
    
    setShouldRender(true);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationFrameId: number;
    let isRunning = true;

    // Mouse positions for parallax interaction
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Debounced resize
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

    // Dynamic Blobs config - reduced count from 3 to 2 for GPU optimization
    const blobs = [
      { x: width * 0.25, y: height * 0.2, targetX: width * 0.25, targetY: height * 0.2, size: 250, color: 'rgba(214, 40, 40, 0.04)', speed: 0.005 },
      { x: width * 0.75, y: height * 0.35, targetX: width * 0.75, targetY: height * 0.35, size: 320, color: 'rgba(247, 127, 0, 0.03)', speed: 0.004 }
    ];

    // Floating dots - reduced count by 70% (30 -> 9)
    const dots: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      angle: number;
      speed: number;
      radius: number;
    }> = [];

    const numDots = 9;
    for (let i = 0; i < numDots; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
        radius: Math.random() * 25 + 5,
      });
    }

    const animate = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse positions for smooth parallax lagging
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const parallaxX = (mouse.x - width / 2) * 0.04;
      const parallaxY = (mouse.y - height / 2) * 0.04;

      // Render & move gradient blobs
      blobs.forEach((blob) => {
        const time = Date.now() * blob.speed * 0.1;
        const offsetX = Math.sin(time) * 35;
        const offsetY = Math.cos(time) * 35;

        const finalX = blob.x + offsetX + parallaxX;
        const finalY = blob.y + offsetY + parallaxY;

        const gradient = ctx.createRadialGradient(finalX, finalY, 10, finalX, finalY, blob.size);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(finalX, finalY, blob.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render floating dots
      dots.forEach((dot) => {
        dot.angle += dot.speed;
        const driftX = Math.cos(dot.angle) * dot.radius * 0.08;
        const driftY = Math.sin(dot.angle) * dot.radius * 0.08;

        const x = (dot.x + driftX + parallaxX * 0.3 + width) % width;
        const y = (dot.y + driftY + parallaxY * 0.3 + height) % height;

        ctx.beginPath();
        ctx.arc(x, y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(252, 191, 73, ${dot.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Tab visibility handling to pause loop when browser tab is inactive
    const handleVisibility = () => {
      isRunning = !document.hidden;
      if (isRunning) {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearTimeout(resizeTimeout);
    };
  }, [shouldRender]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-background">
      {/* Canvas for background animations - conditionally rendered based on platform checks */}
      {shouldRender && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      )}
      
      {/* Luxury Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 w-full h-full opacity-[0.01] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
    </div>
  );
}
