"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useParticleEngine } from './ParticleCanvas';

const STATS = [
  { value: '150+', label: 'Projects delivered' },
  { value: '40+',  label: 'Enterprise clients'  },
  { value: '99.9%',label: 'Uptime SLA'          },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 1.6,
    },
  },
};

const itemVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.215, 0.610, 0.355, 1.000] as const } },
};

export const HeroSection = () => {
  const { setState } = useParticleEngine();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    // Chaos → snap to INTERACTION text almost immediately so it acts as the preloader background
    const snap = setTimeout(() => setState('text:INTERACTION'), 100);
    return () => clearTimeout(snap);
  }, [setState]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // When user scrolls back up, snap particles back to INTERACTION
    if (latest < 0.1) {
      setState('text:INTERACTION');
    }
  });

  return (
    /* The section is 200vh to allow for 100vh of pinned scrolling */
    <section
      ref={sectionRef}
      className="relative w-full h-[200vh]"
    >
      <div className="sticky top-0 h-screen w-full flex items-stretch overflow-hidden">
        {/* ── LEFT: solid panel so text sits over the canvas ──── */}
        <motion.div
          className="relative flex flex-col justify-center w-full lg:w-[46%] px-6 md:px-14 lg:pl-20 lg:pr-10 pointer-events-auto glass-panel"
          style={{
            zIndex: 3,
            paddingTop:    '80px',
            paddingBottom: '40px',
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="section-label mb-6 flex items-center gap-3">
            <span className="inline-block w-6 h-px" style={{ background: 'var(--color-accent)' }} />
            IT Solutions Studio
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-cormorant font-bold leading-[1.0] mb-6"
            style={{ fontSize: 'clamp(3.2rem, 5.8vw, 6.5rem)', letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}
          >
            Build systems.<br />
            Ship <em className="gradient-text not-italic">faster.</em>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg leading-relaxed mb-10 max-w-[28rem]"
            style={{ color: 'var(--color-text-secondary)', fontWeight: 300 }}
          >
            We architect cloud infrastructure, AI pipelines, and full-stack products
            for companies that can't afford to slow down.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
            <button className="btn-primary px-7 py-3.5 rounded-full text-sm font-semibold">
              Start a project
            </button>
            <button className="btn-outline px-7 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2">
              See our work
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-10 pt-7" style={{ borderTop: '1px solid var(--color-border)' }}>
            {STATS.map((s, i) => (
              <div key={i}>
                <div className="font-cormorant text-2xl font-bold mb-0.5" style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: transparent so canvas particles show through ── */}
        <div className="hidden lg:flex flex-1 h-full relative items-end pointer-events-none" style={{ zIndex: 2 }}>
          {/* Floating info card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-[16%] right-[6%] pointer-events-auto rounded-2xl px-5 py-5 glass-card"
            style={{ minWidth: '185px', zIndex: 10 }}
          >
            <p className="section-label mb-4">Core Stack</p>
            {['Cloud Native', 'AI / ML', 'DevOps', 'Security'].map(b => (
              <div key={b} className="flex items-center gap-2.5 text-sm py-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--color-accent)' }} />
                {b}
              </div>
            ))}
          </motion.div>

          {/* Scroll nudge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 right-1/2 translate-x-1/2 flex flex-col items-center gap-1"
          >
            <span className="section-label text-[0.58rem]" style={{ color: 'var(--color-text-muted)' }}>Scroll</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-text-muted)' }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
