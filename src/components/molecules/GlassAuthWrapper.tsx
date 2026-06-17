import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ParticleCanvas } from '../atoms/ParticleCanvas';

interface GlassAuthWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const GlassAuthWrapper: React.FC<GlassAuthWrapperProps> = ({
  children,
  title,
  subtitle,
  className,
}) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aurora-mid/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-blue/20 rounded-full blur-[120px] mix-blend-screen" />
        <ParticleCanvas />
      </div>

      {/* Auth Card */}
      <div
        className={twMerge(
          clsx(
            'relative z-10 w-full max-w-md mx-4 p-8 md:p-12 rounded-3xl',
            'bg-surface/60 backdrop-blur-2xl border border-surface-border',
            'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
            className
          )
        )}
      >
        <div className="text-center mb-8">
          {title && <h2 className="text-3xl font-display font-bold text-text-primary mb-2">{title}</h2>}
          {subtitle && <p className="text-text-secondary">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};
