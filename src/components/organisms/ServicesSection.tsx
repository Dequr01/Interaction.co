"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../atoms/Button';
import { Magnetic } from '../atoms/Magnetic';
import { TiltCard } from '../atoms/TiltCard';

const SERVICES = [
  {
    num: '01',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
      </svg>
    ),
    title: 'Cloud & Infrastructure',
    desc: 'AWS, GCP, Azure architecture. Zero-downtime deployments, auto-scaling, and real cost optimization.',
    tags: ['Kubernetes', 'Terraform', 'CI/CD'],
  },
  {
    num: '02',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    title: 'AI & Machine Learning',
    desc: 'Custom LLM integrations, real-time inference pipelines, and data platforms built to production-grade standards.',
    tags: ['LLMs', 'MLOps', 'RAG'],
  },
  {
    num: '03',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Full-Stack Engineering',
    desc: 'End-to-end product development. React, Next.js, Node, Go — whatever your stack demands, shipped fast.',
    tags: ['Next.js', 'Node', 'PostgreSQL'],
  },
  {
    num: '04',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Cybersecurity',
    desc: 'Penetration testing, secure code review, and compliance frameworks. SOC 2, ISO 27001 readiness.',
    tags: ['SOC 2', 'Pen Testing', 'Zero Trust'],
  },
  {
    num: '05',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
    title: 'DevOps & SRE',
    desc: '99.9% uptime SLAs. On-call support, observability stacks, incident response — we own reliability.',
    tags: ['Prometheus', 'Grafana', 'PagerDuty'],
  },
  {
    num: '06',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Digital Transformation',
    desc: 'Legacy modernization, system migrations, and org-wide digital strategy that cuts through the noise.',
    tags: ['Strategy', 'Migration', 'Audit'],
  },
];

export const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative w-full py-20 md:py-32 px-6 md:px-14 lg:px-20 pointer-events-auto"
      style={{ background: 'var(--color-bg)', zIndex: 2, borderTop: '1px solid var(--color-border)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-20">
          <div className="flex-1">
            <div className="section-label mb-5 flex items-center gap-3">
              <span className="inline-block w-5 h-px" style={{ background: 'var(--color-accent)' }} />
              What we do
            </div>
            <h2
              className="font-cormorant font-bold leading-[1.02]"
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.025em',
              }}
            >
              Full-spectrum<br />
              <em className="gradient-text not-italic">tech execution</em>
            </h2>
          </div>
          <p
            className="lg:max-w-xs text-base leading-relaxed lg:pb-2"
            style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}
          >
            From a single integration to enterprise-scale systems — we scope it, build it, and ship it on time.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="h-full w-full rounded-2xl"
            >
              <TiltCard maxTilt={15} className="h-full rounded-2xl">
                <div className="group relative p-8 cursor-default transition-all duration-300 glass-card rounded-2xl h-full">
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: 'var(--color-accent-soft)' }}
                  />

                  <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
                  >
                    {service.icon}
                  </div>
                  <span
                    className="font-mono text-xs opacity-30 group-hover:opacity-60 transition-opacity"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {service.num}
                  </span>
                </div>

                <h3
                  className="text-base font-semibold mb-3 leading-snug"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}
                >
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'var(--color-accent-soft)',
                        color: 'var(--color-accent)',
                        border: '1px solid var(--color-border-accent)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-20 px-8 py-6 rounded-2xl glass-card"
        >
          <div>
            <p className="font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
              Don't see your stack?
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              We adapt to whatever your project demands.
            </p>
          </div>
          <Magnetic>
            <Button variant="primary" size="md">
              Let's talk →
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};
