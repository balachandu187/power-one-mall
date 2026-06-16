'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

export default function Toast({ isVisible, message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl glass border-emerald-500/20 md:max-w-sm"
        >
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{message}</p>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
