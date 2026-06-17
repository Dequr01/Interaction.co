import React from 'react';
import { Nav } from '@/components/Nav';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ValuesSection } from '@/components/ValuesSection';
import { TeamSection } from '@/components/TeamSection';
import { WorkSection } from '@/components/WorkSection';
import { CtaSection } from '@/components/CtaSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col bg-bg selection:bg-accent-blue/30">
      <Nav />
      <HeroSection />
      <WorkSection />
      <TeamSection />
      <AboutSection />
      <ValuesSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
