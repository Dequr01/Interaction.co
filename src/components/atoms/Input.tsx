import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-xs font-medium uppercase tracking-widest text-text-muted ml-1">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-text-muted flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={twMerge(
              clsx(
                'w-full bg-white/5 border border-white/10 text-text-primary placeholder:text-text-muted rounded-xl px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 backdrop-blur-md',
                icon && 'pl-11',
                error && 'border-red-500 focus:ring-red-500/50',
                className
              )
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
