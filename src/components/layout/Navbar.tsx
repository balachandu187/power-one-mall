'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronRight } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { STORES_DATA, RESTAURANTS_DATA, Store, Restaurant } from '@/data/mockData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ stores: Store[]; food: Restaurant[] }>({
    stores: [],
    food: [],
  });

  const pathname = usePathname();

  // Listen to scroll to adjust background style
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update search results
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults({ stores: [], food: [] });
      return;
    }

    const query = searchQuery.toLowerCase();
    const filteredStores = STORES_DATA.filter(
      (store) =>
        store.name.toLowerCase().includes(query) ||
        store.category.toLowerCase().includes(query) ||
        store.description.toLowerCase().includes(query)
    );
    const filteredFood = RESTAURANTS_DATA.filter(
      (rest) =>
        rest.name.toLowerCase().includes(query) ||
        rest.cuisine.toLowerCase().includes(query) ||
        rest.description.toLowerCase().includes(query)
    );

    setSearchResults({ stores: filteredStores, food: filteredFood });
  }, [searchQuery]);

  // Close search/mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [pathname]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Directory', href: '/directory' },
    { name: 'Food Court', href: '/food-court' },
    { name: 'Events', href: '/events' },
    { name: 'Movies', href: '/movies' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full max-w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-md'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex flex-col group">
              <span className="text-xl sm:text-2xl font-black tracking-widest text-primary uppercase transition-transform group-hover:scale-105 duration-200">
                Power <span className="text-secondary">One</span> Mall
              </span>
              <span className="text-[10px] tracking-[0.25em] font-semibold text-red-300/70 uppercase -mt-1 pl-0.5">
                Vijayawada
              </span>
            </Link>

            {/* Desktop/Tablet Navigation */}
            <div className="hidden md:flex items-center gap-3 lg:gap-6">
              <div className="flex items-center gap-1 lg:gap-1.5 xl:gap-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-1.5 lg:px-3 py-2 text-xs lg:text-sm font-semibold tracking-wide rounded-md transition-all duration-200 ${
                        isActive
                          ? 'text-primary'
                          : 'text-neutral-200 hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Utility actions */}
              <div className="flex items-center gap-1.5 lg:gap-3 pl-2 lg:pl-4 border-l border-red-800/50">
                <button
                  onClick={handleSearchClick}
                  className="p-2 lg:p-2.5 rounded-full text-neutral-200 hover:bg-red-900/50 transition-colors"
                  aria-label="Search stores"
                >
                  <Search className="w-4 h-4 lg:w-5 h-5" />
                </button>
                <ThemeToggle />
                <Link
                  href="/directory"
                  className="hidden lg:block bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Visit Mall
                </Link>
              </div>
            </div>

            {/* Mobile Header Buttons */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={handleSearchClick}
                className="p-2 text-neutral-200 hover:bg-red-900/50 rounded-full"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-neutral-200 hover:bg-red-900/50 rounded-full"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-y-0 left-0 right-0 w-full max-w-full z-30 bg-neutral-900/40 backdrop-blur-md pt-[60px] overflow-hidden">
          <div className="glass h-full w-3/4 max-w-sm ml-auto flex flex-col justify-between py-6 px-6 shadow-2xl border-l border-white/10 overflow-y-auto">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-white shadow-md'
                        : 'text-neutral-100 hover:bg-red-900/50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-75" />
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-red-800/40 pt-6">
              <Link
                href="/food-court"
                className="bg-secondary text-white text-center font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md"
              >
                Explore Food Court
              </Link>
              <Link
                href="/directory"
                className="bg-primary text-white text-center font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md"
              >
                Search Store Directory
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Interactive Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-y-0 left-0 right-0 w-full max-w-full z-50 flex flex-col bg-neutral-950/80 backdrop-blur-md pt-20 px-4">
          <div className="max-w-3xl w-full mx-auto flex flex-col gap-6">
            {/* Search Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h2 className="text-xl font-bold text-white tracking-wide">Interactive Mall Search</h2>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Input field */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for stores (e.g. Zara, Sephora), cuisines (e.g. Biryani, Burger)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-4.5 pl-14 pr-6 text-white text-lg placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors shadow-inner"
              />
            </div>

            {/* Results section */}
            <div className="overflow-y-auto max-h-[60vh] pr-2 flex flex-col gap-6 no-scrollbar">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-12 text-neutral-500">
                  <p className="text-base font-medium mb-2">What are you looking for today?</p>
                  <p className="text-xs">Type brand names, dining cuisines, categories or floor locations.</p>
                </div>
              ) : (
                <>
                  {searchResults.stores.length === 0 && searchResults.food.length === 0 ? (
                    <div className="text-center py-12 text-neutral-400">
                      <p className="text-base font-semibold">No results found for "{searchQuery}"</p>
                      <p className="text-xs text-neutral-500 mt-2">Try adjusting your spelling or try another keyword.</p>
                    </div>
                  ) : (
                    <>
                      {/* Stores Result */}
                      {searchResults.stores.length > 0 && (
                        <div>
                          <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-3">
                            Stores & Brands ({searchResults.stores.length})
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {searchResults.stores.map((store) => (
                              <Link
                                key={store.id}
                                href={`/directory?search=${store.name}`}
                                className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-primary/50 transition-all duration-200 group"
                              >
                                <div>
                                  <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                                    {store.name}
                                  </h4>
                                  <p className="text-xs text-neutral-400 mt-0.5">
                                    {store.category} &bull; {store.floor}
                                  </p>
                                </div>
                                <span className="text-[10px] bg-neutral-800 text-neutral-300 font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                  {store.openStatus}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Restaurants Result */}
                      {searchResults.food.length > 0 && (
                        <div>
                          <h3 className="text-xs font-black uppercase tracking-widest text-secondary mb-3">
                            Dining & Food Court ({searchResults.food.length})
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {searchResults.food.map((rest) => (
                              <Link
                                key={rest.id}
                                href={`/food-court?search=${rest.name}`}
                                className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-secondary/50 transition-all duration-200 group"
                              >
                                <div>
                                  <h4 className="text-sm font-bold text-white group-hover:text-secondary transition-colors">
                                    {rest.name}
                                  </h4>
                                  <p className="text-xs text-neutral-400 mt-0.5">{rest.cuisine}</p>
                                </div>
                                <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                  ★ {rest.rating}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
