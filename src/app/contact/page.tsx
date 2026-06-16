'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Sparkles, Building, Briefcase } from 'lucide-react';
import Toast from '@/components/ui/Toast';
import Magnetic from '@/components/ui/Magnetic';

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
}

function FloatingLabelInput({ id, label, type = 'text', required = false, value, onChange }: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFloat = isFocused || value.length > 0;

  return (
    <div className="relative w-full mt-4 flex flex-col">
      <motion.label
        htmlFor={id}
        animate={{
          y: isFloat ? -22 : 12,
          x: isFloat ? 2 : 14,
          scale: isFloat ? 0.82 : 1.0,
          color: isFocused ? '#D62828' : '#888888',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="absolute left-0 top-0 pointer-events-none text-xs font-bold uppercase tracking-wider origin-left"
      >
        {label}
      </motion.label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-neutral-800 dark:text-white"
      />
    </div>
  );
}

interface FloatingLabelTextareaProps {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  rows?: number;
  onChange: (val: string) => void;
}

function FloatingLabelTextarea({ id, label, required = false, value, rows = 5, onChange }: FloatingLabelTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFloat = isFocused || value.length > 0;

  return (
    <div className="relative w-full mt-4 flex flex-col">
      <motion.label
        htmlFor={id}
        animate={{
          y: isFloat ? -22 : 12,
          x: isFloat ? 2 : 14,
          scale: isFloat ? 0.82 : 1.0,
          color: isFocused ? '#D62828' : '#888888',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="absolute left-0 top-0 pointer-events-none text-xs font-bold uppercase tracking-wider origin-left"
      >
        {label}
      </motion.label>
      <textarea
        id={id}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-colors text-neutral-800 dark:text-white resize-none"
      />
    </div>
  );
}

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('General Enquiries');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const contactCards = [
    {
      icon: MessageSquare,
      title: 'General Enquiries',
      email: 'info@poweronemall.com',
      phone: '+91 866 6691100',
    },
    {
      icon: Building,
      title: 'Leasing Opportunities',
      email: 'leasing@poweronemall.com',
      phone: '+91 866 6691122',
    },
    {
      icon: Briefcase,
      title: 'Event Partnerships',
      email: 'events@poweronemall.com',
      phone: '+91 866 6691133',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setToastMessage(`Thank you, ${name}! Your request regarding "${category}" has been sent. Our management team will contact you shortly.`);
        setShowToast(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setIsSubmitting(false);
      }, 1500); // Premium spinner delay
    }
  };

  const contactContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const cardItem = {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="block text-xs font-black uppercase tracking-[0.3em] text-primary">Get in Touch</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mt-2">Connect With Management</h1>
        <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 items-start">
        {/* Contact Info Cards with slide-up effect */}
        <motion.div
          variants={contactContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="lg:col-span-1 flex flex-col gap-6"
        >
          {contactCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                variants={cardItem}
                whileHover={{ y: -5, boxShadow: '0 8px 25px -5px rgba(214, 40, 40, 0.08)' }}
                className="p-6 rounded-2xl glass border border-neutral-200/50 dark:border-neutral-800/80 shadow-md flex flex-col gap-4 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-100">{card.title}</h3>
                  <div className="mt-3 space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <p className="font-semibold">Email: {card.email}</p>
                    <p>Phone: {card.phone}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <motion.div
            variants={cardItem}
            whileHover={{ y: -5, boxShadow: '0 8px 25px -5px rgba(214, 40, 40, 0.08)' }}
            className="p-6 rounded-2xl glass border border-neutral-250 dark:border-neutral-800 shadow-md flex gap-4 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-100">Mall Address</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                MG Road, Labbipet, Vijayawada, Andhra Pradesh 520010, India
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form Card */}
        <div className="lg:col-span-2 glass rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 p-8 sm:p-12 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-accent fill-accent" />
            Send secure message
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-neutral-800 dark:text-neutral-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FloatingLabelInput
                id="ct-name"
                label="Full Name"
                required
                value={name}
                onChange={setName}
              />
              <FloatingLabelInput
                id="ct-email"
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={setEmail}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FloatingLabelInput
                id="ct-phone"
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={setPhone}
              />

              <div className="relative w-full mt-4 flex flex-col justify-end">
                <label htmlFor="ct-cat" className="absolute -top-5 left-0 text-xs font-bold text-neutral-700 dark:text-neutral-450 uppercase tracking-wider">
                  Inquiry Category
                </label>
                <select
                  id="ct-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white/5 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors text-neutral-800 dark:text-white cursor-pointer"
                >
                  <option className="dark:bg-neutral-900" value="General Enquiries">General Enquiries</option>
                  <option className="dark:bg-neutral-900" value="Leasing Opportunities">Leasing Opportunities</option>
                  <option className="dark:bg-neutral-900" value="Event Partnerships">Event Partnerships</option>
                </select>
              </div>
            </div>

            <FloatingLabelTextarea
              id="ct-msg"
              label="Detailed Message"
              required
              value={message}
              onChange={setMessage}
            />

            <div className="mt-4 flex justify-end">
              <Magnetic range={50}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/95 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:shadow-primary/30 transition-all duration-200 cursor-pointer min-w-[180px] flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Submit Message'
                  )}
                </button>
              </Magnetic>
            </div>
          </form>
        </div>
      </div>

      {/* Map curtain reveal */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-neutral-200/50 dark:border-neutral-800/80 shadow-2xl mt-16"
      >
        <iframe
          title="Power One Mall Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.123456789!2d80.643210!3d16.506120!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35efffaaaa!2sMG+Road%2C+Labbipet%2C+Vijayawada%2C+Andhra+Pradesh+520010!5e0!3m2!1sen!2sin!4v1625000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          className="grayscale opacity-80 contrast-125 dark:opacity-70 dark:invert"
        />
      </motion.div>

      {/* Success Notification Toast */}
      <Toast isVisible={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  );
}
