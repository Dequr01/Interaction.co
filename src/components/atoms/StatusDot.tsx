import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface StatusDotProps {
  status: 'online' | 'offline' | 'away' | 'busy';
  animate?: boolean;
  className?: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status, animate = true, className }) => {
  const colors = {
    online: 'bg-emerald-500',
    offline: 'bg-text-muted',
    away: 'bg-amber-500',
    busy: 'bg-red-500',
  };

  return (
    <div className={twMerge(clsx('relative flex h-3 w-3', className))}>
      {animate && status === 'online' && (
        <motion.span
          animate={{ scale: [1, 2], opacity: [0.7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
        />
      )}
      <span className={twMerge(clsx('relative inline-flex rounded-full h-3 w-3', colors[status]))} />
    </div>
  );
};
