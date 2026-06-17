import React from 'react';

interface BadgePillProps {
  children: React.ReactNode;
}

export function BadgePill({ children }: BadgePillProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-text-secondary border border-surface-border bg-surface backdrop-blur-md">
      {children}
    </div>
  );
}
