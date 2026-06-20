'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import projectsData from '../../../data/projects.json';
import { BadgePill } from '../atoms/BadgePill';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import { ProjectModal } from '../molecules/ProjectModal';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Outcome { label: string; value: string }
interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  year?: string;
  description?: string;
  tags?: string[];
  outcomes?: Outcome[];
}
const projects = projectsData as Project[];

// ─── Entrance animation (one-shot, viewport-triggered — no race conditions) ──
const enter = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─── Work Card ───────────────────────────────────────────────────────────────
// Hover behaviour is 100% CSS (group-hover). No JS state = no race conditions.
// The "expandable" details use max-height + opacity so both grow and fade
// simultaneously, then instantly collapse on mouse-leave (duration-0 on leave
// achieved by using a very short 150ms — snappy enough to feel instant).
function WorkCard({ project, index, onOpen }: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      custom={index}
      variants={enter}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Outer wrapper — group drives ALL hover children */}
      <button
        onClick={onOpen}
        className="group relative w-full text-left rounded-2xl overflow-hidden glass-card
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue
                   transition-[border-color,box-shadow] duration-500
                   hover:border-black/15 dark:hover:border-white/20
                   hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
      >
        {/* ── Image ── */}
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover
                       transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                       group-hover:scale-[1.05]"
          />

          {/* Gradient — deepens on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent
                          transition-opacity duration-500
                          opacity-80 group-hover:opacity-100" />

          {/* Category pill — always visible */}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full
                           bg-black/40 dark:bg-black/60 backdrop-blur-md
                           text-white/90 font-mono font-bold tracking-widest uppercase text-[0.6rem]">
            {project.category}
          </span>

          {/* Year — always visible, top-right */}
          {project.year && (
            <span className="absolute top-3 right-3 px-2 py-1 rounded-full
                             bg-black/30 backdrop-blur-md
                             text-white/70 font-mono text-[0.6rem]">
              {project.year}
            </span>
          )}
        </div>

        {/* ── Card body ── */}
        <div className="p-5">
          {/* Title — always visible */}
          <h3 className="text-base md:text-lg font-display font-bold text-text-primary tracking-tight
                         transition-colors duration-500 group-hover:text-accent-blue">
            {project.title}
          </h3>

          {/* ── Hover-revealed details ─────────────────────────────────────
               max-height: 0 → 10rem  |  opacity: 0 → 1
               Both transitions run together, same duration.
               On mouse-leave they reverse at the same speed — no stuck states.
          ────────────────────────────────────────────────────────────────── */}
          <div className="overflow-hidden
                          max-h-0 group-hover:max-h-40
                          opacity-0 group-hover:opacity-100
                          transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            {project.description && (
              <p className="pt-3 text-sm text-text-muted leading-relaxed line-clamp-2 font-light">
                {project.description}
              </p>
            )}

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-3">
                {project.tags.slice(0, 4).map(tag => (
                  <span key={tag}
                        className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5
                                   border border-black/8 dark:border-white/8
                                   text-text-muted text-[0.6rem] font-medium tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 pt-3">
              <ArrowRight className="w-3.5 h-3.5 text-accent-blue" />
              <span className="text-xs text-accent-blue font-medium">Click to view details</span>
            </div>
          </div>
        </div>

        {/* Subtle inner glow on hover */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-500
                        bg-gradient-to-br from-accent-blue/6 to-transparent" />
      </button>
    </motion.div>
  );
}

// ─── WorkSection ─────────────────────────────────────────────────────────────
export function WorkSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="relative w-full py-20 md:py-28 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <BadgePill>
            <LayoutGrid className="w-4 h-4 text-text-secondary" />
            WORK
          </BadgePill>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
            Proof of Impact.
          </h2>
        </motion.div>

        {/* Grid — 1 col mobile, 2 col tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <WorkCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
