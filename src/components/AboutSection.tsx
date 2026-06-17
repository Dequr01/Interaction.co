"use client";

import React, { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useParticleEngine } from './ParticleCanvas';

const METRICS = [
  { value: '150+', label: 'Projects shipped' },
  { value: '8yr', label: 'In production' },
  { value: '$2B+', label: 'Client revenue impacted' },
  { value: '40+', label: 'Enterprise clients' },
];

const LOGOS = ['Acme Corp', 'NovaTech', 'Helix', 'Meridian', 'Orbis', 'Stratos'];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3, margin: "0px 0px -20% 0px" });
  const { setState } = useParticleEngine();

  useEffect(() => {
    if (isInView) {
      setState('text:INTERACTION2');
    }
  }, [isInView, setState]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full pointer-events-auto glass-panel"
    >
      {/* Metrics strip */}
      <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20 py-10 md:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {METRICS.map((m, i) => (
            <div key={i}>
              <div
                className="font-cormorant font-bold mb-1"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--color-text-primary)' }}
              >
                {m.value}
              </div>
              <div className="section-label" style={{ color: 'var(--color-text-muted)' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main about content */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20 py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <p className="section-label mb-6">About Interaction</p>
            <h2
              className="font-cormorant font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
            >
              We build the<br />infrastructure the<br />
              <span className="gradient-text italic">internet runs on</span>
            </h2>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {['SOC 2 Certified', 'ISO 27001', 'AWS Advanced Partner', 'Google Cloud Partner'].map(b => (
                <span
                  key={b}
                  className="glass-card px-4 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    color: 'var(--color-accent)',
                  }}
                >
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--color-text-secondary)', fontWeight: 300 }}
            >
              Founded by former engineers from Google, AWS, and Stripe — Interaction 
              is an IT solutions company that moves at the speed of startups and 
              operates at the scale of enterprise.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}
            >
              We don't do retainers for the sake of it. We embed in your team, 
              understand your constraints, and ship production-grade systems that 
              outlast the engagement.
            </p>

            <div className="flex gap-4 mt-4">
              <button
                className="btn-primary px-7 py-3.5 rounded-full text-sm font-semibold"
              >
                Work with us
              </button>
              <button className="btn-outline px-7 py-3.5 rounded-full text-sm font-semibold">
                Read case studies
              </button>
            </div>
          </div>
        </div>

        {/* Client logos */}
        <div className="mt-24 pt-12 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <p className="section-label mb-8 text-center" style={{ color: 'var(--color-text-muted)' }}>
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {LOGOS.map(logo => (
              <span
                key={logo}
                className="font-cormorant font-bold text-xl opacity-25 hover:opacity-60 transition-opacity cursor-default select-none"
                style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
