'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../atoms/Button';

export function CtaSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 snap-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto relative group"
      >
        {/* Deep Glow behind the card */}
        <div className="absolute -inset-4 bg-gradient-to-r from-accent-blue/20 via-purple-500/20 to-accent-blue/20 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000 pointer-events-none" />
        
        {/* Main Card */}
        <div 
          className="relative bg-white/60 dark:bg-[#040405]/60 border border-black/5 dark:border-white/10 rounded-[2rem] py-16 md:py-20 px-8 md:px-12 text-center flex flex-col items-center overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-colors duration-500 hover:border-black/10 dark:group-hover:border-white/20 group-hover:bg-white/80 dark:group-hover:bg-[#040405]/80"
          style={{
            WebkitBackdropFilter: "blur(32px) saturate(150%)",
            backdropFilter: "blur(32px) saturate(150%)"
          }}
        >
          {/* Inner Refraction Ring */}
          <div className="absolute inset-0 rounded-[2rem] pointer-events-none border border-black/5 dark:border-white/5 shadow-[inset_0_0_30px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]" />
          
          {/* Subtle Grid Pattern with radial mask so it fades at the edges */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
          
          {/* Animated Highlight overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Icon */}
          <div className="mb-8 relative group-hover:scale-110 transition-transform duration-500">
            <Sparkles className="w-12 h-12 text-accent-blue drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" strokeWidth={1} />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary max-w-2xl leading-[1.1] relative z-10">
            Ready to accelerate your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-blue to-purple-400">
              workflow?
            </span>
          </h2>
          
          <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-xl font-medium relative z-10 group-hover:text-text-primary/90 transition-colors duration-500">
            Join the forward-thinking enterprises already building the future with our intelligent AI Agents.
          </p>
          
          <div className="mt-10 relative z-10">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
