import React from 'react';
import { Nav } from '@/components/organisms/Nav';
import { ContactSection } from '@/components/organisms/ContactSection';
import { Footer } from '@/components/organisms/Footer';

export default function ContactPage() {
  return (
    <main className="h-[100dvh] overflow-hidden relative flex flex-col selection:bg-accent-blue/30 pt-20 pb-0">
      <Nav />
      <ContactSection />
      <Footer />
    </main>
  );
}
