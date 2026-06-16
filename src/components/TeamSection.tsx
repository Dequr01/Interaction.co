"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useParticleEngine } from './ParticleCanvas';
import teamData from '../../public/team.json';

export const TeamSection = () => {
  const { setState } = useParticleEngine();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculate the active index based on scroll progress
    const index = Math.min(
      teamData.length - 1,
      Math.max(0, Math.floor(latest * teamData.length))
    );
    
    if (index !== activeIndex) {
      setActiveIndex(index);
      setState(`image:${index}`);
    }
  });

  const scrollToIndex = (index: number) => {
    if (!sectionRef.current) return;
    
    // Total scrollable height within this section is the section height minus 1 viewport height
    const sectionTop = sectionRef.current.offsetTop;
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
    
    const targetProgress = (index + 0.1) / teamData.length;
    const targetScroll = sectionTop + targetProgress * scrollableDistance;
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative w-full"
      style={{ 
        zIndex: 2,
        height: `${teamData.length * 100}vh` // Allocate 100vh of scroll per team member
      }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-stretch overflow-hidden pointer-events-auto">
        {/* LEFT/TOP — Header and transparent viewport for particles */}
        <div className="relative w-full lg:w-1/2 h-[25vh] lg:h-full shrink-0 flex flex-col p-6 md:p-12 lg:p-16 z-10 pointer-events-none">
          <p className="section-label mb-2 lg:mb-4">The people</p>
          <h2
            className="font-cormorant font-bold leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
          >
            Built by engineers,<br />
            <span className="gradient-text italic">led by builders</span>
          </h2>
        </div>

        {/* RIGHT/BOTTOM — Dynamic minimalist typography */}
        <div className="relative w-full lg:w-1/2 flex-1 flex items-center justify-center p-6 md:p-14 z-10">
          <div className="relative w-full h-full max-w-md flex items-center justify-center">
            {teamData.map((member, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={member.id}
                  className={`absolute w-full transition-all duration-700 ease-out flex flex-col ${
                    isActive
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  {/* Progress Indicator */}
                  <div className="flex items-center gap-3 mb-6">
                    <p className="section-label m-0">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <div className="h-px w-8" style={{ background: 'var(--color-border-accent)' }} />
                    <p className="section-label m-0" style={{ color: 'var(--color-text-muted)' }}>
                      {String(teamData.length).padStart(2, '0')}
                    </p>
                  </div>

                  <h2
                    className="font-cormorant font-bold leading-tight mb-2"
                    style={{ fontSize: 'clamp(2.8rem, 4vw, 4rem)', color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
                  >
                    {member.name}
                  </h2>

                  <p
                    className="text-xs font-mono font-bold uppercase tracking-[0.2em] mb-6"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {member.designation}
                  </p>

                  <p
                    className="text-base leading-relaxed mb-8"
                    style={{ color: 'var(--color-text-secondary)', fontWeight: 300 }}
                  >
                    {member.about}
                  </p>

                  <div className="flex gap-5 items-center">
                    {member.links && Object.entries(member.links).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium capitalize transition-colors hover:underline underline-offset-4"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {platform} ↗
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Slider Dots Indicator */}
            <div className="absolute right-[-24px] lg:right-[-40px] top-1/2 -translate-y-1/2 flex flex-col gap-3.5 z-20 pointer-events-auto">
              {teamData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className="group relative flex items-center justify-center p-2 cursor-pointer focus:outline-none"
                  aria-label={`Go to team member ${i + 1}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'bg-[var(--color-accent)] scale-150 shadow-[0_0_8px_var(--particle-glow)]'
                        : 'bg-[var(--color-text-muted)] opacity-40 group-hover:opacity-100 group-hover:scale-125'
                    }`}
                  />
                  {/* Tooltip on hover */}
                  <span className="absolute right-8 font-mono text-[0.65rem] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--color-surface-blur)] px-2 py-1 rounded border border-[var(--color-border)] pointer-events-none whitespace-nowrap" style={{ color: 'var(--color-text-primary)' }}>
                    {teamData[i].name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

