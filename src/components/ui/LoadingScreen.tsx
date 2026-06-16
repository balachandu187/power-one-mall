'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Prevent scroll while loading
    document.body.style.overflow = 'hidden';

    // Fast loading simulation
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = '';
          }, 800); // Wait for final fade
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 60);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  const textLetters = "POWER ONE MALL".split("");

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-y-0 left-0 right-0 w-full max-w-full z-50 bg-neutral-950 flex flex-col items-center justify-center text-white"
        >
          {/* Logo Animation */}
          <div className="flex items-center gap-1.5 overflow-hidden mb-8">
            {textLetters.map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                  delay: idx * 0.05,
                }}
                className={`text-3xl sm:text-5xl font-black tracking-tight ${
                  letter === ' ' ? 'mr-3' : ''
                } ${idx >= 5 && idx <= 7 ? 'text-primary' : 'text-white'}`}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Loader Line */}
          <div className="w-48 h-[2px] bg-neutral-800 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute h-full left-0 top-0 bg-gradient-to-r from-primary to-secondary"
              initial={{ width: '0%' }}
              animate={{ width: `${count}%` }}
              transition={{ ease: 'easeInOut' }}
            />
          </div>

          {/* Percentage Counter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-xs font-bold tracking-[0.25em] text-neutral-400 mt-4 tabular-nums uppercase"
          >
            Loading &bull; {count}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
