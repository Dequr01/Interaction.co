import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ orientation = 'horizontal', className }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white/10',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full',
          className
        )
      )}
    />
  );
};
