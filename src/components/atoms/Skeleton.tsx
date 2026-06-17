import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = 'rectangular' }) => {
  const variants = {
    rectangular: 'rounded-xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4',
  };

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={twMerge(
        clsx('bg-white/10 backdrop-blur-sm', variants[variant], className)
      )}
    />
  );
};
