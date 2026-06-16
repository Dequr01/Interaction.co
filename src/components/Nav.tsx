"use client";

import React, { useEffect, useState } from 'react';
import { themeEngine } from '@/lib/themeEngine';

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const NAV_LINKS = ['Services', 'Work', 'Team', 'About', 'Contact'];

export const Nav = () => {
  const [isDark, setIsDark] = useState(false); // false on server, corrected on client
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Sync to actual theme on first client render
    setIsDark(themeEngine.isDark);
    const unsub = themeEngine.subscribe(setIsDark);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { unsub(); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 pt-5">
      <nav
        className={`nav-pill flex items-center gap-0 rounded-full transition-all duration-300 ${
          scrolled ? 'py-1.5 px-2' : 'py-2 px-3'
        }`}
        style={{ maxWidth: '780px', width: '100%' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mr-auto pl-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'var(--gradient-hero)' }}
          >
            I
          </div>
          <span className="font-semibold text-sm tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
            Interaction
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="px-3 py-1.5 rounded-full text-sm transition-all duration-200 hover:bg-[var(--color-accent-soft)]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 ml-auto pr-1">
          <button
            onClick={() => themeEngine.toggle()}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--color-accent-soft)]"
            style={{ color: 'var(--color-text-muted)' }}
            aria-label="Toggle theme"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className="btn-primary px-4 py-1.5 rounded-full text-sm font-medium text-white"
          >
            Start project
          </button>
        </div>
      </nav>
    </header>
  );
};
