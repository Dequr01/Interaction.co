import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = 'Avatar', initials, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'relative rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-white/10 bg-white/5 shadow-[0_4px_16px_rgba(0,0,0,0.1)]',
          sizeClasses[size],
          className
        )
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes="100px" />
      ) : (
        <span className="text-text-secondary font-medium tracking-widest uppercase">
          {initials || '?'}
        </span>
      )}
    </div>
  );
};
