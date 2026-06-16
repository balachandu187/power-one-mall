'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Clock, ShoppingBag, Shirt, Tv, Tag, Heart, Sparkles } from 'lucide-react';
import { STORES_DATA, Store } from '@/data/mockData';
import Modal from '@/components/ui/Modal';
import TiltCard from '@/components/ui/TiltCard';

function DirectoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL search parameter
  const searchParamQuery = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(searchParamQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFloor, setSelectedFloor] = useState<string>('All');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Sync state with URL search param changes
  useEffect(() => {
    setSearchQuery(searchParamQuery);
  }, [searchParamQuery]);

  const categories = [
    'All',
    'Fashion',
    'Electronics',
    'Beauty',
    'Lifestyle',
    'Food',
    'Services',
    'Entertainment',
  ];
  const floors = ['All', 'Ground Floor', 'First Floor', 'Second Floor', 'Third Floor'];

  const floatingIcons = [
    { Icon: Shirt, top: '15%', left: '3%', size: 36, delay: 0 },
    { Icon: Tv, top: '35%', left: '92%', size: 44, delay: 2 },
    { Icon: Tag, top: '65%', left: '4%', size: 32, delay: 1 },
    { Icon: Sparkles, top: '20%', left: '88%', size: 40, delay: 3 },
    { Icon: ShoppingBag, top: '50%', left: '2%', size: 38, delay: 1.5 },
    { Icon: Heart, top: '80%', left: '90%', size: 34, delay: 2.5 },
  ];

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFloor('All');
    router.replace('/directory');
  };

  // Filtered stores
  const filteredStores = STORES_DATA.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory;
    const matchesFloor = selectedFloor === 'All' || store.floor === selectedFloor;

    return matchesSearch && matchesCategory && matchesFloor;
  });

  // Stagger animations config
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Floating Mall Icons in background */}
      {floatingIcons.map((item, idx) => {
        const IconComponent = item.Icon;
        return (
          <motion.div
            key={idx}
            className="absolute pointer-events-none text-neutral-400 dark:text-neutral-650 opacity-[0.03] dark:opacity-[0.04] hidden md:block z-0"
            style={{
              top: item.top,
              left: item.left,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 7,
              delay: item.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <IconComponent size={item.size} />
          </motion.div>
        );
      })}

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
        <span className="block text-xs font-black uppercase tracking-[0.3em] text-primary">Explore Our Directory</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mt-2">Find Stores &amp; Brands</h1>
        <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
      </div>

      {/* Filter and Search Bar Panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl border border-neutral-200/50 dark:border-neutral-800/80 p-6 sm:p-8 mb-12 shadow-lg flex flex-col gap-6 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
          {/* Search box with expanding glow focus */}
          <motion.div
            animate={{
              scale: isSearchFocused ? 1.015 : 1.0,
              boxShadow: isSearchFocused ? '0 0 25px rgba(214, 40, 40, 0.15)' : '0 0 0px rgba(0,0,0,0)',
            }}
            transition={{ duration: 0.25 }}
            className="relative z-10"
          >
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isSearchFocused ? 'text-primary' : 'text-neutral-400'}`} />
            <input
              type="text"
              placeholder="Search store name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-all text-neutral-800 dark:text-white"
            />
          </motion.div>

          {/* Floor selection */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 shrink-0">Floor:</span>
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-2xl py-3.5 px-4 text-sm focus:outline-none focus:border-primary transition-colors text-neutral-800 dark:text-white cursor-pointer"
            >
              {floors.map((floor) => (
                <option key={floor} value={floor} className="dark:bg-neutral-900">
                  {floor === 'All' ? 'All Floors' : floor}
                </option>
              ))}
            </select>
          </div>

          {/* Clear button */}
          {(searchQuery || selectedCategory !== 'All' || selectedFloor !== 'All') && (
            <button
              onClick={handleClearFilters}
              className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-extrabold text-xs uppercase tracking-widest py-4 rounded-2xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Categories Pills with sliding active indicator */}
        <div className="flex flex-col gap-2 z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Categories</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap cursor-pointer text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-primary rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-white' : ''}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Grid of Stores with Stagger */}
      {filteredStores.length === 0 ? (
        <div className="text-center py-20 glass rounded-3xl border border-neutral-200/50 dark:border-neutral-800/80 relative z-10">
          <ShoppingBag className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-neutral-800 dark:text-white">No Stores Found</h3>
          <p className="text-sm text-neutral-500 mt-1 max-w-md mx-auto">
            We couldn't find any stores matching your search criteria. Try clearing filters or altering search keywords.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-6 bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-colors cursor-pointer"
          >
            Show All Stores
          </button>
        </div>
      ) : (
        <motion.div
          key={`${selectedCategory}-${selectedFloor}-${searchQuery}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10"
        >
          {filteredStores.map((store) => (
            <TiltCard key={store.id} className="h-full">
              <motion.div
                variants={itemVariants}
                onClick={() => setSelectedStore(store)}
                className="group flex flex-col h-full justify-between overflow-hidden rounded-3xl glass border border-neutral-200/60 dark:border-neutral-800/80 shadow-md hover:shadow-xl hover:border-primary/45 dark:hover:border-primary/45 transition-all duration-300 cursor-pointer relative"
              >
                <div>
                  {/* Store image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={store.image}
                      alt={store.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-wider">
                      {store.category}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary transition-colors">
                        {store.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                      {store.floor}
                    </span>
                    <p className="text-xs text-muted leading-relaxed mt-3.5 line-clamp-2">
                      {store.description}
                    </p>
                  </div>
                </div>

                {/* Action bottom */}
                <div className="border-t border-neutral-250 dark:border-neutral-800 p-6 flex items-center justify-between">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                    {store.openStatus}
                  </span>
                  <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 group-hover:text-primary transition-colors flex items-center gap-1.5">
                    View Details &rarr;
                  </span>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>
      )}

      {/* Store Detail Modal */}
      <Modal
        isOpen={selectedStore !== null}
        onClose={() => setSelectedStore(null)}
        title={selectedStore ? selectedStore.name : 'Store Details'}
      >
        {selectedStore && (
          <div className="flex flex-col gap-6">
            <div className="relative h-56 w-full rounded-xl overflow-hidden shadow-inner">
              <Image
                src={selectedStore.image}
                alt={selectedStore.name}
                fill
                sizes="(max-width: 640px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-wider">
                {selectedStore.category}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
                About the Store
              </span>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {selectedStore.description}
              </p>
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-5 space-y-3.5 text-xs text-neutral-600 dark:text-neutral-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4.5 h-4.5 text-primary" />
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Floor: {selectedStore.floor}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4.5 h-4.5 text-primary" />
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Operating Hours: {selectedStore.hours}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-primary" />
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Contact Phone: {selectedStore.phone}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <a
                href={`tel:${selectedStore.phone}`}
                className="flex-1 bg-primary hover:bg-primary/95 text-white font-bold text-center text-xs uppercase tracking-widest py-3.5 rounded-xl transition-colors"
              >
                Call Store
              </a>
              <button
                onClick={() => setSelectedStore(null)}
                className="flex-1 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                Close details
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-neutral-500">
          <p className="text-lg font-bold">Loading Directory...</p>
        </div>
      }
    >
      <DirectoryContent />
    </Suspense>
  );
}
