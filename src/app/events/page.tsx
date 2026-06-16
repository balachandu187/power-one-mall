'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { EVENTS_DATA, Event } from '@/data/mockData';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Timeline Progress Scroll tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Confetti Particle Background
  const confettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = confettiRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ['#D62828', '#F77F00', '#FCBF49', '#3b82f6', '#8b5cf6', '#10b981'];
    const pieces: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const maxPieces = 30;

    for (let i = 0; i < maxPieces; i++) {
      pieces.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 0.7 + 0.3,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      pieces.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regName.trim() && regEmail.trim() && selectedEvent) {
      setToastMessage(`Congratulations! You are registered for the ${selectedEvent.title}!`);
      setShowToast(true);
      setSelectedEvent(null);
      setRegName('');
      setRegEmail('');
      setRegPhone('');
    }
  };

  // Alternating slide variants
  const cardVariants = (isEven: boolean) => ({
    hidden: { opacity: 0, x: isEven ? -75 : 75, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 70,
        damping: 15,
      },
    },
  });

  return (
    <div className="relative min-h-screen py-16 overflow-hidden">
      {/* Celebration Confetti Canvas Backdrop */}
      <canvas ref={confettiRef} className="fixed inset-0 pointer-events-none z-0 w-full h-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="block text-xs font-black uppercase tracking-[0.3em] text-primary">Join the Fun</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mt-2">Upcoming Mall Events</h1>
          <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Content Wrap */}
        <div className="relative pl-6 sm:pl-10 md:pl-16" ref={containerRef}>
          {/* Vertical progress line */}
          <div className="absolute left-3 sm:left-5 md:left-8 top-6 bottom-6 w-1 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-3 sm:left-5 md:left-8 top-6 bottom-6 w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-full"
          />

          {/* Events Listing */}
          <div className="flex flex-col gap-16">
            {EVENTS_DATA.map((evt, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={evt.id}
                  variants={cardVariants(isEven)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  whileHover={{ y: -6, boxShadow: '0 10px 30px -5px rgba(214, 40, 40, 0.12)' }}
                  className={`flex flex-col lg:flex-row rounded-3xl overflow-hidden glass border border-neutral-200/50 dark:border-neutral-800/80 shadow-lg relative group transition-all duration-300 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Event Cover Image */}
                  <div className="relative h-64 sm:h-80 lg:h-auto lg:w-1/2 overflow-hidden shrink-0">
                    <Image
                      src={evt.image}
                      alt={evt.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-neutral-900/10 dark:bg-neutral-900/30" />
                    <div className="absolute top-6 left-6 bg-primary text-white text-[10px] font-black px-3.5 py-1.5 rounded-md uppercase tracking-wider shadow-md flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 fill-accent text-accent" />
                      {evt.registrationOpen ? 'Open Now' : 'Closed'}
                    </div>
                  </div>

                  {/* Event Details Content */}
                  <div className="p-8 sm:p-12 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Meta items */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 text-primary">
                          <Calendar className="w-4.5 h-4.5" />
                          {evt.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4.5 h-4.5" />
                          {evt.time}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-neutral-800 dark:text-neutral-100 mb-4 group-hover:text-primary transition-colors tracking-tight leading-tight">
                        {evt.title}
                      </h2>

                      <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
                        {evt.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-600 dark:text-neutral-350">
                        <MapPin className="w-4.5 h-4.5 text-primary" />
                        <span>Location: {evt.location}</span>
                      </div>
                    </div>

                    <div className="border-t border-neutral-200/50 dark:border-neutral-800/50 pt-6 mt-8 flex items-center justify-between">
                      {evt.registrationOpen ? (
                        <button
                          onClick={() => setSelectedEvent(evt)}
                          className="bg-primary hover:bg-primary/95 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:shadow-primary/30 transition-all duration-200 cursor-pointer"
                        >
                          {evt.ctaText}
                        </button>
                      ) : (
                        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-extrabold uppercase tracking-widest italic">
                          Registration Closed
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <Modal
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent ? `Register: ${selectedEvent.title}` : 'Event Pass'}
      >
        {selectedEvent && (
          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-2">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Event Details</p>
              <h4 className="text-base font-extrabold text-neutral-800 dark:text-neutral-100 mt-1">
                {selectedEvent.title}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                📅 {selectedEvent.date} &bull; ⏰ {selectedEvent.time}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ev-name" className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Full Name
              </label>
              <input
                id="ev-name"
                type="text"
                required
                placeholder="Enter your name"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-neutral-800 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ev-email" className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="ev-email"
                type="email"
                required
                placeholder="Enter your email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-neutral-800 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ev-phone" className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Phone Number
              </label>
              <input
                id="ev-phone"
                type="tel"
                required
                placeholder="Enter your phone number (e.g. +91...)"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-neutral-800 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2.5 mt-2">
              <input
                type="checkbox"
                id="ev-terms"
                required
                className="rounded text-primary focus:ring-primary w-4.5 h-4.5 accent-primary cursor-pointer"
              />
              <label htmlFor="ev-terms" className="text-xs text-neutral-500 dark:text-neutral-400 cursor-pointer">
                I agree to receive event reminders and announcements from Power One Mall.
              </label>
            </div>

            <button
              type="submit"
              className="mt-4 bg-primary hover:bg-primary/95 text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg hover:shadow-primary/30 transition-all duration-200 cursor-pointer"
            >
              Get Free Entry Pass
            </button>
          </form>
        )}
      </Modal>

      {/* Success Notification */}
      <Toast isVisible={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  );
}
