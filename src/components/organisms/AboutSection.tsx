'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BadgePill } from '../atoms/BadgePill';
import { UserCircle } from 'lucide-react';

const aboutContent = [
  {
    id: 'mission',
    title: 'Our Mission',
    text: 'At INTERACTION, we build intelligent AI Agents that empower businesses to work smarter, faster, and more efficiently.',
    icon: <UserCircle className="w-6 h-6" />,
  },
  {
    id: 'transformation',
    title: 'Transformation',
    text: 'We aim to transform enterprise workflows, service, and processes through innovation, collaboration, and cutting-edge AI technology.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
      </svg>
    ),
  },
  {
    id: 'integration',
    title: 'Integration',
    text: 'Connect any app or system — pre-built or custom — with ease and flexibility, shaping the future of enterprise.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
];

const enter = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function AboutCard({ item, index }: { item: typeof aboutContent[0], index: number }) {
  return (
    <motion.div
      custom={index}
      variants={enter}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="group relative glass-card p-8 md:p-10 rounded-3xl overflow-hidden
                 transition-[border-color,box-shadow,transform] duration-700
                 hover:border-black/15 dark:hover:border-white/20
                 hover:shadow-[0_12px_48px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.3)]
                 hover:-translate-y-2"
    >
      {/* Ambient background glow on hover */}
      <div className="absolute -inset-4 bg-gradient-to-br from-black/5 dark:from-white/10 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 
                        flex items-center justify-center text-text-primary mb-8 
                        group-hover:scale-110 group-hover:bg-black/10 dark:group-hover:bg-white/10 
                        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {item.icon}
        </div>
        
        <h3 className="text-2xl font-display font-bold text-text-primary tracking-tight mb-4 
                       group-hover:translate-x-1 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {item.title}
        </h3>
        
        <p className="text-base text-text-secondary leading-relaxed font-medium 
                      group-hover:text-text-primary transition-colors duration-700">
          {item.text}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// AboutSection
// ---------------------------------------------------------------------------
export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-20 md:py-28 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <BadgePill>
            <UserCircle className="w-4 h-4 text-text-secondary" />
            ABOUT US
          </BadgePill>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
            Engineering the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-black/40 dark:from-white dark:to-white/40">
              Unfair
            </span>{' '}
            Advantage.
          </h2>
        </motion.div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutContent.map((item, index) => (
            <AboutCard key={item.id} item={item} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
