'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import projectsData from '../../../data/projects.json';
import { BadgePill } from '../atoms/BadgePill';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function WorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="work" className="relative w-full snap-start">
      {/* Background layer: Sticky Header and Image container */}
      <div className="sticky top-0 h-[100dvh] w-full pointer-events-none z-0 flex flex-col pt-24 pb-8 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex-shrink-0 mb-6 md:mb-10"
        >
          <BadgePill>
            <LayoutGrid className="w-4 h-4 text-text-secondary" />
            WORK
          </BadgePill>
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full mt-4 md:mt-6 gap-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
              Featured Case Studies
            </h2>
            <Link 
              href="#"
              className="text-text-secondary hover:text-text-primary flex items-center gap-2 font-medium transition-colors pointer-events-auto"
            >
              View all work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Content Area Layout (Left Image, Right Blank Space) */}
        <div className="flex-1 w-full flex flex-col md:flex-row gap-8 min-h-0">
          {/* Left Side: Images */}
          <div 
            className="w-full md:w-1/2 h-full relative overflow-hidden rounded-2xl glass-card p-2 md:p-3 pointer-events-auto"
            onMouseEnter={() => setHoveredIndex(activeIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-surface-border">
              {projectsData.map((project, index) => (
                <motion.div
                  key={`img-${project.id}`}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index 
                      ? (hoveredIndex === index ? 1.08 : 1) 
                      : 1.1,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right Side: Spacer for absolute scrolling content */}
          <div className="hidden md:block w-1/2 h-full" />
        </div>
      </div>

      {/* Foreground layer: Cards stacked naturally to scroll with the page */}
      <div className="relative z-10 w-full mt-[-100dvh]">
        {projectsData.map((project, index) => (
          <div 
            key={`card-${project.id}`} 
            className="w-full h-[100dvh] snap-center flex flex-col pt-24 pb-8 px-6 md:px-12 max-w-7xl mx-auto pointer-events-none"
          >
            {/* Spacer to push content below header height */}
            <div className="flex-shrink-0 opacity-0 mb-6 md:mb-10">
              <BadgePill><LayoutGrid />WORK</BadgePill>
              <div className="mt-4 md:mt-6">
                <h2 className="text-4xl md:text-5xl">Featured Case Studies</h2>
              </div>
            </div>

            {/* Actual Card Container */}
            <div className="flex-1 w-full flex flex-col md:flex-row gap-8 min-h-0">
              {/* Spacer over Image */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-full flex-shrink-0" />
              
              {/* Card */}
              <div className="w-full md:w-1/2 h-full flex flex-col justify-center md:pl-8 pointer-events-auto">
                <motion.div 
                  onViewportEnter={() => setActiveIndex(index)}
                  viewport={{ margin: "-40% 0px -40% 0px", amount: "some" }}
                  className="w-full"
                >
                  <Link 
                    href={project.link} 
                    className="block group w-full"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="glass-card p-6 md:p-10 rounded-2xl relative overflow-hidden transition-all duration-500 hover:border-black/10 dark:hover:border-white/20">
                      <div className="absolute -inset-2 bg-gradient-to-br from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none" />

                      <div className="relative z-10">
                        <p className="text-accent-blue font-mono font-bold tracking-widest uppercase text-[0.7rem] mb-3">
                          {project.category}
                        </p>
                        <h3 className="text-2xl md:text-4xl font-display font-bold text-text-primary tracking-tight mb-6">
                          {project.title}
                        </h3>

                        <div className="flex items-center gap-3 mt-6">
                          <div className="w-10 h-10 rounded-full border border-black/5 dark:border-white/10 flex items-center justify-center group-hover:bg-text-primary group-hover:text-bg transition-colors duration-300">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                          <span className="text-text-secondary text-sm font-medium group-hover:text-text-primary transition-colors duration-300">
                            View Project
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
