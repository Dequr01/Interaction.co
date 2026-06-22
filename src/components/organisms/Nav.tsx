'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Button } from '../atoms/Button';
import { GlassSelector } from '../atoms/GlassSelector';
import { ChevronDown } from 'lucide-react';
import { Magnetic } from '../atoms/Magnetic';

export function Nav() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState('Work');
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const links = ['Work', 'Team', 'About', 'Contact'];

  // Mouse tracking for Nav glare (desktop only)
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
          if (rect.top <= 200) current = section;
        }
      }
      if (current) setActiveSection(current);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [mobileOpen]);

  const isExpanded = isHovered || isAtTop;

  function navigateTo(val: string) {
    setMobileOpen(false);
    setActiveSection(val);
    if (val === 'Contact') { router.push('/contact'); return; }
    if (pathname !== '/') { router.push('/#' + val.toLowerCase()); return; }
    const el = document.getElementById(val.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-2 md:px-6">

      {/* ─────────────────────────── DESKTOP NAV ─────────────────────────── */}
      <motion.nav
        layout
        onMouseMove={handleMouseMove}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="hidden md:flex relative h-[56px] pointer-events-auto items-center bg-white/60 dark:bg-[#040405]/60 border border-black/5 dark:border-white/10 rounded-full p-2 shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-colors hover:bg-white/80 dark:hover:bg-[#040405]/80 hover:border-black/10 dark:hover:border-white/20"
        style={{
          WebkitBackdropFilter: 'blur(32px) saturate(150%)',
          backdropFilter: 'blur(32px) saturate(150%)',
          borderRadius: '9999px',
        }}
      >
        {/* ① Border refraction glow */}
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
        {/* ② Interior refraction glow */}
        <motion.div
          className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: useMotionTemplate`radial-gradient(circle 150px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15), transparent 70%)`,
          }}
          aria-hidden
        />

        {/* Logo */}
        <motion.div layout className="shrink-0 px-4 flex items-center z-10">
          <Link href="/" className="flex items-center">
            <span className="font-display font-medium text-xl tracking-tighter text-text-primary">
              INTERACTION
            </span>
          </Link>
        </motion.div>

        {/* Expandable links + CTA */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              layout
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center overflow-hidden"
            >
              <div className="flex items-center px-4 border-l border-black/5 dark:border-white/10 ml-2 whitespace-nowrap">
                <GlassSelector
                  options={links.map(link => ({ label: link, value: link }))}
                  value={hoveredLink || activeSection}
                  onOptionHover={setHoveredLink}
                  onChange={(val) => {
                    setHoveredLink(null);
                    navigateTo(val);
                  }}
                  className="bg-transparent border-none shadow-none"
                />
              </div>
              <div className="pl-4 pr-1 border-l border-black/5 dark:border-white/10 shrink-0">
                <Link href="/contact">
                  <Magnetic>
                    <Button variant="rainbow" size="sm" className="h-[36px] px-4 text-xs font-bold">
                      Get Started
                    </Button>
                  </Magnetic>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─────────────────────────── MOBILE NAV ─────────────────────────── */}
      <div className="flex md:hidden w-full items-center justify-between pointer-events-auto px-1">

        {/* Logo pill */}
        <div
          className="h-[44px] flex items-center px-4 rounded-full bg-white/60 dark:bg-[#040405]/60 border border-black/5 dark:border-white/10 shadow-sm"
          style={{ backdropFilter: 'blur(32px) saturate(150%)', WebkitBackdropFilter: 'blur(32px) saturate(150%)' }}
        >
          <Link href="/">
            <span className="font-display font-medium text-sm tracking-tighter text-text-primary">
              INTERACTION
            </span>
          </Link>
        </div>

        {/* Section pill — shows active section, expands to menu on tap */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileOpen(prev => !prev)}
            className="h-[44px] flex items-center gap-2 px-4 rounded-full bg-white/60 dark:bg-[#040405]/60 border border-black/5 dark:border-white/10 shadow-sm text-text-primary font-medium text-sm"
            style={{ backdropFilter: 'blur(32px) saturate(150%)', WebkitBackdropFilter: 'blur(32px) saturate(150%)' }}
            aria-expanded={mobileOpen}
            aria-label="Navigation menu"
          >
            <span className="text-xs font-semibold tracking-wide">{activeSection}</span>
            <motion.span
              animate={{ rotate: mobileOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center"
            >
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
            </motion.span>
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="mobile-dropdown"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-[52px] w-48 rounded-2xl overflow-hidden glass-card py-1 shadow-lg"
                style={{ zIndex: 100 }}
              >
                {links.map((link, i) => (
                  <motion.button
                    key={link}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    onClick={() => navigateTo(link)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors
                      ${activeSection === link
                        ? 'text-text-primary bg-black/5 dark:bg-white/5'
                        : 'text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                  >
                    <span>{link}</span>
                    {activeSection === link && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                    )}
                  </motion.button>
                ))}

                <div className="mx-3 my-2 h-px bg-black/5 dark:bg-white/5" />

                <div className="px-3 pb-2">
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    <Button variant="rainbow" size="sm" fullWidth className="h-[36px] text-xs font-bold">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </header>
  );
}
