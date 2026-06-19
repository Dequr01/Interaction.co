import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border snap-end bg-black/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col lg:flex-row justify-between items-center gap-6">

        {/* Left Side: Logo & Copyright */}
        <div className="flex flex-col items-center lg:items-start gap-1 shrink-0">
          <Link href="/" className="font-display font-bold text-lg tracking-tight text-text-primary">
            INTERACTION
          </Link>
          <p className="text-text-secondary text-xs">
            © {currentYear} Interaction PVT LTD. All rights reserved.
          </p>
        </div>

        {/* Center: Plain Text Contact Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm font-medium text-text-secondary">
          <a href="mailto:interactionpvtltd@gmail.com" className="hover:text-accent-blue transition-colors flex items-center gap-2">
            <Mail className="w-4 h-4" /> interactionpvtltd@gmail.com
          </a>
          <a href="tel:+923001234567" className="hover:text-accent-blue transition-colors flex items-center gap-2">
            <Phone className="w-4 h-4" /> +92 300 1234567
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> DHA Phase 6, Lahore
          </div>
        </div>

        {/* Right Side: Socials */}
        <div className="flex items-center gap-5 shrink-0">
          <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors">
            <LinkedinIcon className="w-4 h-4" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors">
            <TwitterIcon className="w-4 h-4" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors">
            <GithubIcon className="w-4 h-4" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>

      </div>
    </footer>
  );
}
