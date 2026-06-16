"use client";

import React from 'react';
import { ParticleCanvasProvider } from '@/components/ParticleCanvas';
import { Nav } from '@/components/Nav';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TeamSection } from '@/components/TeamSection';
import { AboutSection } from '@/components/AboutSection';

export default function Home() {
  return (
    <main className="w-full min-h-screen relative overflow-x-hidden" style={{ background: 'var(--color-bg)' }}>
      <ParticleCanvasProvider>
        <Nav />
        <div className="relative z-10 w-full flex flex-col">
          <HeroSection />
          <ServicesSection />
          <TeamSection />
          <AboutSection />

          {/* Footer */}
          <footer
            className="w-full glass-panel"
          >
            <div className="max-w-7xl mx-auto px-8 md:px-14 lg:px-20 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: 'var(--gradient-hero)' }}
                >
                  I
                </div>
                <span className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                  Interaction
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                © {new Date().getFullYear()} Interaction Studio. All rights reserved.
              </p>
              <div className="flex gap-6">
                {['Privacy', 'Terms', 'Contact'].map(link => (
                  <a
                    key={link}
                    href="#"
                    className="text-xs hover:underline underline-offset-4 transition-colors"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </ParticleCanvasProvider>
    </main>
  );
}
