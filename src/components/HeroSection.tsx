'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BadgePill } from './ui/BadgePill';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-bg">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/hero-bg.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-bottom opacity-90 mix-blend-screen"
        />
        {/* Subtle Vignette / Gradient to blend the bottom edge if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center mt-[-10vh]">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <BadgePill>
            <span className="w-2 h-2 rounded-full bg-accent-blue inline-block animate-pulse shadow-[0_0_8px_var(--color-accent-blue)]" />
            Beta Version is launching on 12th September
          </BadgePill>
        </motion.div>

        <motion.h1 
          className="mt-8 font-display text-5xl md:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-text-primary drop-shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Next-gen enterprise <br className="hidden md:block" />
          with AI Agents
        </motion.h1>

        <motion.p 
          className="mt-6 text-lg md:text-[1.15rem] text-text-secondary max-w-2xl font-medium tracking-wide leading-relaxed drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Accelerate the speed of business with the INTERACTION Platform <br className="hidden md:block" />
          and our AI solutions for work, service, and process.
        </motion.p>
      </div>
    </section>
  );
}
