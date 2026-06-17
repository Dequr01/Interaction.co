"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    let current = 0;
    const duration = 1200; // ms
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = '';
        }, 400); // short pause at 100%
      }
      setProgress(Math.floor(current));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center gap-4 mt-[15vh]">
            <div className="font-mono text-xl tracking-widest font-bold glow-effect px-5 py-2 rounded-full glass-card" style={{ color: 'var(--color-accent)' }}>
              {progress.toString().padStart(3, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
