'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ShoppingBag,
  Utensils,
  Film,
  Calendar,
  Compass,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Tag,
  Star,
  Quote,
  Sparkles,
} from 'lucide-react';
import { STORES_DATA, EVENTS_DATA, OFFERS_DATA, TESTIMONIALS_DATA, Event } from '@/data/mockData';
import StatsCounter from '@/components/sections/StatsCounter';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';
import Magnetic from '@/components/ui/Magnetic';
import TiltCard from '@/components/ui/TiltCard';
import HeroParticles from '@/components/ui/HeroParticles';

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [useParallax, setUseParallax] = useState(true);

  // Scroll bindings for Hero Cinematic Parallax
  const { scrollY } = useScroll();
  
  // Layer 1: Background image zooms and slides slowly
  const heroBgY = useTransform(scrollY, [0, 800], [0, 240]);
  const heroBgScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  
  // Layer 2: Mid-ground silhouette/tint translates faster for depth illusion
  const heroMidY = useTransform(scrollY, [0, 800], [0, 120]);
  
  // Layer 3: Foreground content moves normally
  const heroContentY = useTransform(scrollY, [0, 800], [0, -40]);
  const heroContentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Disable parallax scrolling on mobile (<768px) and if reduced motion is set
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReducedMotion || isMobile) {
      setUseParallax(false);
    }
  }, []);

  // Extract first 8 stores for home page
  const featuredStores = STORES_DATA.slice(0, 8);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerName.trim() && registerEmail.trim() && selectedEvent) {
      setToastMessage(`Success! You have registered for ${selectedEvent.title}. Check your email for details.`);
      setShowToast(true);
      setSelectedEvent(null);
      setRegisterName('');
      setRegisterEmail('');
    }
  };

  // Stagger variants for Features
  const featuresContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  } as const;

  const featureItem = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 16,
      },
    },
  } as const;

  // Cards fade up variant
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
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

  // Slide-in from right variants for Events
  const eventItemVariant = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 14,
      },
    },
  } as const;

  const features = [
    {
      icon: ShoppingBag,
      title: 'Premium Shopping',
      desc: 'Browse international fashion labels, premium cosmetics, and flagship electronics stores.',
      color: 'from-primary/20 to-primary/5',
      borderColor: 'group-hover:border-primary/50',
    },
    {
      icon: Utensils,
      title: 'Exquisite Dining',
      desc: 'Savor gourmet dishes, local Andhra delicacies, and popular fast food chains at our food court.',
      color: 'from-secondary/20 to-secondary/5',
      borderColor: 'group-hover:border-secondary/50',
    },
    {
      icon: Film,
      title: 'Inox Multiplex',
      desc: 'Watch the latest blockbusters in ultra-high-definition projection and Dolby Atmos sound.',
      color: 'from-accent/20 to-accent/5',
      borderColor: 'group-hover:border-accent/50',
    },
    {
      icon: Calendar,
      title: 'Exciting Events',
      desc: 'Participate in live music nights, seasonal shopping carnivals, and rich culinary festivals.',
      color: 'from-emerald-500/20 to-emerald-500/5',
      borderColor: 'group-hover:border-emerald-500/50',
    },
    {
      icon: Compass,
      title: 'Family Play Zone',
      desc: 'Bring kids to state-of-the-art arcade arenas, virtual reality rides, and indoor play zones.',
      color: 'from-purple-500/20 to-purple-500/5',
      borderColor: 'group-hover:border-purple-500/50',
    },
    {
      icon: Sparkles,
      title: 'Luxury Amenities',
      desc: 'Enjoy ambient air conditioning, modern parking slots, valet service, and high-speed free WiFi.',
      color: 'from-sky-500/20 to-sky-500/5',
      borderColor: 'group-hover:border-sky-500/50',
    },
  ];

  // Letters of the title for animation sequence
  const titleLetters = "POWER ONE MALL".split("");

  return (
    <div className="flex flex-col gap-20">
      {/* 1. CINEMATIC HERO SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black -mt-[72px]"
      >
        {/* ── LAYER 1: Power One Mall night image — parallax + cinematic zoom ── */}
        <motion.div
          style={{ y: useParallax ? heroBgY : 0, scale: useParallax ? heroBgScale : 1 }}
          className="absolute inset-0 z-0 origin-center"
        >
          {/* Cinematic slow zoom-in on load via CSS animation */}
          <div className="absolute inset-0 animate-[hero-zoom_8s_ease-out_forwards]">
            <Image
              src="/hero-bg.jpg"
              alt="Power One Mall Exterior Night Facade"
              fill
              priority
              sizes="100vw"
              quality={95}
              className="object-cover object-[center_15%]"
              suppressHydrationWarning
            />
          </div>

          {/* ── LAYER 2: 60% dark overlay ── */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Gradient polish — darkens top (for nav) and bottom (for section transition) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        </motion.div>

        {/* ── LAYER 2b: Ambient glow — mimics the real building sign lights ── */}
        {/* Power One sign glow — top-left quadrant */}
        <div className="absolute z-[1] pointer-events-none top-[12%] left-[20%] w-64 h-32 bg-red-600/20 rounded-full blur-3xl" />
        {/* Cinépolis sign glow — top-right quadrant */}
        <div className="absolute z-[1] pointer-events-none top-[12%] right-[18%] w-56 h-28 bg-amber-400/15 rounded-full blur-3xl" />
        {/* Warm building facade glow — center */}
        <div className="absolute z-[1] pointer-events-none top-[30%] left-1/2 -translate-x-1/2 w-[500px] h-48 bg-amber-600/10 rounded-full blur-[60px]" />
        {/* Ground-level warm uplighting — bottom */}
        <div className="absolute z-[1] pointer-events-none bottom-[20%] left-1/2 -translate-x-1/2 w-[700px] h-32 bg-orange-500/10 rounded-full blur-3xl" />

        {/* ── LAYER 2c: Mid-ground depth gradient ── */}
        <motion.div
          style={{ y: useParallax ? heroMidY : 0 }}
          className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent"
        />

        {/* ── LAYER 3: Floating Particles — client-only (no SSR mismatch) ── */}
        <HeroParticles />

        {/* ── LAYER 3b: Ambient Light Streaks ── */}
        <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.12] bg-[linear-gradient(105deg,transparent_40%,rgba(252,191,73,0.25)_45%,rgba(252,191,73,0.25)_55%,transparent_60%)] bg-[length:200%_100%] animate-[gradient-shift_14s_infinite_linear]" />
        <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.07] bg-[linear-gradient(75deg,transparent_30%,rgba(214,40,40,0.18)_40%,rgba(247,127,0,0.15)_50%,transparent_60%)] bg-[length:200%_100%] animate-[gradient-shift_20s_5s_infinite_linear]" />

        {/* ── LAYER 4: Hero Content ── */}
        <motion.div
          style={{ y: useParallax ? heroContentY : 0, opacity: useParallax ? heroContentOpacity : 1 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Tagline badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-accent text-xs font-black uppercase tracking-widest"
            >
              <Sparkles className="w-4.5 h-4.5" />
              Vijayawada's New Landmark
            </motion.div>

            {/* Letter-by-letter title animation grouped into words to prevent breaking layout */}
            <h1 className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight uppercase leading-none overflow-hidden">
              {["POWER", "ONE", "MALL"].map((word, wordIdx) => (
                <span key={wordIdx} className="inline-block whitespace-nowrap">
                  {word.split("").map((letter, letterIdx) => {
                    const globalIdx = wordIdx === 0 
                      ? letterIdx 
                      : wordIdx === 1 
                        ? letterIdx + 6 // "POWER " has 6 characters
                        : letterIdx + 10; // "POWER ONE " has 10 characters
                    return (
                      <motion.span
                        key={letterIdx}
                        initial={{ y: 90, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 90,
                          damping: 12,
                          delay: globalIdx * 0.04 + 0.5,
                        }}
                        className={`inline-block tracking-tighter hover:text-accent hover:scale-105 transition-all duration-200 cursor-default ${
                          globalIdx >= 5 && globalIdx <= 7 ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent filter drop-shadow-[0_2px_10px_rgba(214,40,40,0.25)]' : 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]'
                        }`}
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
              className="text-lg sm:text-2xl text-neutral-200 font-medium tracking-wide max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]"
            >
              Shopping, Dining &amp; Entertainment Destination
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-6 mt-4 w-full sm:w-auto"
            >
              <Magnetic range={60}>
                <Link
                  href="/directory"
                  className="w-full sm:w-auto text-center bg-primary hover:bg-primary/95 text-white font-extrabold uppercase tracking-widest text-xs px-6 sm:px-9 py-3.5 sm:py-4.5 rounded-full shadow-xl hover:shadow-primary/45 transition-all duration-205 hover:-translate-y-0.5"
                >
                  Explore Stores
                </Link>
              </Magnetic>
              <Magnetic range={60}>
                <Link
                  href="/food-court"
                  className="w-full sm:w-auto text-center glass hover:bg-white/12 text-white font-extrabold uppercase tracking-widest text-xs px-6 sm:px-9 py-3.5 sm:py-4.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                >
                  Visit Food Court
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-neutral-400">
          <span className="text-[10px] uppercase tracking-widest font-black opacity-60">Scroll Down</span>
          <div className="w-6 h-10 rounded-full border-2 border-neutral-500 flex justify-center p-1 bg-black/20">
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </div>
      </motion.section>


      {/* 2. FEATURES SECTION (STAGGERED AND TILT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="block text-xs font-black uppercase tracking-[0.3em] text-primary">The Ultimate Destination</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2">All Under One Roof</h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        <motion.div
          variants={featuresContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div key={idx} variants={featureItem}>
                <TiltCard className="h-full">
                  <div
                    className={`group flex flex-col p-8 rounded-3xl glass border border-neutral-200/80 dark:border-neutral-800/80 transition-all duration-300 hover:shadow-2xl hover:border-primary/30 h-full relative overflow-hidden`}
                  >
                    {/* Corner Ambient light/glow border animation */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feat.color} text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      <IconComponent className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mt-2.5 flex-grow">
                      {feat.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 3. FEATURED STORES SECTION */}
      <section className="bg-neutral-50 dark:bg-neutral-900/30 py-20 border-y border-neutral-200/50 dark:border-neutral-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-end justify-between gap-6 mb-16">
            <div>
              <span className="block text-xs font-black uppercase tracking-[0.3em] text-primary">Discover Brands</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2">Featured Stores</h2>
              <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
            </div>
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-primary hover:text-secondary transition-colors group"
            >
              View Full Directory
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredStores.map((store, idx) => (
              <motion.div
                key={store.id}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                custom={idx}
                className="group relative overflow-hidden rounded-3xl glass border border-neutral-200/60 dark:border-neutral-800/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
              >
                {/* Store Image */}
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={store.image}
                    alt={store.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    suppressHydrationWarning
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] bg-primary text-white font-extrabold px-2.5 py-1.5 rounded-md uppercase tracking-wider shadow-md">
                      {store.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary transition-colors">
                      {store.name}
                    </h3>
                    <span className="text-[10px] text-neutral-450 dark:text-neutral-500 font-semibold uppercase tracking-widest">
                      {store.floor}
                    </span>
                    <p className="text-xs text-muted leading-relaxed mt-3.5">
                      {store.description}
                    </p>
                  </div>
                  <div className="border-t border-neutral-200/50 dark:border-neutral-800/50 pt-4 mt-5 flex items-center justify-between">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-md">
                      {store.openStatus}
                    </span>
                    <Link
                      href={`/directory?search=${store.name}`}
                      className="text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors flex items-center gap-1"
                    >
                      Store Details &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SPECIAL OFFERS SECTION (TILT OFFERS CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="block text-xs font-black uppercase tracking-[0.3em] text-secondary">Exclusive Discounts</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2">Special Offers &amp; Sales</h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-secondary to-accent mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS_DATA.map((offer) => (
            <motion.div
              key={offer.id}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div className="group flex flex-col sm:flex-row rounded-3xl overflow-hidden glass border border-neutral-200/80 dark:border-neutral-800/80 shadow-md hover:shadow-2xl hover:border-secondary/25 transition-all duration-300 h-full">
                  {/* Image */}
                  <div className="relative h-48 sm:h-auto sm:w-2/5 overflow-hidden shrink-0">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      suppressHydrationWarning
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-neutral-900/30" />
                    <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-wider shadow-md">
                      {offer.discount}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-primary">
                        <Tag className="w-3.5 h-3.5" />
                        {offer.store}
                      </div>
                      <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mt-2 leading-snug">
                        {offer.title}
                      </h3>
                    </div>
                    <div className="border-t border-neutral-200/50 dark:border-neutral-800/50 pt-4 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-450">
                        {offer.validUntil}
                      </span>
                      <Link
                        href="/directory"
                        className="text-xs font-black text-secondary hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-1.5"
                      >
                        Redeem Offer
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. STATISTICS SECTION */}
      <StatsCounter />

      {/* 6. UPCOMING EVENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="flex flex-col sm:flex-row items-end justify-between gap-6 mb-16">
          <div>
            <span className="block text-xs font-black uppercase tracking-[0.3em] text-primary">Entertainment Hub</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2">Upcoming Mall Events</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-primary hover:text-secondary transition-colors group"
          >
            All Events Calendar
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVENTS_DATA.map((evt) => (
            <motion.div
              key={evt.id}
              variants={eventItemVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="group relative overflow-hidden rounded-3xl shadow-lg border border-neutral-200/60 dark:border-neutral-800/80 glass flex flex-col"
            >
              {/* Event Cover Image */}
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={evt.image}
                  alt={evt.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  suppressHydrationWarning
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 text-white text-[10px] font-black uppercase tracking-widest mb-2 shadow-md">
                    <Calendar className="w-3 h-3" />
                    {evt.date}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white">{evt.title}</h3>
                </div>
              </div>

              {/* Description & Button */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <p className="text-sm text-muted leading-relaxed">{evt.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-neutral-200/50 dark:border-neutral-800/50 pt-4 mt-6 gap-4">
                  <div className="text-xs text-neutral-550 dark:text-neutral-400">
                    <p className="font-bold text-neutral-800 dark:text-neutral-200">Location: {evt.location}</p>
                    <p className="mt-0.5">Time: {evt.time}</p>
                  </div>
                  {evt.registrationOpen ? (
                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className="bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-md hover:shadow-primary/30 transition-all duration-205 text-center cursor-pointer"
                    >
                      {evt.ctaText}
                    </button>
                  ) : (
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider italic">
                      Registration Closed
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="bg-neutral-50 dark:bg-neutral-900/30 py-20 border-y border-neutral-200/50 dark:border-neutral-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="block text-xs font-black uppercase tracking-[0.3em] text-primary">Visitor Experiences</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2">What Our Guests Say</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="relative p-8 rounded-3xl glass border border-neutral-200/80 dark:border-neutral-800/80 shadow-md flex flex-col justify-between"
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm italic text-muted leading-relaxed mb-6">"{t.review}"</p>
                <div className="border-t border-neutral-200/50 dark:border-neutral-800/50 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-neutral-800 dark:text-neutral-100">{t.name}</h4>
                    <p className="text-[10px] text-neutral-450 uppercase tracking-widest mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LOCATION & INFO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact details Card */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col justify-between p-8 sm:p-12 rounded-3xl glass border border-neutral-200/80 dark:border-neutral-800/80 shadow-lg"
          >
            <div>
              <span className="block text-xs font-black uppercase tracking-[0.3em] text-primary">Find Us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2">Location &amp; Hours</h2>
              <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
              
              <ul className="space-y-6 mt-10 text-sm">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-800 dark:text-neutral-100">Address</p>
                    <p className="text-muted leading-relaxed mt-1">
                      MG Road, Labbipet, Vijayawada, Andhra Pradesh 520010, India
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-800 dark:text-neutral-100">Opening Hours</p>
                    <p className="text-muted leading-relaxed mt-1">
                      Open Daily: 10:00 AM - 10:00 PM
                    </p>
                    <p className="text-xs text-neutral-400 mt-1 italic">
                      Multiplex &amp; Dining hours may vary.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-800 dark:text-neutral-100">Inquiries</p>
                    <p className="text-muted leading-relaxed mt-1">
                      General Desk: +91 866 6691100
                    </p>
                    <p className="text-muted leading-relaxed">
                      Leasing Desk: +91 866 6691122
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200/50 dark:border-neutral-800/50 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-colors"
              >
                Send Message
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto text-center border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200/30 dark:hover:bg-neutral-800/30 font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-colors"
              >
                Mall Highlights
              </Link>
            </div>
          </motion.div>

          {/* Styled Map Placeholder */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative overflow-hidden rounded-3xl shadow-lg border border-neutral-200/80 dark:border-neutral-800/80 min-h-[350px]"
          >
            {/* Ambient background for placeholder map */}
            <div className="absolute inset-0 bg-neutral-150 dark:bg-neutral-900 flex flex-col items-center justify-center p-6 text-center">
              {/* Map UI Elements */}
              <div className="w-full h-full relative flex items-center justify-center">
                {/* SVG Mock Map Grid */}
                <svg className="w-full h-full opacity-30 dark:opacity-20 absolute" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <path d="M 0,100 Q 200,120 400,20 Q 600,300 800,200" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path d="M 100,0 C 150,200 50,300 300,500" fill="none" stroke="currentColor" strokeWidth="2.5" />
                </svg>

                {/* Styled Pin Marker */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-12 h-12 rounded-full bg-primary/30 animate-ping" />
                    <div className="relative w-14 h-14 rounded-full bg-primary/25 border border-primary/45 flex items-center justify-center shadow-lg">
                      <MapPin className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div className="glass px-4 py-2 rounded-xl border border-primary/20 text-center shadow-lg">
                    <p className="text-xs font-black text-neutral-800 dark:text-white uppercase tracking-wider">Power One Mall</p>
                    <p className="text-[10px] text-primary font-bold mt-0.5">MG Road, Vijayawada</p>
                  </div>
                </div>
              </div>

              {/* Google Maps link button */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-200"
              >
                Open in Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. EVENT REGISTRATION MODAL */}
      <Modal
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent ? `Register: ${selectedEvent.title}` : 'Event Registration'}
      >
        {selectedEvent && (
          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-2">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Selected Event</p>
              <h4 className="text-base font-extrabold text-neutral-800 dark:text-neutral-100 mt-1">
                {selectedEvent.title}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-450 mt-1">
                📅 {selectedEvent.date} &bull; ⏰ {selectedEvent.time}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-450 mt-1">
                📍 Location: {selectedEvent.location}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-name" className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Full Name
              </label>
              <input
                id="reg-name"
                type="text"
                required
                placeholder="Enter your full name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-neutral-800 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-email" className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="reg-email"
                type="email"
                required
                placeholder="Enter your email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-neutral-800 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2.5 mt-2">
              <input
                type="checkbox"
                id="reg-terms"
                required
                className="rounded text-primary focus:ring-primary w-4.5 h-4.5 accent-primary cursor-pointer"
              />
              <label htmlFor="reg-terms" className="text-xs text-neutral-500 dark:text-neutral-400 cursor-pointer">
                I agree to the mall privacy policy and event terms of participation.
              </label>
            </div>

            <button
              type="submit"
              className="mt-4 bg-primary hover:bg-primary/95 text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg hover:shadow-primary/30 transition-all duration-200 cursor-pointer"
            >
              Confirm Registration
            </button>
          </form>
        )}
      </Modal>

      {/* 10. SUCCESS TOAST */}
      <Toast isVisible={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  );
}
