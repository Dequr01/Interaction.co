'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import teamData from '../../../data/team.json';
import { Users, Globe } from 'lucide-react';
import Link from 'next/link';
import { BadgePill } from '../atoms/BadgePill';
import { TeamModal } from '../molecules/TeamModal';

// ─── Icon components ─────────────────────────────────────────────────────────
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── Entrance animation ───────────────────────────────────────────────────────
const enter: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─── Team Card ────────────────────────────────────────────────────────────────
// Hover entirely CSS-driven (group-hover). No JS hover state = no race conditions.
//
// Layers (bottom → top):
//   1. Photo — scales + blurs on hover (CSS transform + filter)
//   2. Ambient gradient — always visible at bottom
//   3. Resting name plate — slides DOWN and fades out on hover
//   4. Detail overlay — fades IN and slides UP on hover
//
// The opposing slide directions (name goes down, overlay comes up) create a
// clean "card-flip" feel while both use the same 300ms ease so they move
// in perfect lock-step with no gap or overlap.
function TeamCard({ member, index, onOpen }: { member: typeof teamData[0]; index: number; onOpen: () => void }) {
  const hasLinks = member.links.github || member.links.linkedin || member.links.website;

  return (
    <motion.button
      onClick={onOpen}
      custom={index}
      variants={enter}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="group relative rounded-2xl overflow-hidden glass-card text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue
                 w-full aspect-[3/4]
                 transition-[border-color,box-shadow] duration-700
                 hover:border-black/15 dark:hover:border-white/20
                 hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.55)]"
    >
      {/* ── 1. Portrait photo ── */}
      <Image
        src={member.photo.trim()}
        alt={member.name}
        fill
        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
        className="object-cover object-top
                   transition-[transform,filter] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
                   group-hover:scale-[1.1] group-hover:blur-[4px]"
      />

      {/* ── 2. Ambient gradient (resting) ── */}
      <div className="absolute inset-0 bg-gradient-to-t
                      from-black/90 via-black/20 to-transparent
                      transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
                      group-hover:opacity-0 z-0" />

      {/* ── 3. Hover Overlay (blur & darken) ── */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />

      {/* ── 4. Content Container (slides up automatically as max-height expands) ── */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-10">
        
        {/* Name & Designation (Always visible, shifts up) */}
        <div className="transform transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
          <p className="text-[0.65rem] font-mono font-bold tracking-widest uppercase text-accent-blue mb-1 line-clamp-1
                        transition-colors duration-1000 group-hover:text-accent-blue/90">
            {member.designation}
          </p>
          <h3 className="font-display font-bold text-white text-xl md:text-2xl leading-tight">
            {member.name}
          </h3>
        </div>

        {/* Expandable details (Bio & Links) */}
        <div className="overflow-hidden
                        max-h-0 group-hover:max-h-[250px]
                        opacity-0 group-hover:opacity-100
                        transition-[max-height,opacity] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="pt-3">
            {member.about && (
              <p className="text-[0.8rem] text-white/80 leading-relaxed line-clamp-4 mb-4 font-light">
                {member.about}
              </p>
            )}

            {/* Social links */}
            {hasLinks && (
              <div className="flex gap-2">
                {member.links.github && (
                  <Link
                    href={`https://${member.links.github.replace('https://', '')}`}
                    target="_blank"
                    onClick={e => e.stopPropagation()}
                    className="w-8 h-8 rounded-full bg-white/10 border border-white/15
                               flex items-center justify-center
                               hover:bg-white/25 transition-colors duration-300"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-white/90" />
                  </Link>
                )}
                {member.links.linkedin && (
                  <Link
                    href={member.links.linkedin}
                    target="_blank"
                    onClick={e => e.stopPropagation()}
                    className="w-8 h-8 rounded-full bg-white/10 border border-white/15
                               flex items-center justify-center
                               hover:bg-white/25 transition-colors duration-300"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-white/90" />
                  </Link>
                )}
                {member.links.website && (
                  <Link
                    href={member.links.website.startsWith('http') ? member.links.website : `https://${member.links.website}`}
                    target="_blank"
                    onClick={e => e.stopPropagation()}
                    className="w-8 h-8 rounded-full bg-white/10 border border-white/15
                               flex items-center justify-center
                               hover:bg-white/25 transition-colors duration-300"
                  >
                    <Globe className="w-3.5 h-3.5 text-white/90" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ─── TeamSection ──────────────────────────────────────────────────────────────
export function TeamSection() {
  const [selected, setSelected] = useState<typeof teamData[0] | null>(null);

  return (
    <section id="team" className="relative w-full py-20 md:py-28 px-4 md:px-12">
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
            <Users className="w-4 h-4 text-text-secondary" />
            THE TEAM
          </BadgePill>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
            The Masterminds.
          </h2>
        </motion.div>

        {/* Grid — 2 col mobile, 3 col md, up to 6 members */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {teamData.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} onOpen={() => setSelected(member)} />
          ))}
        </div>

      </div>

      <TeamModal member={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
