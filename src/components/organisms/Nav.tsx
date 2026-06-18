'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Button } from '../atoms/Button';
import { GlassSelector } from '../atoms/GlassSelector';

export function Nav() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState('Work');
  const pathname = usePathname();
  const router = useRouter();
  
  const links = ['Work', 'Team', 'About', 'Contact'];

  // Mouse tracking for Nav glare
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Track active section on scroll
  useEffect(() => {
    const container = document.getElementById('main-scroll-container') || window;

    const handleScroll = () => {
      const scrollY = container === window ? window.scrollY : (container as HTMLElement).scrollTop;
      setIsAtTop(scrollY < 100);

      let current = '';
      for (const section of links) {
        const el = document.getElementById(section.toLowerCase());
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust threshold so active state kicks in when section reaches top part of viewport
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      if (current) setActiveSection(current);
    };
    
    handleScroll(); // Initial check
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const isExpanded = isHovered || isAtTop;

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-6">
      <motion.nav 
        layout
        onMouseMove={handleMouseMove}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative h-[56px] pointer-events-auto flex items-center bg-white/60 dark:bg-[#040405]/60 border border-black/5 dark:border-white/10 rounded-full p-2 shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-colors hover:bg-white/80 dark:hover:bg-[#040405]/80 hover:border-black/10 dark:hover:border-white/20"
        style={{
          WebkitBackdropFilter: "blur(32px) saturate(150%)",
          backdropFilter: "blur(32px) saturate(150%)",
          borderRadius: "9999px"
        }}
      >
        {/* ① BORDER REFRACTION GLOW */}
        <motion.div
          className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: useMotionTemplate`radial-gradient(circle 80px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.55), transparent 65%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            padding: '1px',
          }}
          aria-hidden
        />

        {/* ② INTERIOR REFRACTION GLOW */}
        <motion.div
          className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: useMotionTemplate`radial-gradient(circle 150px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15), transparent 70%)`,
          }}
          aria-hidden
        />

        {/* Logo Left */}
        <motion.div layout className="shrink-0 px-4 flex items-center z-10">
          <Link href="/" className="flex items-center">
            <span className="font-display font-medium text-xl tracking-tighter text-text-primary">
              INTERACTION
            </span>
          </Link>
        </motion.div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              layout
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center overflow-hidden"
            >
              {/* Links Slider using GlassSelector */}
              <div className="flex items-center px-4 border-l border-black/5 dark:border-white/10 ml-2 whitespace-nowrap">
                <GlassSelector
                  options={links.map(link => ({ label: link, value: link }))}
                  value={hoveredLink || activeSection}
                  onOptionHover={setHoveredLink}
                  onChange={(val) => {
                    setHoveredLink(null);
                    setActiveSection(val);
                    if (val === 'Contact') {
                      router.push('/contact');
                      return;
                    }
                    if (pathname !== '/') {
                      router.push('/#' + val.toLowerCase());
                    } else {
                      const el = document.getElementById(val.toLowerCase());
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-transparent border-none shadow-none"
                />
              </div>

              {/* CTA Right */}
              <div className="pl-4 pr-1 border-l border-black/5 dark:border-white/10 shrink-0">
                <Link href="/contact">
                  <Button variant="rainbow" size="md">
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>
    </header>
  );
}
