'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItemProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

function StatCounterItem({ end, suffix = '', label, duration = 2 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="flex flex-col items-center text-center p-3 min-[360px]:p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
    >
      <span className="text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-xs sm:text-sm font-bold tracking-widest text-neutral-400 uppercase mt-2">{label}</span>
    </motion.div>
  );
}

export default function StatsCounter() {
  const stats = [
    { end: 170, suffix: 'K+ Sq Ft', label: 'Retail Space' },
    { end: 100, suffix: '+', label: 'Stores' },
    { end: 500, suffix: '+', label: 'Parking Slots' },
    { end: 1, suffix: 'M+', label: 'Happy Visitors' },
  ];

  return (
    <section className="relative py-20 bg-neutral-950 text-white overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(214,40,40,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(247,127,0,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Power One by the Numbers</h2>
          <p className="text-3xl font-black tracking-tight mt-2 text-white sm:text-4xl">
            A Hub of Scale and Excellence
          </p>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <StatCounterItem
              key={idx}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
