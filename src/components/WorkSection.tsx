'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import projectsData from '../../data/projects.json';
import { BadgePill } from './ui/BadgePill';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function WorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="work" className="relative bg-bg py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          <BadgePill>
            <LayoutGrid className="w-4 h-4 text-text-secondary" />
            WORK
          </BadgePill>
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full mt-8 gap-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
              Featured Case Studies
            </h2>
            <Link 
              href="#"
              className="text-text-secondary hover:text-text-primary flex items-center gap-2 font-medium transition-colors"
            >
              View all work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row relative">
        
        {/* Sticky Image Side (Left on desktop) */}
        <div className="w-full md:w-1/2 md:h-screen sticky top-0 flex items-center justify-center py-10 md:py-0 overflow-hidden z-10">
          <div className="relative w-full aspect-[4/3] max-w-lg rounded-2xl md:rounded-3xl overflow-hidden glass-card p-2 md:p-3">
            <div className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden bg-surface-border">
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-bg/20" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling Info Side (Right on desktop) */}
        <div className="w-full md:w-1/2 relative z-20 pb-32 md:pb-[30vh]">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              className="min-h-[70vh] md:min-h-screen flex flex-col justify-center py-20 snap-center"
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ margin: "-49% 0px -49% 0px", amount: "some" }}
            >
              <Link href={project.link} className="block group">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden transition-all duration-500 hover:border-text-secondary/30"
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />

                  <div className="relative z-10">
                    <p className="text-accent-blue font-medium tracking-widest uppercase text-xs mb-4">
                      {project.category}
                    </p>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight mb-8">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-4 mt-8">
                      <div className="w-12 h-12 rounded-full border border-surface-border flex items-center justify-center group-hover:bg-text-primary group-hover:text-bg transition-colors duration-300">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <span className="text-text-secondary font-medium group-hover:text-text-primary transition-colors duration-300">
                        View Project
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
