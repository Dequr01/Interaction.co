'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BadgePill } from './ui/BadgePill';
import { UserCircle } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center mb-16"
        >
          <BadgePill>
            <UserCircle className="w-4 h-4 text-text-secondary" />
            ABOUT
          </BadgePill>
          
          <h2 className="mt-8 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary max-w-4xl leading-tight">
            Shaping the Future <br /> of Enterprise
          </h2>
          
          <p className="mt-6 text-lg text-text-secondary max-w-2xl font-medium">
            Connect any app or system pre-built or custom with ease and flexibility.
          </p>
        </motion.div>

        {/* Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed">
            At <span className="text-text-primary font-semibold">INTERACTION</span>, we build intelligent AI Agents that empower businesses to work smarter, faster, and more efficiently. Our mission is to transform enterprise workflows, service, and processes through innovation, collaboration, and cutting-edge AI technology.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
