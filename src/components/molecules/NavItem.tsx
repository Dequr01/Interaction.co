'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
  icon?: LucideIcon;
  isActive?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ href, label, icon: Icon, isActive }) => {
  return (
    <Link
      href={href}
      className={clsx(
        'relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 group',
        isActive ? 'text-white' : 'text-text-muted hover:text-text-primary hover:bg-white/5'
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeNavBackground"
          className="absolute inset-0 bg-white/10 rounded-xl"
          initial={false}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      
      <div className="relative z-10 flex items-center gap-3">
        {Icon && (
          <Icon
            className={clsx(
              'w-5 h-5 transition-colors',
              isActive ? 'text-accent-blue' : 'group-hover:text-text-primary'
            )}
          />
        )}
        <span className="font-medium text-sm tracking-wide">{label}</span>
      </div>
    </Link>
  );
};
