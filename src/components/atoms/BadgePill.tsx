import React from 'react';

interface BadgePillProps {
  children: React.ReactNode;
}

export function BadgePill({ children }: BadgePillProps) {
  return (
    <div 
      className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-secondary border border-black/5 dark:border-white/10 bg-black/5 dark:bg-[#040405]/60 shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      style={{
        WebkitBackdropFilter: "blur(32px) saturate(150%)",
        backdropFilter: "blur(32px) saturate(150%)"
      }}
    >
      {children}
    </div>
  );
}
