import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-7xl flex items-center justify-between">
        
        {/* Logo Left */}
        <Link href="/" className="flex items-center">
          <span className="font-display font-medium text-2xl tracking-tighter text-text-primary">
            INTERACTION
          </span>
        </Link>

        {/* Links Center (Pill) */}
        <nav className="hidden md:flex nav-pill rounded-full px-8 py-3 items-center gap-8">
          {['Work', 'Team', 'About', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors tracking-wide"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA Right */}
        <div className="flex items-center gap-4">
          <Link 
            href="#contact"
            className="hidden md:inline-flex btn-primary rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-105"
          >
            Get Started
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-text-primary p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </header>
  );
}
