'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement;
  range?: number; // Active magnetic radius
  actionStrength?: number; // Strength factor of pull
}

export default function Magnetic({ children, range = 50, actionStrength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [activeTracking, setActiveTracking] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 15, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    // Disable magnetic effect on touch devices or small viewports
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const isSmallScreen = window.innerWidth < 1024;
    
    if (isTouchDevice || isSmallScreen) {
      setIsInteractive(false);
    } else {
      setIsInteractive(true);
    }
  }, []);

  useEffect(() => {
    if (!isInteractive || !activeTracking) return;

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      const distanceX = clientX - elementCenterX;
      const distanceY = clientY - elementCenterY;
      const distance = Math.hypot(distanceX, distanceY);

      // Within range: apply magnetic pull
      if (distance < range) {
        setHovered(true);
        x.set(distanceX * actionStrength);
        y.set(distanceY * actionStrength);
      } else {
        setHovered(false);
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isInteractive, activeTracking, x, y, range, actionStrength]);

  // If not on interactive desktop device, bypass animations completely
  if (!isInteractive) {
    return <div className="inline-block">{children}</div>;
  }

  const handleMouseEnter = () => {
    setActiveTracking(true);
  };

  const handleMouseLeave = () => {
    setActiveTracking(false);
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
