'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Compass, Target, Shield, Sparkles, Coffee, UserCheck } from 'lucide-react';
import StatsCounter from '@/components/sections/StatsCounter';

export default function AboutPage() {
  const highlights = [
    {
      icon: Sparkles,
      title: "Vijayawada's Finest",
      desc: 'Strategically located in Labbipet, MG Road, serving as a premium shopping hub for the city.',
    },
    {
      icon: Target,
      title: 'Curated Brands',
      desc: 'Hosts top international fashion, electronics, and cosmetic lines under one unified space.',
    },
    {
      icon: Coffee,
      title: 'Leisure Hub',
      desc: 'Equipped with a grand food court and state-of-the-art INOX Insignia multiplex cinema.',
    },
    {
      icon: UserCheck,
      title: 'Customer First',
      desc: 'Designed with modern parking lots, central climate control, baby rooms, and standard facilities.',
    },
  ];

  const facilities = [
    { title: 'Central Air Conditioning', desc: 'Maintained at a comfortable 22°C year-round' },
    { title: 'Spacious Multi-Level Parking', desc: 'Secure space for 500+ cars and two-wheelers' },
    { title: 'Free High-Speed WiFi', desc: 'Seamless wireless coverage throughout the mall' },
    { title: 'Baby Care & Nursing Rooms', desc: 'Private, clean spaces for mothers and infants' },
    { title: 'Disabled-Friendly Elevators', desc: 'Wheelchair access ramp layouts on all floors' },
    { title: '24/7 Security & Surveillance', desc: 'CCTV cameras and professionally trained guards' },
  ];

  // Awwwards-style clip-path curtain reveal
  const imageReveal = {
    hidden: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', scale: 1.15 },
    visible: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const textWords = "Vijayawada's Premier Shopping & Lifestyle Destination".split(' ');

  const textContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const textWordItem = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  } as const;

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  } as const;

  return (
    <div className="relative flex flex-col gap-20 py-16 overflow-hidden">
      {/* Slow Moving Background Ambient Light Streaks */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[-15%] w-[60%] h-[400px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full rotate-12 blur-[100px] animate-[pulse_10s_infinite_ease-in-out]" />
        <div className="absolute top-[65%] right-[-15%] w-[60%] h-[400px] bg-gradient-to-bl from-secondary/5 to-transparent rounded-full -rotate-12 blur-[100px] animate-[pulse_12s_infinite_ease-in-out_2s]" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="block text-xs font-black uppercase tracking-[0.3em] text-primary">Our Legacy</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mt-2">About Power One Mall</h1>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image reveal from left */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative h-[350px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/5"
          >
            <Image
              src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1200"
              alt="Power One Mall Building Structure"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-neutral-900/10" />
          </motion.div>

          {/* Staggered word text reveal */}
          <div className="flex flex-col gap-6">
            <motion.h2
              variants={textContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="text-2xl sm:text-3xl font-extrabold text-neutral-800 dark:text-neutral-100 tracking-tight flex flex-wrap gap-x-2.5 leading-tight"
            >
              {textWords.map((word, idx) => (
                <motion.span key={idx} variants={textWordItem} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm sm:text-base text-muted leading-relaxed"
            >
              Established as a milestone of architectural luxury, **Power One Mall** stands tall on MG Road as the city's ultimate center for premium brands, mouthwatering thalis, and state-of-the-art cinema screens. 
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm sm:text-base text-muted leading-relaxed"
            >
              Our vision is to offer the residents of Vijayawada a world-class shopping environment that mirrors the premium aesthetics of major metropolises like Dubai and Mumbai, creating a place where families can meet, dine, and build unforgettable memories.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. MISSION & VISION SECTION */}
      <section className="bg-neutral-50 dark:bg-neutral-900/30 py-20 border-y border-neutral-200/50 dark:border-neutral-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mission Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ y: -6 }}
              className="p-8 sm:p-12 rounded-3xl glass border border-neutral-200/80 dark:border-neutral-800/80 shadow-md flex flex-col gap-6 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Our Mission</h3>
              <p className="text-sm text-muted leading-relaxed">
                To transform Vijayawada's retail landscape by curating premium global brands, providing excellent customer service, and organizing family-centric social events that add value to our local community.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ y: -6 }}
              className="p-8 sm:p-12 rounded-3xl glass border border-neutral-200/80 dark:border-neutral-800/80 shadow-md flex flex-col gap-6 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Our Vision</h3>
              <p className="text-sm text-muted leading-relaxed">
                To remain the most trusted, commercially viable, and aesthetically elite retail destination in Andhra Pradesh, where trust, commerce, and human interaction thrive hand-in-hand.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PREMIUM STATISTICS COUNTER */}
      <div className="relative z-10">
        <StatsCounter />
      </div>

      {/* 4. MALL HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="block text-xs font-black uppercase tracking-[0.3em] text-primary">Distinctive Elements</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2">Mall Highlights</h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                whileHover={{ y: -5, boxShadow: '0 8px 25px -5px rgba(214, 40, 40, 0.08)' }}
                className="flex flex-col p-6 rounded-2xl glass border border-neutral-250 dark:border-neutral-800 shadow-sm transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">{item.title}</h4>
                <p className="text-xs text-muted leading-relaxed mt-2">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. FACILITIES & CONVENIENCES */}
      <section className="bg-neutral-900 text-white py-20 border-t border-neutral-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="block text-xs font-black uppercase tracking-[0.3em] text-primary">World Class Conveniences</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2 text-white">Mall Facilities</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {facilities.map((fac, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                whileHover={{ scale: 1.015 }}
                className="p-6 rounded-2xl bg-neutral-800/60 border border-neutral-700/50 flex flex-col justify-between transition-all duration-300 cursor-default"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{fac.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{fac.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
