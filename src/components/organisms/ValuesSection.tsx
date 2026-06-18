'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BadgePill } from '../atoms/BadgePill';
import { GlassCard } from '../atoms/GlassCard';
import { Target } from 'lucide-react';

const values = [
  {
    title: 'Driven by Trust and Transparency',
    description: 'Act with honesty, transparency and accountability, ensuring reliability and excellence.',
    icon: (
      <svg className="w-8 h-8 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M3 12h18" />
        <path d="M5.6 5.6l12.8 12.8" />
        <path d="M18.4 5.6L5.6 18.4" />
      </svg>
    ),
  },
  {
    title: 'Delivering Measurable Business Results',
    description: 'Our AI Agents deliver measurable, lasting results that transform the way businesses operate and grow.',
    icon: (
      <svg className="w-12 h-12 stroke-current" viewBox="0 0 48 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="24" cy="12" r="10" />
        <circle cx="36" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: 'Innovation at the Core',
    description: 'We continuously push the boundaries of technology to provide cutting-edge solutions for your hardest problems.',
    icon: (
      <svg className="w-8 h-8 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    ),
  },
];

export function ValuesSection() {
  return (
    <section className="relative pb-24 md:pb-32 overflow-hidden snap-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <BadgePill>
            <Target className="w-4 h-4 text-text-secondary" />
            OUR VALUES
          </BadgePill>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <GlassCard key={index} delay={index * 0.15} className="h-full justify-between gap-12 group hover:border-text-secondary/30 transition-colors">
              <div>
                <h3 className="text-xl md:text-2xl font-display font-semibold text-text-primary mb-4 pr-4">
                  {value.title}
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  {value.description}
                </p>
              </div>
              <div className="text-text-muted group-hover:text-text-primary transition-colors duration-500">
                {value.icon}
              </div>
            </GlassCard>
          ))}
        </div>

      </div>
    </section>
  );
}
