import React from 'react';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface IconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, size = 'md', className }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  return (
    <IconComponent
      className={twMerge(clsx('text-text-secondary', sizes[size], className))}
      strokeWidth={1.5}
    />
  );
};
