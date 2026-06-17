'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="relative bg-bg py-24 md:py-32 px-6 md:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto relative group"
      >
        {/* Glow behind the card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-aurora-cool via-aurora-mid to-aurora-warm rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
        
        {/* Card */}
        <div className="relative glass-card rounded-3xl p-10 md:p-20 text-center flex flex-col items-center overflow-hidden">
          {/* Subtle background lines/pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="w-16 h-16 rounded-full bg-surface border border-surface-border flex items-center justify-center mb-8 relative">
            <Sparkles className="w-8 h-8 text-text-primary" />
            <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-primary max-w-2xl leading-[1.1]">
            Ready to accelerate your workflow?
          </h2>
          
          <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-xl">
            Join the forward-thinking enterprises already building the future with our intelligent AI Agents.
          </p>
          
          <div className="mt-10">
            <Link 
              href="#contact"
              className="btn-primary rounded-full px-10 py-4 text-base font-semibold tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
