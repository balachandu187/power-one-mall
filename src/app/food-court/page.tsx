'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Utensils, Star, Wifi, Check, Sparkles, Pizza, Coffee, IceCream, Salad } from 'lucide-react';
import { RESTAURANTS_DATA, DISHES_DATA, Restaurant } from '@/data/mockData';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';
import TiltCard from '@/components/ui/TiltCard';

function FoodCourtContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchParamQuery = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(searchParamQuery);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [selectedRest, setSelectedRest] = useState<Restaurant | null>(null);
  
  // Food Enquiry states
  const [enqName, setEnqName] = useState('');
  const [enqEmail, setEnqEmail] = useState('');
  const [enqMessage, setEnqMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Sync state with URL search param changes
  useEffect(() => {
    setSearchQuery(searchParamQuery);
  }, [searchParamQuery]);

  const cuisines = ['All', 'South Indian', 'Gourmet Burgers', 'Italian Pizzas', 'Chinese', 'Beverages'];

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enqName.trim() && enqEmail.trim()) {
      setToastMessage('Thank you! Your food court enquiry has been submitted successfully.');
      setShowToast(true);
      setEnqName('');
      setEnqEmail('');
      setEnqMessage('');
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('All');
    router.replace('/food-court');
  };

  // Steam canvas particle effect
  const steamCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = steamCanvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const steamParticles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    // Reduce particles by 70% (25 -> 8)
    const maxParticles = 8;

    const addParticle = () => {
      if (steamParticles.length < maxParticles) {
        steamParticles.push({
          x: Math.random() * width,
          y: height + Math.random() * 20,
          size: Math.random() * 15 + 8,
          speedY: Math.random() * 0.4 + 0.2,
          speedX: Math.random() * 0.3 - 0.15,
          opacity: Math.random() * 0.15 + 0.05,
          fadeSpeed: Math.random() * 0.0012 + 0.0006,
        });
      }
    };

    let isIntersecting = true;
    let isRunning = true;

    // Debounced resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        height = canvas.height = canvas.parentElement?.clientHeight || 400;
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!isIntersecting || !isRunning) return;

      ctx.clearRect(0, 0, width, height);
      addParticle();

      steamParticles.forEach((p, idx) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity -= p.fadeSpeed;

        if (p.opacity <= 0 || p.y < 0) {
          steamParticles.splice(idx, 1);
          return;
        }

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, p.size);
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Intersection Observer to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasIntersecting = isIntersecting;
          isIntersecting = entry.isIntersecting;
          if (isIntersecting && !wasIntersecting) {
            animate();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Tab visibility listener
    const handleVisibility = () => {
      isRunning = !document.hidden;
      if (isRunning && isIntersecting) {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const floatingFood = [
    { Icon: Pizza, top: '20%', left: '10%', size: 36, delay: 0 },
    { Icon: Coffee, top: '35%', left: '82%', size: 30, delay: 1.5 },
    { Icon: IceCream, top: '65%', left: '12%', size: 32, delay: 1 },
    { Icon: Salad, top: '55%', left: '88%', size: 38, delay: 2 },
  ];

  // Filter restaurants
  const filteredRestaurants = RESTAURANTS_DATA.filter((rest) => {
    const matchesSearch =
      rest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine =
      selectedCuisine === 'All' || rest.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());

    return matchesSearch && matchesCuisine;
  });

  const amenities = [
    { title: 'Family Seating', desc: 'Over 400+ premium clean dining tables' },
    { title: 'Air Conditioned', desc: 'Powerful central climate-control units' },
    { title: 'Free High-Speed WiFi', desc: 'Complimentary high-speed browsing' },
    { title: 'Group Dining Zone', desc: 'Dedicated sections for larger gatherings' },
  ];

  const foodEvents = [
    {
      title: 'Monsoon Biryani Feast',
      date: 'Every Friday - Sunday',
      desc: 'Savor unique traditional Hyderabadi and Andhra Biryani varieties at special discounted prices.',
    },
    {
      title: 'Acoustic Unplugged Evenings',
      date: 'Saturdays, 7:00 PM Onwards',
      desc: 'Relax and unwind with soothing live acoustic covers of regional hits while you dine.',
    },
    {
      title: 'Happy Hour Combo Deals',
      date: 'Monday - Thursday, 3:05 PM - 6:05 PM',
      desc: 'Unbeatable buy-one-get-one deals and discount combos across all major outlet counters.',
    },
  ];

  // Motion fadeUp config
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
    <div className="flex flex-col gap-20">
      {/* 1. HERO SECTION */}
      <section className="relative h-[65vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200"
            alt="Food Court Marketplace Atmosphere"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-neutral-950/80" />
        </div>

        {/* Rising steam particles sub-canvas */}
        <canvas ref={steamCanvasRef} className="absolute inset-0 pointer-events-none z-1" />

        {/* Floating food icons */}
        {floatingFood.map((item, idx) => {
          const IconComponent = item.Icon;
          return (
            <motion.div
              key={idx}
              className="absolute pointer-events-none text-white/10 hidden md:block z-1"
              style={{
                top: item.top,
                left: item.left,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 6,
                delay: item.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <IconComponent size={item.size} />
            </motion.div>
          );
        })}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs font-black uppercase tracking-widest mb-6 shadow-md">
              <Utensils className="w-4 h-4" />
              Gastronomy Hub
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-none">
              Power <span className="text-secondary">One</span> Food Court
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 font-medium tracking-wide mt-4">
              Taste. Meet. Enjoy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. RESTAURANTS & SEARCH FILTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="block text-xs font-black uppercase tracking-[0.3em] text-secondary">World of Flavours</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2">Featured Outlets</h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-secondary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Interactive Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl border border-neutral-200/50 dark:border-neutral-800/80 p-6 mb-12 shadow-lg flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search food outlet or cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-secondary transition-colors text-neutral-800 dark:text-white"
              />
            </div>

            {/* Filter Cuisine Selection */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 shrink-0">Cuisine:</span>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-secondary transition-colors text-neutral-800 dark:text-white cursor-pointer"
              >
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine} className="dark:bg-neutral-900">
                    {cuisine === 'All' ? 'All Cuisines' : cuisine}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Outlets Grid */}
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16 glass rounded-3xl border border-neutral-200/50 dark:border-neutral-800/80">
            <Utensils className="w-12 h-12 text-neutral-450 mx-auto mb-4" />
            <p className="text-base font-bold text-neutral-800 dark:text-white">No Outlets Match Your Filter</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 bg-secondary hover:bg-secondary/95 text-white font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full transition-all cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRestaurants.map((rest) => (
              <TiltCard key={rest.id} className="h-full">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  onClick={() => setSelectedRest(rest)}
                  className="group flex flex-col h-full justify-between overflow-hidden rounded-3xl glass border border-neutral-200/60 dark:border-neutral-800/80 shadow-md hover:shadow-xl hover:border-secondary/45 dark:hover:border-secondary/45 transition-all duration-300 cursor-pointer relative"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={rest.image}
                        alt={rest.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-wider shadow-md">
                        {rest.cuisine}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-secondary transition-colors">
                          {rest.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                          <Star className="w-4 h-4 fill-amber-500" />
                          <span>{rest.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted leading-relaxed mt-3.5">
                        {rest.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-neutral-200/50 dark:border-neutral-800/50 p-6 flex items-center justify-between">
                    <span className="text-[10px] bg-neutral-200/50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Third Floor
                    </span>
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-350 group-hover:text-secondary transition-colors">
                      Menu &amp; Info &rarr;
                    </span>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        )}
      </section>

      {/* 3. POPULAR DISHES GALLERY */}
      <section className="bg-neutral-50 dark:bg-neutral-900/30 py-20 border-y border-neutral-200/50 dark:border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="block text-xs font-black uppercase tracking-[0.3em] text-secondary">Trending Delights</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2">Popular Dishes Gallery</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-secondary to-accent mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {DISHES_DATA.map((dish) => (
              <motion.div
                key={dish.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="group relative rounded-3xl overflow-hidden shadow-md border border-neutral-200/60 dark:border-neutral-800/80 glass flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`text-[10px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-wider shadow-md ${
                      dish.category === 'Vegetarian'
                        ? 'bg-emerald-600 text-white'
                        : dish.category === 'Beverages'
                        ? 'bg-sky-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}>
                      {dish.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-100">{dish.name}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-450 mt-1 uppercase tracking-wider">
                      Counter: {dish.restaurant}
                    </p>
                  </div>
                  <span className="text-lg font-black text-secondary shrink-0">{dish.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DINING EXPERIENCE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative h-[350px] lg:h-[450px] rounded-3xl overflow-hidden border border-neutral-200/50 dark:border-white/5 shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
              alt="Dining Experience Seating Area"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-neutral-900/10" />
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="block text-xs font-black uppercase tracking-[0.3em] text-secondary">Premium Amenities</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2">The Dining Experience</h2>
              <div className="h-1.5 w-16 bg-gradient-to-r from-secondary to-accent mt-4 rounded-full" />
            </motion.div>
            
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm sm:text-base text-muted leading-relaxed"
            >
              Our modern restaurant marketplace is designed to accommodate over 400 guests comfortably. Enjoy pristine hygiene, multi-cuisine offerings, and an inviting workspace environment.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {amenities.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-3 items-start p-4 rounded-2xl glass border border-neutral-200/50 dark:border-neutral-800/80"
                >
                  <div className="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <Wifi className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">{item.title}</h4>
                    <p className="text-xs text-neutral-450 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOD COURT EVENTS SECTION */}
      <section className="bg-neutral-900 text-white py-20 border-y border-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(247,127,0,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="block text-xs font-black uppercase tracking-[0.3em] text-secondary">Weekend Carnivals</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2 text-white">Food Festivals &amp; Specials</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-secondary to-accent mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodEvents.map((evt, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                whileHover={{ rotateY: 10, rotateX: -4, translateZ: 15 }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                className="p-8 rounded-3xl bg-neutral-850/80 border border-neutral-750/60 hover:border-secondary/60 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_35px_rgba(247,127,0,0.15)] group cursor-pointer"
              >
                <div>
                  <div className="inline-block bg-secondary text-white font-extrabold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md mb-4 shadow">
                    {evt.date}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-secondary transition-colors">{evt.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{evt.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT & ENQUIRY SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5 mb-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="glass rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-8 sm:p-12 shadow-xl"
        >
          <div className="text-center mb-8">
            <span className="block text-xs font-black uppercase tracking-[0.3em] text-secondary">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2">Food Court Enquiries</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-secondary to-accent mx-auto mt-4 rounded-full" />
          </div>

          <form onSubmit={handleEnquirySubmit} className="flex flex-col gap-5 text-neutral-800 dark:text-neutral-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fq-name" className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  id="fq-name"
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={enqName}
                  onChange={(e) => setEnqName(e.target.value)}
                  className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors text-neutral-800 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="fq-email" className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="fq-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={enqEmail}
                  onChange={(e) => setEnqEmail(e.target.value)}
                  className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors text-neutral-800 dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="fq-msg" className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Message / Outlet Leasing Request
              </label>
              <textarea
                id="fq-msg"
                required
                rows={4}
                placeholder="How can we help you? Let us know if you want to request kiosk leasing slots..."
                value={enqMessage}
                onChange={(e) => setEnqMessage(e.target.value)}
                className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-xl p-4 text-sm focus:outline-none focus:border-secondary transition-colors text-neutral-800 dark:text-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-secondary hover:bg-secondary/95 text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg hover:shadow-secondary/30 transition-all duration-200 cursor-pointer"
            >
              Submit Food Court Request
            </button>
          </form>
        </motion.div>
      </section>

      {/* 7. RESTAURANT DETAILS MODAL */}
      <Modal
        isOpen={selectedRest !== null}
        onClose={() => setSelectedRest(null)}
        title={selectedRest ? selectedRest.name : 'Restaurant Menu'}
      >
        {selectedRest && (
          <div className="flex flex-col gap-6 text-neutral-800 dark:text-neutral-100">
            <div className="relative h-48 w-full rounded-xl overflow-hidden">
              <Image
                src={selectedRest.image}
                alt={selectedRest.name}
                fill
                sizes="(max-width: 640px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-wider">
                {selectedRest.cuisine}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">About the Restaurant</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                {selectedRest.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Popular Dishes</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                {selectedRest.popularDishes.map((dish, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{dish}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-900 pt-5 text-xs text-neutral-500 space-y-2">
              <p className="flex justify-between">
                <span>Location:</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200">Third Floor Food Court</span>
              </p>
              <p className="flex justify-between">
                <span>Contact Outlet:</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200">{selectedRest.contact}</span>
              </p>
            </div>

            <div className="flex gap-3 mt-2">
              <a
                href={`tel:${selectedRest.contact}`}
                className="flex-1 bg-secondary hover:bg-secondary/95 text-white font-bold text-center text-xs uppercase tracking-widest py-3.5 rounded-xl transition-colors"
              >
                Call Outlet
              </a>
              <button
                onClick={() => setSelectedRest(null)}
                className="flex-1 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                Close Menu
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Success notification toast */}
      <Toast isVisible={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  );
}

export default function FoodCourtPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-neutral-500">
          <p className="text-lg font-bold">Loading Food Court...</p>
        </div>
      }
    >
      <FoodCourtContent />
    </Suspense>
  );
}
