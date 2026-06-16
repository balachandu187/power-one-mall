'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 150, damping: 25, mass: 0.5 };
  const glowX = useSpring(cursorX, springConfig);
  const glowY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices or small viewports
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const isSmallScreen = window.innerWidth < 1024;

    if (isTouchDevice || isSmallScreen) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 24); // Offset by half of cursor width
      cursorY.set(e.clientY - 24);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-50 mix-blend-screen bg-[radial-gradient(circle,rgba(252,191,73,0.35)_0%,rgba(214,40,40,0)_70%)] blur-xs"
      style={{
        x: glowX,
        y: glowY,
      }}
    />
  );
}
