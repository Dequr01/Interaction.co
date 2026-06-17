import React from 'react';
import { Nav } from '@/components/organisms/Nav';
import { HeroSection } from '@/components/organisms/HeroSection';
import { AboutSection } from '@/components/organisms/AboutSection';
import { ValuesSection } from '@/components/organisms/ValuesSection';
import { TeamSection } from '@/components/organisms/TeamSection';
import { WorkSection } from '@/components/organisms/WorkSection';
import { CtaSection } from '@/components/organisms/CtaSection';
import { Footer } from '@/components/organisms/Footer';

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col selection:bg-accent-blue/30">
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
