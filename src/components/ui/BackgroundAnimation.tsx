'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationFrameId: number;

    // Mouse positions for parallax interaction
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic Blobs config
    const blobs = [
      { x: width * 0.25, y: height * 0.2, targetX: width * 0.25, targetY: height * 0.2, size: 300, color: 'rgba(214, 40, 40, 0.045)', speed: 0.005 },
      { x: width * 0.75, y: height * 0.35, targetX: width * 0.75, targetY: height * 0.35, size: 400, color: 'rgba(247, 127, 0, 0.035)', speed: 0.004 },
      { x: width * 0.5, y: height * 0.75, targetX: width * 0.5, targetY: height * 0.75, size: 350, color: 'rgba(252, 191, 73, 0.035)', speed: 0.006 },
    ];

    // Subtle floating glowing dots
    const dots: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      angle: number;
      speed: number;
      radius: number;
    }> = [];

    const numDots = 30;
    for (let i = 0; i < numDots; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
        radius: Math.random() * 25 + 5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Interpolate mouse positions for smooth parallax lagging
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const parallaxX = (mouse.x - width / 2) * 0.04;
      const parallaxY = (mouse.y - height / 2) * 0.04;

      // 2. Render & move gradient blobs
      blobs.forEach((blob) => {
        // Continuous organic floating motion
        const time = Date.now() * blob.speed * 0.1;
        const offsetX = Math.sin(time) * 40;
        const offsetY = Math.cos(time) * 40;

        // Apply mouse parallax drift
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

      // 3. Render floating dots
      dots.forEach((dot) => {
        // Floating movement
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

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Canvas for background animations */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Luxury Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.012] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] dark:opacity-[0.015] pointer-events-none" />
    </div>
  );
}
