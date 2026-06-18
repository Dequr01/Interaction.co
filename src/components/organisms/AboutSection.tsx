'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BadgePill } from '../atoms/BadgePill';
import { UserCircle } from 'lucide-react';

export function AboutSection() {
  const aboutContent = [
    {
      id: "mission",
      title: "Our Mission",
      text: "At INTERACTION, we build intelligent AI Agents that empower businesses to work smarter, faster, and more efficiently.",
      icon: <UserCircle className="w-6 h-6" />
    },
    {
      id: "transformation",
      title: "Transformation",
      text: "We aim to transform enterprise workflows, service, and processes through innovation, collaboration, and cutting-edge AI technology.",
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" /></svg>
    },
    {
      id: "integration",
      title: "Integration",
      text: "Connect any app or system pre-built or custom with ease and flexibility, shaping the future of enterprise.",
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 12h8M12 8v8" /></svg>
    }
  ];

  return (
    <section id="about" className="relative w-full snap-start">
      {/* Background layer: Sticky Header on the Left */}
      <div className="sticky top-0 h-[100dvh] w-full pointer-events-none z-0 flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex-1 w-full flex flex-col md:flex-row gap-8 min-h-0 pt-24 pb-8">
          
          {/* Left Side: Sticky Header Content */}
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center pointer-events-auto pr-0 md:pr-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <BadgePill>
                <UserCircle className="w-4 h-4 text-text-secondary" />
                ABOUT US
              </BadgePill>
              
              <h2 className="mt-8 font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[1.1]">
                Shaping the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-black/40 dark:from-white dark:to-white/40">Future of</span> <br />
                Enterprise
              </h2>
              
              <div className="mt-8 h-[1px] w-24 bg-gradient-to-r from-accent-blue to-transparent" />
            </motion.div>
          </div>
          
          {/* Right Side: Spacer for absolute scrolling content */}
          <div className="hidden md:block w-1/2 h-full" />
        </div>
      </div>

      {/* Foreground layer: Cards stacked naturally to scroll with the page */}
      <div className="relative z-10 w-full mt-[-100dvh]">
        {aboutContent.map((item, index) => (
          <div 
            key={item.id} 
            className="w-full h-[100dvh] snap-center flex flex-col pt-24 pb-8 px-6 md:px-12 max-w-7xl mx-auto pointer-events-none"
          >
            {/* Actual Card Container */}
            <div className="flex-1 w-full flex flex-col md:flex-row gap-8 min-h-0">
              {/* Spacer over Left Header */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-full flex-shrink-0" />
              
              {/* Card */}
              <div className="w-full md:w-1/2 h-full flex flex-col justify-center md:pl-8 pointer-events-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-20% 0px -20% 0px", amount: "some" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-black/10 dark:hover:border-white/20 transition-all duration-500">
                    {/* Micro-interaction background glow */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-accent-blue mb-8 group-hover:scale-110 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-500">
                        {item.icon}
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight mb-6 group-hover:translate-x-2 transition-transform duration-500">
                        {item.title}
                      </h3>
                      
                      <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-medium group-hover:text-text-primary transition-colors duration-500">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
