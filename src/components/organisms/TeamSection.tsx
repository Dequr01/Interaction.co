'use client';
// Force reload JSON

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import teamData from '../../../data/team.json';
import { Users, Globe } from 'lucide-react';
import Link from 'next/link';
import { BadgePill } from '../atoms/BadgePill';

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
    <section id="team" className="relative w-full snap-start">
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
            <Users className="w-4 h-4 text-text-secondary" />
            THE TEAM
          </BadgePill>
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full mt-4 md:mt-6 gap-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
              Meet the Minds
            </h2>
          </div>
        </motion.div>

        {/* Content Area Layout (Left Image, Right Blank Space) */}
        <div className="flex-1 w-full flex flex-col md:flex-row gap-8 min-h-0">
          {/* Left Side: Images */}
          <div className="w-full md:w-1/2 h-full relative pointer-events-auto flex items-start justify-center md:justify-start">
            <div className="h-full max-h-[500px] aspect-[4/5] max-w-full relative overflow-hidden rounded-2xl glass-card p-2 md:p-3 flex-shrink-0">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/20">
              {teamData.map((member, index) => (
                <motion.div
                  key={`img-${member.id}`}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: member.objectPosition || 'top center' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
              ))}
            </div>
            </div>
          </div>
          
          {/* Right Side: Spacer for absolute scrolling content */}
          <div className="hidden md:block w-1/2 h-full" />
        </div>
      </div>

      {/* Foreground layer: Cards stacked naturally to scroll with the page */}
      <div className="relative z-10 w-full mt-[-100dvh]">
        {teamData.map((member, index) => (
          <div 
            key={`card-${member.id}`} 
            className="w-full h-[100dvh] snap-center flex flex-col pt-24 pb-8 px-6 md:px-12 max-w-7xl mx-auto pointer-events-none"
          >
            {/* Spacer to push content below header height */}
            <div className="flex-shrink-0 opacity-0 mb-6 md:mb-10">
              <BadgePill><Users />THE TEAM</BadgePill>
              <div className="mt-4 md:mt-6">
                <h2 className="text-4xl md:text-5xl">Meet the Minds</h2>
              </div>
            </div>

            {/* Actual Card Container */}
            <div className="flex-1 w-full flex flex-col md:flex-row gap-8 min-h-0">
              {/* Spacer over Image */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-full flex-shrink-0" />
              
              {/* Card */}
              <div className="w-full md:w-1/2 h-full flex flex-col justify-center md:pl-8 pointer-events-auto min-h-0">
                <motion.div 
                  onViewportEnter={() => setActiveIndex(index)}
                  viewport={{ margin: "-40% 0px -40% 0px", amount: "some" }}
                  className="w-full flex flex-col min-h-0 max-h-full"
                >
                  <div className="glass-card p-6 md:p-10 rounded-2xl relative overflow-hidden group flex flex-col min-h-0 max-h-full">
                    <div className="absolute -inset-2 bg-gradient-to-br from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col min-h-0 max-h-full">
                      <div className="flex-shrink-0">
                        <h3 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight mb-2">
                          {member.name}
                        </h3>
                        <p className="text-accent-blue font-mono font-bold tracking-widest uppercase text-[0.7rem] mb-6">
                          {member.designation}
                        </p>
                      </div>
                      
                      {member.about && (
                        <div className="overflow-y-auto min-h-0 pr-2 -mr-2" style={{ scrollbarWidth: 'thin' }}>
                          <p className="text-base md:text-lg text-text-secondary leading-relaxed font-medium pb-2">
                            {member.about}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-3 mt-auto pt-4 flex-shrink-0">
                        {member.links.github && (
                          <Link href={`https://${member.links.github.replace('https://', '')}`} target="_blank" className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-text-secondary hover:text-text-primary">
                            <GithubIcon className="w-4 h-4 md:w-5 md:h-5" />
                          </Link>
                        )}
                        {member.links.linkedin && (
                          <Link href={member.links.linkedin} target="_blank" className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-text-secondary hover:text-text-primary">
                            <LinkedinIcon className="w-4 h-4 md:w-5 md:h-5" />
                          </Link>
                        )}
                        {member.links.website && (
                          <Link href={member.links.website.startsWith('http') ? member.links.website : `https://${member.links.website}`} target="_blank" className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-text-secondary hover:text-text-primary">
                            <Globe className="w-4 h-4 md:w-5 md:h-5" />
                          </Link>
                        )}
                      </div>
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
