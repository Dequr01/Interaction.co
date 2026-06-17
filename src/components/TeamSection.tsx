'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import teamData from '../../data/team.json';
import { Users, Globe } from 'lucide-react';
import Link from 'next/link';
import { BadgePill } from './ui/BadgePill';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="team" className="relative bg-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <BadgePill>
            <Users className="w-4 h-4 text-text-secondary" />
            THE TEAM
          </BadgePill>
          <h2 className="mt-8 font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
            Meet the Minds
          </h2>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row relative">
        
        {/* Sticky Image Side (Left on desktop) */}
        <div className="w-full md:w-1/2 md:h-screen sticky top-0 flex items-center justify-center py-10 md:py-0 overflow-hidden z-10">
          <div className="relative w-full aspect-square md:aspect-[4/5] max-w-md rounded-2xl md:rounded-3xl overflow-hidden glass-card p-2 md:p-4">
            <div className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden bg-black/20">
              {teamData.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* @ts-expect-error Next 16 / React 19 type mismatch */}
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                  {/* Subtle vignette for the image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling Info Side (Right on desktop) */}
        <div className="w-full md:w-1/2 relative z-20 pb-32 md:pb-[30vh]">
          {teamData.map((member, index) => (
            <motion.div
              key={member.id}
              className="min-h-[70vh] md:min-h-screen flex flex-col justify-center py-20"
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ margin: "-45% 0px -45% 0px", amount: "some" }}
            >
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden group"
              >
                {/* Accent glow background on hover */}
                <div className="absolute -inset-2 bg-gradient-to-br from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />

                <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight mb-2">
                    {member.name}
                  </h3>
                  <p className="text-accent-blue font-medium tracking-widest uppercase text-xs mb-8">
                    {member.designation}
                  </p>
                  
                  {member.about && (
                    <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 font-medium">
                      {member.about}
                    </p>
                  )}

                  <div className="flex gap-4">
                    {member.links.github && (
                      <Link href={`https://${member.links.github.replace('https://', '')}`} target="_blank" className="p-3 rounded-full bg-surface border border-surface-border hover:bg-surface-border transition-colors text-text-secondary hover:text-text-primary">
                        <GithubIcon className="w-5 h-5" />
                      </Link>
                    )}
                    {member.links.linkedin && (
                      <Link href={member.links.linkedin} target="_blank" className="p-3 rounded-full bg-surface border border-surface-border hover:bg-surface-border transition-colors text-text-secondary hover:text-text-primary">
                        <LinkedinIcon className="w-5 h-5" />
                      </Link>
                    )}
                    {member.links.website && (
                      <Link href={member.links.website.startsWith('http') ? member.links.website : `https://${member.links.website}`} target="_blank" className="p-3 rounded-full bg-surface border border-surface-border hover:bg-surface-border transition-colors text-text-secondary hover:text-text-primary">
                        <Globe className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
