'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-black tracking-widest text-primary uppercase">
                Power <span className="text-secondary">One</span> Mall
              </span>
              <span className="text-[10px] tracking-[0.25em] font-semibold text-neutral-400 uppercase -mt-1 pl-0.5">
                Vijayawada
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mt-2">
              Power One Mall is Vijayawada\'s ultimate destination for premium shopping, fine dining, and immersive family entertainment. Experience international brands, local flavors, and a world-class cinema.
            </p>
            <div className="flex items-center gap-3.5 mt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-pink-600 text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-sky-500 text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Youtube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-extrabold uppercase text-xs tracking-[0.2em] mb-6 border-l-2 border-primary pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors duration-200">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/directory" className="hover:text-primary transition-colors duration-200">
                  Store Directory
                </Link>
              </li>
              <li>
                <Link href="/food-court" className="hover:text-secondary transition-colors duration-200">
                  Food Court Microsite
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-primary transition-colors duration-200">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/movies" className="hover:text-accent transition-colors duration-200">
                  Inox Movies Cinema
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors duration-200">
                  About the Mall
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-extrabold uppercase text-xs tracking-[0.2em] mb-6 border-l-2 border-primary pl-3">
              Visit Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>MG Road, Labbipet, Vijayawada, Andhra Pradesh 520010, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 866 6691100</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@poweronemall.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-300">Open Daily</p>
                  <p className="text-xs text-neutral-500 mt-0.5">10:00 AM - 10:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-extrabold uppercase text-xs tracking-[0.2em] mb-2 border-l-2 border-primary pl-3">
              Newsletter
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Subscribe to get notified about grand sales, exclusive brand launches, live concerts, and food festivals.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl py-3.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary hover:bg-primary/95 text-white transition-colors"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-500 font-semibold mt-1">
                ✓ Thank you for subscribing to our newsletter!
              </p>
            )}
          </div>
        </div>

        {/* Lower footer */}
        <div className="border-t border-neutral-800 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Power One Mall. All rights reserved. Concept Demo Proposal.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Leasing Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
